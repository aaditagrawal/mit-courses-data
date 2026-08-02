/**
 * Precomputed, normalised view of the course corpus.
 *
 * The search scorer used to lowercase every field of every course on every
 * request, which meant re-lowercasing ~1.5 MB of syllabus and reference text
 * per keystroke. Everything the scorer needs is derived once here instead.
 *
 * Each field is stored as a `FieldBuffer`: one contiguous string holding every
 * document's text separated by a sentinel, plus the per-document offsets. That
 * lets a substring query run as a single native `indexOf` sweep over the whole
 * field rather than 1149 separate JavaScript-level calls, and it lets the sweep
 * skip to the next document as soon as one matches.
 */

import { getAllCourses, SearchResult } from '@/lib/courses';

/**
 * Document and multi-value separator.
 *
 * A needle that does not itself contain the sentinel can never match across a
 * boundary, because any such match would have to span the separator. That is
 * what makes sentinel-joining `syllabus` equivalent to testing each entry on
 * its own, and what makes the sweep safe to restart at the next document.
 * NUL is used because it does not occur in the course data and cannot be typed;
 * queries that do contain it (via `%00`) take a linear fallback.
 */
export const SENTINEL = '\u0000';

export interface FieldBuffer {
    /** SENTINEL + doc0 + SENTINEL + doc1 + ... + SENTINEL */
    text: string;
    /** Offset of each document's first character within `text`. Strictly increasing. */
    starts: Int32Array;
    /** Offset one past each document's last character. */
    ends: Int32Array;
    /** Per-document views into `text` (O(1) sliced strings, no copy). */
    docs: string[];
    /**
     * True when each document is itself a sentinel-joined list of entries
     * (tags, syllabus, references). Such a document must never be matched as a
     * flat string by a sentinel-bearing needle, because the per-entry test this
     * replaces could not match across the join.
     */
    multiValued: boolean;
}

/**
 * Entry-wise containment for one document.
 *
 * The buffer sweep is only valid for needles that carry no sentinel; anything
 * else lands here. For a single-valued field that is plain containment, exactly
 * as before. For a joined field the entries are split apart first, so a needle
 * containing the sentinel cannot match across two entries that were never
 * adjacent in the source data.
 */
export function documentContains(buffer: FieldBuffer, doc: number, needle: string): boolean {
    const text = buffer.docs[doc];
    if (!buffer.multiValued || !needle.includes(SENTINEL)) return text.includes(needle);
    return text.split(SENTINEL).some((entry) => entry.includes(needle));
}

function buildFieldBuffer(values: string[], multiValued = false): FieldBuffer {
    const count = values.length;
    const starts = new Int32Array(count);
    const ends = new Int32Array(count);
    const parts: string[] = [SENTINEL];

    let pos = SENTINEL.length;
    for (let i = 0; i < count; i++) {
        const value = values[i];
        starts[i] = pos;
        pos += value.length;
        ends[i] = pos;
        parts.push(value, SENTINEL);
        pos += SENTINEL.length;
    }

    const text = parts.join('');
    const docs: string[] = [];
    for (let i = 0; i < count; i++) docs.push(text.substring(starts[i], ends[i]));

    return { text, starts, ends, docs, multiValued };
}

