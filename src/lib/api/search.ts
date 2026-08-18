import MiniSearch, { SearchResult as MiniSearchResult } from "minisearch";
import { getAllCourses, getAllFiles, getDepartmentData, SearchResult } from "@/lib/courses";
import { DegreeSummary, getAllDegreeSummaries } from "@/lib/degrees";
import { Page } from "@/lib/api/params";
import {
  CourseCorpus,
  FieldBuffer,
  compactSearchText,
  courseDocumentId,
  documentContains,
  forEachMatch,
  forEachMatchWithin,
  getCourseCorpus,
  normalizeSearchText,
} from "@/lib/api/corpus";

export interface CourseSearchOptions {
  q?: string;
  department?: string;
  branch?: string;
  tag?: string;
  limit?: number;
  offset?: number;
}

export interface DegreeSearchOptions {
  q?: string;
  limit?: number;
  offset?: number;
}

export interface GeneralSearchOptions {
  q?: string;
  type?: "all" | "courses" | "degrees";
  department?: string;
  branch?: string;
  tag?: string;
  limit?: number;
  offset?: number;
}

interface CourseSearchDocument {
  id: string;
  code: string;
  codeCompact: string;
  title: string;
  department: string;
  branchFile: string;
  tags: string;
  syllabus: string;
  references: string;
}

interface DegreeSearchDocument {
  id: string;
  slug: string;
  slugCompact: string;
  title: string;
  department: string;
}

const COURSE_BOOST = {
  code: 12,
  codeCompact: 12,
  title: 7,
  department: 3,
  branchFile: 2,
  tags: 3,
  syllabus: 1,
  references: 0.5,
};

const DEGREE_BOOST = {
  slug: 5,
  slugCompact: 5,
  title: 8,
  department: 3,
};

let courseIndexCache: MiniSearch<CourseSearchDocument> | null = null;
let degreeIndexCache: MiniSearch<DegreeSearchDocument> | null = null;

function degreeId(degree: DegreeSummary): string {
  return `degree:${degree.slug}`;
}

function buildCourseIndex(): MiniSearch<CourseSearchDocument> {
  const index = new MiniSearch<CourseSearchDocument>({
    fields: [
      "code",
      "codeCompact",
      "title",
      "department",
      "branchFile",
      "tags",
      "syllabus",
      "references",
    ],
    storeFields: ["id"],
    searchOptions: {
      boost: COURSE_BOOST,
      combineWith: "AND",
      prefix: true,
      fuzzy: (term) => (term.length >= 4 ? 0.2 : false),
      maxFuzzy: 2,
      weights: {
        prefix: 0.8,
        fuzzy: 0.25,
      },
    },
  });

  index.addAll(
    getAllCourses().map((course) => ({
      id: courseDocumentId(course.code),
      code: course.code,
      codeCompact: compactSearchText(course.code),
      title: course.title,
      department: course.department,
      branchFile: course.branchFile,
      tags: course.tags?.join(" ") ?? "",
      syllabus: course.syllabus?.join(" ") ?? "",
      references: course.references?.join(" ") ?? "",
    })),
  );

  return index;
}

function getCourseIndex(): MiniSearch<CourseSearchDocument> {
  courseIndexCache ??= buildCourseIndex();
  return courseIndexCache;
}

function buildDegreeIndex(): MiniSearch<DegreeSearchDocument> {
  const index = new MiniSearch<DegreeSearchDocument>({
    fields: ["slug", "slugCompact", "title", "department"],
    storeFields: ["id"],
    searchOptions: {
      boost: DEGREE_BOOST,
      combineWith: "AND",
      prefix: true,
      fuzzy: (term) => (term.length >= 4 ? 0.2 : false),
      maxFuzzy: 2,
      weights: {
        prefix: 0.8,
        fuzzy: 0.25,
      },
    },
  });

  index.addAll(
    getAllDegreeSummaries().map((degree) => ({
      id: degreeId(degree),
      slug: degree.slug,
      slugCompact: compactSearchText(degree.slug),
      title: degree.title,
      department: degree.department,
    })),
  );

  return index;
}

function getDegreeIndex(): MiniSearch<DegreeSearchDocument> {
  degreeIndexCache ??= buildDegreeIndex();
  return degreeIndexCache;
}

function searchScores(
  index: MiniSearch<CourseSearchDocument> | MiniSearch<DegreeSearchDocument>,
  query: string,
): MiniSearchResult[] {
  const results = index.search(query);
  if (results.length > 0) return results;
  return index.search(query, { combineWith: "OR" });
}

/* -------------------------------------------------------------------------- */
/* Course ranking                                                             */
/* -------------------------------------------------------------------------- */

// Which fields of a course the current query matched. Scoring reads these bits
// instead of re-running containment checks it has already performed.
const MATCH_CODE = 1 << 0;
const MATCH_CODE_COMPACT = 1 << 1;
const MATCH_TITLE = 1 << 2;
const MATCH_DEPARTMENT = 1 << 3;
const MATCH_TAG = 1 << 4;
const MATCH_SYLLABUS = 1 << 5;
const MATCH_REFERENCE = 1 << 6;
const MATCH_RANKED = 1 << 7;

/** Ordinals of every course the query touched, with their combined scores. */
interface ScoredCandidates {
  ordinals: Int32Array;
  scores: Float64Array;
  count: number;
}

/**
 * Tier of a direct (non-fuzzy) match, mirroring the original scorer exactly.
 *
 * Every branch below is reachable only for a course that already matched the
 * corresponding field, so equality and prefix tests are evaluated for
 * candidates rather than for the whole corpus: `code === query` implies
 * `code.includes(query)`, which implies MATCH_CODE is already set.
 */
function directScore(
  corpus: CourseCorpus,
  ordinal: number,
  matched: number,
  query: string,
  compactQuery: string,
): number {
  const code = corpus.code.docs[ordinal];
  const codeCompact = corpus.codeCompact.docs[ordinal];
  const title = corpus.title.docs[ordinal];

  if (code === query || codeCompact === compactQuery) return 100000;
  if (code.startsWith(query) || codeCompact.startsWith(compactQuery)) return 80000;
  if (title === query) return 60000;
  if (title.startsWith(query)) return 40000;
  if (matched & (MATCH_CODE | MATCH_CODE_COMPACT)) return 30000;
  if (matched & MATCH_TITLE) return 20000;
  if (matched & MATCH_DEPARTMENT) return 10000;
  if (matched & MATCH_TAG) return 5000;
  if (matched & MATCH_SYLLABUS) return 1000;
  if (matched & MATCH_REFERENCE) return 250;

  return 0;
}

// Scored candidate sets, keyed by query alone: filters are applied afterwards,
// so one cache entry serves every filter combination. Bounded, insertion
// ordered, evicts oldest first.
const CANDIDATE_CACHE_LIMIT = 64;
const candidateCache = new Map<string, ScoredCandidates>();

/**
 * Longest cached query that is a prefix of `query`.
 *
 * Substring containment is monotone under query extension: if a course does not
 * contain "netw" it cannot contain "netwo". So the candidate set of a cached
 * prefix is a superset of this query's direct matches, and the sweep can be
 * restricted to it. Typing a word therefore costs one full sweep plus a shrink
 * per keystroke rather than a full sweep per keystroke.
 */
function findPrefixCandidates(query: string, corpusSize: number): ScoredCandidates | null {
  // Only worth restricting when the superset is a small fraction of the corpus.
  const useful = corpusSize >> 2;
  for (let length = query.length - 1; length > 0; length--) {
    const entry = candidateCache.get(query.slice(0, length));
    if (entry) return entry.count <= useful ? entry : null;
  }
  return null;
}

function rememberCandidates(query: string, candidates: ScoredCandidates): void {
  if (candidateCache.size >= CANDIDATE_CACHE_LIMIT) {
    const oldest = candidateCache.keys().next();
    if (!oldest.done) candidateCache.delete(oldest.value);
  }
  candidateCache.set(query, candidates);
}