/** Index of the document containing `pos`: the greatest i with starts[i] <= pos. */
function documentAt(starts: Int32Array, pos: number): number {
    let lo = 0;
    let hi = starts.length - 1;
    let found = 0;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (starts[mid] <= pos) {
            found = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return found;
}

/**
 * Call `visit` once for every document whose text contains `needle`.
 * `needle` must be non-empty.
 */
export function forEachMatch(buffer: FieldBuffer, needle: string, visit: (doc: number) => void): void {
    const { text, starts, docs } = buffer;

    if (needle.includes(SENTINEL)) {
        // Cannot use the contiguous sweep: a sentinel-bearing needle could span
        // a document boundary. Fall back to entry-wise containment.
        for (let i = 0; i < docs.length; i++) {
            if (documentContains(buffer, i, needle)) visit(i);
        }
        return;
    }

    let pos = text.indexOf(needle);
    while (pos !== -1) {
        const doc = documentAt(starts, pos);
        visit(doc);
        // The whole match lies inside `doc`, so resume at the next document.
        // `starts[doc + 1]` is always greater than `pos`, so this terminates.
        pos = doc + 1 < starts.length ? text.indexOf(needle, starts[doc + 1]) : -1;
    }
}

/** Call `visit` for documents in `candidates` (a superset) that contain `needle`. */
export function forEachMatchWithin(
    buffer: FieldBuffer,
    needle: string,
    candidates: Int32Array,
    candidateCount: number,
    visit: (doc: number) => void,
): void {
    const { docs } = buffer;

    // Hoisted: the needle is fixed for the whole sweep, so the common case stays
    // a bare `includes` per candidate.
    if (!buffer.multiValued || !needle.includes(SENTINEL)) {
        for (let k = 0; k < candidateCount; k++) {
            const doc = candidates[k];
            if (docs[doc].includes(needle)) visit(doc);
        }
        return;
    }

    for (let k = 0; k < candidateCount; k++) {
        const doc = candidates[k];
        if (documentContains(buffer, doc, needle)) visit(doc);
    }
}

export interface CourseCorpus {
    courses: SearchResult[];
    size: number;
    /** Trimmed + lowercased code, for exact/prefix comparison. */
    code: FieldBuffer;
    /** Code with every non-alphanumeric character removed, lowercased. */
    codeCompact: FieldBuffer;
    /** Trimmed + lowercased title. */
    title: FieldBuffer;
    /** Trimmed + lowercased department name. */
    department: FieldBuffer;
    /** Lowercased branch file identifier. */
    branch: FieldBuffer;
    /** Lowercased tags, sentinel-joined. */
    tags: FieldBuffer;
    /** Lowercased syllabus entries, sentinel-joined. */
    syllabus: FieldBuffer;
    /** Lowercased references, sentinel-joined. */
    references: FieldBuffer;
    /** MiniSearch document id -> ordinal. */
    ordinalById: Map<string, number>;
    /** Lowercased branch file identifier -> ordinals, for the exact `branch` filter. */
    byBranch: Map<string, Int32Array>;
    /** Scratch space reused across queries (single-threaded, synchronous scoring). */
    flags: Uint8Array;
    rankedScores: Float64Array;
}

export function compactSearchText(value: string): string {
    return value.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

export function normalizeSearchText(value: string | undefined): string {
    return value?.trim().toLowerCase() ?? '';
}

export function courseDocumentId(code: string): string {
    return `course:${compactSearchText(code)}`;
}

let corpusCache: CourseCorpus | null = null;

function buildCourseCorpus(): CourseCorpus {
    const courses = getAllCourses();
    const size = courses.length;

    const code: string[] = [];
    const codeCompact: string[] = [];
    const title: string[] = [];
    const department: string[] = [];
    const branch: string[] = [];
    const tags: string[] = [];
    const syllabus: string[] = [];
    const references: string[] = [];

    const ordinalById = new Map<string, number>();
    const branchOrdinals = new Map<string, number[]>();

    for (let i = 0; i < size; i++) {
        const course = courses[i];
        const courseCodeCompact = compactSearchText(course.code);
        const courseBranch = course.branchFile.toLowerCase();

        code.push(normalizeSearchText(course.code));
        codeCompact.push(courseCodeCompact);
        title.push(normalizeSearchText(course.title));
        department.push(normalizeSearchText(course.department));
        branch.push(courseBranch);
        tags.push(course.tags?.join(SENTINEL).toLowerCase() ?? '');
        syllabus.push(course.syllabus?.join(SENTINEL).toLowerCase() ?? '');
        references.push(course.references?.join(SENTINEL).toLowerCase() ?? '');

        // First writer wins, matching the old `scores.get(courseId(course))`
        // lookup where duplicate ids would resolve to the same score anyway.
        const id = `course:${courseCodeCompact}`;
        if (!ordinalById.has(id)) ordinalById.set(id, i);

        const bucket = branchOrdinals.get(courseBranch);
        if (bucket) bucket.push(i);
        else branchOrdinals.set(courseBranch, [i]);
    }

    const byBranch = new Map<string, Int32Array>();
    for (const [key, ordinals] of branchOrdinals) byBranch.set(key, Int32Array.from(ordinals));

    return {
        courses,
        size,
        code: buildFieldBuffer(code),
        codeCompact: buildFieldBuffer(codeCompact),
        title: buildFieldBuffer(title),
        department: buildFieldBuffer(department),
        branch: buildFieldBuffer(branch),
        tags: buildFieldBuffer(tags, true),
        syllabus: buildFieldBuffer(syllabus, true),
        references: buildFieldBuffer(references, true),
        ordinalById,
        byBranch,
        flags: new Uint8Array(size),
        rankedScores: new Float64Array(size),
    };
}

export function getCourseCorpus(): CourseCorpus {
    corpusCache ??= buildCourseCorpus();
    return corpusCache;
}