function scoreCourses(query: string): ScoredCandidates {
  const cached = candidateCache.get(query);
  if (cached) return cached;

  const corpus = getCourseCorpus();
  const { flags, rankedScores } = corpus;
  const compactQuery = compactSearchText(query);

  const touched: number[] = [];
  const mark = (bit: number) => (ordinal: number) => {
    if (flags[ordinal] === 0) touched.push(ordinal);
    flags[ordinal] |= bit;
  };

  const superset = findPrefixCandidates(query, corpus.size);
  const sweep = superset
    ? (field: FieldBuffer, needle: string, bit: number) =>
        forEachMatchWithin(field, needle, superset.ordinals, superset.count, mark(bit))
    : (field: FieldBuffer, needle: string, bit: number) => forEachMatch(field, needle, mark(bit));

  // `flags` is scratch shared by every query in the isolate, and a course is
  // only added to `touched` while its flags are still zero. A throw between
  // marking and clearing would leave courses flagged for good, and every later
  // query would then find an empty candidate set, so the reset is in `finally`.
  try {
    sweep(corpus.code, query, MATCH_CODE);
    if (compactQuery === "") {
      // compactSearchText('---') is empty, and ''.startsWith/''.includes
      // hold for every string, so the original scorer treated a
      // punctuation-only query as a prefix match on every course.
      // Preserved deliberately.
      const markCompact = mark(MATCH_CODE_COMPACT);
      for (let i = 0; i < corpus.size; i++) markCompact(i);
    } else {
      sweep(corpus.codeCompact, compactQuery, MATCH_CODE_COMPACT);
    }
    sweep(corpus.title, query, MATCH_TITLE);
    sweep(corpus.department, query, MATCH_DEPARTMENT);
    sweep(corpus.tags, query, MATCH_TAG);
    sweep(corpus.syllabus, query, MATCH_SYLLABUS);
    sweep(corpus.references, query, MATCH_REFERENCE);

    // Fuzzy/prefix hits can score above zero without any direct match, so
    // they join the candidate set. Unlike containment they are not monotone
    // under query extension, so they are always recomputed in full.
    const markRanked = mark(MATCH_RANKED);
    for (const result of searchScores(getCourseIndex(), query)) {
      const ordinal = corpus.ordinalById.get(String(result.id));
      if (ordinal === undefined) continue;
      markRanked(ordinal);
      rankedScores[ordinal] = result.score;
    }

    const ordinals = new Int32Array(touched.length);
    const scores = new Float64Array(touched.length);
    let count = 0;

    for (const ordinal of touched) {
      const matched = flags[ordinal];
      let score = directScore(corpus, ordinal, matched, query, compactQuery);
      if (matched & MATCH_RANKED) score += rankedScores[ordinal];
      if (score > 0) {
        ordinals[count] = ordinal;
        scores[count] = score;
        count++;
      }
    }

    const candidates: ScoredCandidates = { ordinals, scores, count };
    rememberCandidates(query, candidates);
    return candidates;
  } finally {
    for (const ordinal of touched) flags[ordinal] = 0;
  }
}

/* -------------------------------------------------------------------------- */
/* Filters                                                                    */
/* -------------------------------------------------------------------------- */

interface CourseFilters {
  department: string;
  branch: string;
  tag: string;
}

function readFilters(options: CourseSearchOptions): CourseFilters {
  return {
    department: options.department?.trim().toLowerCase() ?? "",
    branch: options.branch?.trim().toLowerCase() ?? "",
    tag: options.tag?.trim().toLowerCase() ?? "",
  };
}

function hasFilters(filters: CourseFilters): boolean {
  return filters.department !== "" || filters.branch !== "" || filters.tag !== "";
}

function passesFilters(corpus: CourseCorpus, ordinal: number, filters: CourseFilters): boolean {
  const branch = corpus.branch.docs[ordinal];

  if (filters.branch && branch !== filters.branch) return false;

  if (
    filters.department &&
    !corpus.department.docs[ordinal].includes(filters.department) &&
    !branch.includes(filters.department)
  ) {
    return false;
  }

  // Tags are sentinel-joined, so this has to be tested entry-wise.
  if (filters.tag && !documentContains(corpus.tags, ordinal, filters.tag)) return false;

  return true;
}

/** Ordinals matching the filters, in corpus order. Used only when there is no query. */
function filteredOrdinals(corpus: CourseCorpus, filters: CourseFilters): Int32Array {
  // An exact branch filter is a precomputed bucket, so start from it when present.
  const scope = filters.branch ? corpus.byBranch.get(filters.branch) : null;

  if (filters.branch && !scope) return new Int32Array(0);

  const source = scope ?? null;
  const total = source ? source.length : corpus.size;
  const result = new Int32Array(total);
  let count = 0;

  for (let k = 0; k < total; k++) {
    const ordinal = source ? source[k] : k;
    if (passesFilters(corpus, ordinal, filters)) result[count++] = ordinal;
  }

  return result.subarray(0, count);
}

/* -------------------------------------------------------------------------- */
/* Selection                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Rank order: score descending, then corpus order ascending.
 *
 * Filtering preserves corpus order, so comparing ordinals reproduces the old
 * tie-break on position within the filtered array.
 */
function compareRank(a: number, b: number, scores: Float64Array, ordinals: Int32Array): number {
  const delta = scores[b] - scores[a];
  if (delta !== 0) return delta;
  return ordinals[a] - ordinals[b];
}

/**
 * Move the `need` best entries of `slots` to the front, unordered.
 * Quickselect: O(n) expected, versus O(n log n) to sort a result set of which
 * only `offset + limit` entries are ever read.
 */
function selectTop(
  slots: Int32Array,
  count: number,
  need: number,
  scores: Float64Array,
  ordinals: Int32Array,
): void {
  let lo = 0;
  let hi = count - 1;

  while (lo < hi) {
    // Median-of-three pivot keeps adversarial orderings from degrading to O(n^2).
    const mid = (lo + hi) >> 1;
    if (compareRank(slots[mid], slots[lo], scores, ordinals) < 0)
      [slots[lo], slots[mid]] = [slots[mid], slots[lo]];
    if (compareRank(slots[hi], slots[lo], scores, ordinals) < 0)
      [slots[lo], slots[hi]] = [slots[hi], slots[lo]];
    if (compareRank(slots[hi], slots[mid], scores, ordinals) < 0)
      [slots[mid], slots[hi]] = [slots[hi], slots[mid]];

    const pivot = slots[mid];
    let i = lo;
    let j = hi;
    while (i <= j) {
      while (compareRank(slots[i], pivot, scores, ordinals) < 0) i++;
      while (compareRank(slots[j], pivot, scores, ordinals) > 0) j--;
      if (i <= j) {
        const swap = slots[i];
        slots[i] = slots[j];
        slots[j] = swap;
        i++;
        j--;
      }
    }

    if (need <= j) hi = j;
    else if (need >= i) lo = i;
    else return;
  }
}

function rankedPage(
  corpus: CourseCorpus,
  candidates: ScoredCandidates,
  filters: CourseFilters,
  limit: number,
  offset: number,
): Page<SearchResult> {
  const { ordinals, scores, count } = candidates;
  const applyFilters = hasFilters(filters);

  // Slot indices into the candidate arrays, so scores and ordinals stay put.
  const slots = new Int32Array(count);
  let kept = 0;
  for (let i = 0; i < count; i++) {
    if (!applyFilters || passesFilters(corpus, ordinals[i], filters)) slots[kept++] = i;
  }

  const need = Math.min(kept, offset + limit);
  if (need <= 0) return { data: [], total: kept };

  let window = slots.subarray(0, kept);
  // Sorting everything is cheaper than quickselect once the result set is
  // already close to the page size.
  if (kept > need * 4) {
    selectTop(window, kept, need, scores, ordinals);
    window = window.subarray(0, need);
  }

  const page = Array.from(window).sort((a, b) => compareRank(a, b, scores, ordinals));

  const data: SearchResult[] = [];
  for (let i = offset; i < page.length && data.length < limit; i++) {
    data.push(corpus.courses[ordinals[page[i]]]);
  }

  return { data, total: kept };
}

function selectCourses(
  options: CourseSearchOptions,
  limit: number,
  offset: number,
): Page<SearchResult> {
  const corpus = getCourseCorpus();
  const query = normalizeSearchText(options.q);
  const filters = readFilters(options);

  if (query) {
    return rankedPage(corpus, scoreCourses(query), filters, limit, offset);
  }

  if (!hasFilters(filters)) {
    const courses = corpus.courses;
    return { data: courses.slice(offset, offset + limit), total: courses.length };
  }

  const ordinals = filteredOrdinals(corpus, filters);
  const data: SearchResult[] = [];
  for (let i = offset; i < ordinals.length && data.length < limit; i++) {
    data.push(corpus.courses[ordinals[i]]);
  }

  return { data, total: ordinals.length };
}

/* -------------------------------------------------------------------------- */
/* Degrees                                                                    */
/* -------------------------------------------------------------------------- */

interface DegreeSearchEntry {
  degree: DegreeSummary;
  slug: string;
  slugCompact: string;
  title: string;
  department: string;
  id: string;
}

let degreeEntriesCache: DegreeSearchEntry[] | null = null;

function getDegreeEntries(): DegreeSearchEntry[] {
  degreeEntriesCache ??= getAllDegreeSummaries().map((degree) => ({
    degree,
    slug: normalizeSearchText(degree.slug),
    slugCompact: compactSearchText(degree.slug),
    title: normalizeSearchText(degree.title),
    department: normalizeSearchText(degree.department),
    id: degreeId(degree),
  }));
  return degreeEntriesCache;
}

function degreeDirectScore(entry: DegreeSearchEntry, query: string, compactQuery: string): number {
  if (entry.slug === query || entry.slugCompact === compactQuery) return 80000;
  if (entry.title === query) return 60000;
  if (entry.slug.startsWith(query) || entry.slugCompact.startsWith(compactQuery)) return 40000;
  if (entry.title.startsWith(query)) return 30000;
  if (entry.title.includes(query)) return 20000;
  if (entry.department.includes(query)) return 10000;

  return 0;
}

function selectDegrees(query: string, limit: number, offset: number): Page<DegreeSummary> {
  const entries = getDegreeEntries();

  if (!query) {
    const degrees = getAllDegreeSummaries();
    return { data: degrees.slice(offset, offset + limit), total: degrees.length };
  }

  const compactQuery = compactSearchText(query);
  const ranked = new Map<string, number>();
  for (const result of searchScores(getDegreeIndex(), query)) {
    ranked.set(String(result.id), result.score);
  }

  const scored: Array<{ degree: DegreeSummary; index: number; score: number }> = [];
  for (let index = 0; index < entries.length; index++) {
    const entry = entries[index];
    const score = degreeDirectScore(entry, query, compactQuery) + (ranked.get(entry.id) ?? 0);
    if (score > 0) scored.push({ degree: entry.degree, index, score });
  }

  scored.sort((a, b) => b.score - a.score || a.index - b.index);

  return {
    data: scored.slice(offset, offset + limit).map((item) => item.degree),
    total: scored.length,
  };
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

export function searchCourses(options: CourseSearchOptions) {
  const limit = options.limit ?? 50;
  const offset = options.offset ?? 0;
  const page = selectCourses(options, limit, offset);

  return {
    ...page,
    query: options.q ?? null,
  };
}

export function searchDegrees(options: DegreeSearchOptions) {
  const limit = options.limit ?? 50;
  const offset = options.offset ?? 0;
  const page = selectDegrees(normalizeSearchText(options.q), limit, offset);

  return {
    ...page,
    query: options.q ?? null,
  };
}

/** A results page that also echoes the query it was produced from. */
export interface QueriedPage<T> extends Page<T> {
  query: string | null;
}

export interface GeneralSearchResult {
  type: "all" | "courses" | "degrees";
  query: string | null;
  courses: QueriedPage<SearchResult>;
  degrees: QueriedPage<DegreeSummary>;
}

export function generalSearch(options: GeneralSearchOptions): GeneralSearchResult {
  const type = options.type ?? "all";
  const limit = options.limit ?? 50;
  const offset = options.offset ?? 0;
  const query = options.q ?? null;

  const courseOptions: CourseSearchOptions = {
    q: options.q,
    department: options.department,
    branch: options.branch,
    tag: options.tag,
  };

  if (type === "courses") {
    return {
      type,
      query,
      courses: { ...selectCourses(courseOptions, limit, offset), query },
      degrees: { data: [], total: 0, query },
    };
  }

  if (type === "degrees") {
    return {
      type,
      query,
      courses: { data: [], total: 0, query },
      degrees: { ...selectDegrees(normalizeSearchText(options.q), limit, offset), query },
    };
  }

  return {
    type,
    query,
    courses: { ...selectCourses(courseOptions, limit, offset), query },
    degrees: { ...selectDegrees(normalizeSearchText(options.q), limit, offset), query },
  };
}

let departmentSummariesCache: Array<{ slug: string; name: string; courseCount: number }> | null =
  null;

export function getDepartmentSummaries() {
  departmentSummariesCache ??= getAllFiles()
    .map((filename) => {
      const slug = filename.replace(".json", "");
      const department = getDepartmentData(filename);
      if (!department) return null;

      return {
        slug,
        name: department.name,
        courseCount: department.courses.length,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

  return departmentSummariesCache;
}

export function getDepartmentBySlug(slug: string) {
  const department = getDepartmentData(`${slug}.json`);
  if (!department) return null;

  return {
    slug,
    name: department.name,
    courses: department.courses,
  };
}
