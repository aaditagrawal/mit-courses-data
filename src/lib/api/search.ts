import MiniSearch, { SearchResult as MiniSearchResult } from 'minisearch';
import { getAllCourses, getAllFiles, getDepartmentData, SearchResult } from '@/lib/courses';
import { DegreeSummary, getAllDegreeSummaries } from '@/lib/degrees';
import { paginate } from '@/lib/api/params';

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
    type?: 'all' | 'courses' | 'degrees';
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

function normalizeSearchText(value: string | undefined): string {
    return value?.trim().toLowerCase() ?? '';
}

function compactSearchText(value: string): string {
    return value.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

function courseId(course: SearchResult): string {
    return `course:${compactSearchText(course.code)}`;
}

function degreeId(degree: DegreeSummary): string {
    return `degree:${degree.slug}`;
}

function buildCourseIndex(): MiniSearch<CourseSearchDocument> {
    const index = new MiniSearch<CourseSearchDocument>({
        fields: ['code', 'codeCompact', 'title', 'department', 'branchFile', 'tags', 'syllabus', 'references'],
        storeFields: ['id'],
        searchOptions: {
            boost: COURSE_BOOST,
            combineWith: 'AND',
            prefix: true,
            fuzzy: (term) => (term.length >= 4 ? 0.2 : false),
            maxFuzzy: 2,
            weights: {
                prefix: 0.8,
                fuzzy: 0.25,
            },
        },
    });

    index.addAll(getAllCourses().map((course) => ({
        id: courseId(course),
        code: course.code,
        codeCompact: compactSearchText(course.code),
        title: course.title,
        department: course.department,
        branchFile: course.branchFile,
        tags: course.tags?.join(' ') ?? '',
        syllabus: course.syllabus?.join(' ') ?? '',
        references: course.references?.join(' ') ?? '',
    })));

    return index;
}

function getCourseIndex(): MiniSearch<CourseSearchDocument> {
    courseIndexCache ??= buildCourseIndex();
    return courseIndexCache;
}

function buildDegreeIndex(): MiniSearch<DegreeSearchDocument> {
    const index = new MiniSearch<DegreeSearchDocument>({
        fields: ['slug', 'slugCompact', 'title', 'department'],
        storeFields: ['id'],
        searchOptions: {
            boost: DEGREE_BOOST,
            combineWith: 'AND',
            prefix: true,
            fuzzy: (term) => (term.length >= 4 ? 0.2 : false),
            maxFuzzy: 2,
            weights: {
                prefix: 0.8,
                fuzzy: 0.25,
            },
        },
    });

    index.addAll(getAllDegreeSummaries().map((degree) => ({
        id: degreeId(degree),
        slug: degree.slug,
        slugCompact: compactSearchText(degree.slug),
        title: degree.title,
        department: degree.department,
    })));

    return index;
}

function getDegreeIndex(): MiniSearch<DegreeSearchDocument> {
    degreeIndexCache ??= buildDegreeIndex();
    return degreeIndexCache;
}

function searchScores(
    index: MiniSearch<CourseSearchDocument> | MiniSearch<DegreeSearchDocument>,
    query: string,
): Map<string, number> {
    let results = index.search(query);

    if (results.length === 0) {
        results = index.search(query, { combineWith: 'OR' });
    }

    return new Map(results.map((result: MiniSearchResult) => [String(result.id), result.score]));
}

function includesText(text: string | undefined, query: string): boolean {
    return Boolean(text?.toLowerCase().includes(query));
}

function courseDirectScore(course: SearchResult, query: string): number {
    const compactQuery = compactSearchText(query);
    const code = normalizeSearchText(course.code);
    const codeCompact = compactSearchText(course.code);
    const title = normalizeSearchText(course.title);
    const department = normalizeSearchText(course.department);

    if (code === query || codeCompact === compactQuery) return 100000;
    if (code.startsWith(query) || codeCompact.startsWith(compactQuery)) return 80000;
    if (title === query) return 60000;
    if (title.startsWith(query)) return 40000;
    if (includesText(course.code, query) || codeCompact.includes(compactQuery)) return 30000;
    if (includesText(course.title, query)) return 20000;
    if (department.includes(query)) return 10000;
    if (course.tags?.some((tag) => includesText(tag, query))) return 5000;
    if (course.syllabus?.some((topic) => includesText(topic, query))) return 1000;
    if (course.references?.some((ref) => includesText(ref, query))) return 250;

    return 0;
}

function degreeDirectScore(degree: DegreeSummary, query: string): number {
    const compactQuery = compactSearchText(query);
    const slug = normalizeSearchText(degree.slug);
    const slugCompact = compactSearchText(degree.slug);
    const title = normalizeSearchText(degree.title);
    const department = normalizeSearchText(degree.department);

    if (slug === query || slugCompact === compactQuery) return 80000;
    if (title === query) return 60000;
    if (slug.startsWith(query) || slugCompact.startsWith(compactQuery)) return 40000;
    if (title.startsWith(query)) return 30000;
    if (title.includes(query)) return 20000;
    if (department.includes(query)) return 10000;

    return 0;
}

function rankCourses(courses: SearchResult[], query: string): SearchResult[] {
    const scores = searchScores(getCourseIndex(), query);

    return courses
        .map((course, index) => {
            const directScore = courseDirectScore(course, query);
            const rankedScore = scores.get(courseId(course)) ?? 0;

            return {
                course,
                index,
                score: directScore + rankedScore,
            };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.index - b.index)
        .map((item) => item.course);
}

function rankDegrees(degrees: DegreeSummary[], query: string): DegreeSummary[] {
    const scores = searchScores(getDegreeIndex(), query);

    return degrees
        .map((degree, index) => {
            const directScore = degreeDirectScore(degree, query);
            const rankedScore = scores.get(degreeId(degree)) ?? 0;

            return {
                degree,
                index,
                score: directScore + rankedScore,
            };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.index - b.index)
        .map((item) => item.degree);
}

function filterCourses(options: CourseSearchOptions): SearchResult[] {
    const { q, department, branch, tag } = options;
    const lowerQuery = normalizeSearchText(q);
    const lowerDepartment = department?.trim().toLowerCase();
    const lowerBranch = branch?.trim().toLowerCase();
    const lowerTag = tag?.trim().toLowerCase();

    const filtered = getAllCourses().filter((course) => {
        if (lowerBranch && course.branchFile.toLowerCase() !== lowerBranch) {
            return false;
        }

        if (lowerDepartment) {
            const deptMatch =
                course.department.toLowerCase().includes(lowerDepartment) ||
                course.branchFile.toLowerCase().includes(lowerDepartment);
            if (!deptMatch) return false;
        }

        if (lowerTag && !course.tags?.some((t) => t.toLowerCase().includes(lowerTag))) {
            return false;
        }

        if (!lowerQuery) return true;

        return true;
    });

    return lowerQuery ? rankCourses(filtered, lowerQuery) : filtered;
}

function filterDegrees(options: DegreeSearchOptions): DegreeSummary[] {
    const lowerQuery = normalizeSearchText(options.q);
    const degrees = getAllDegreeSummaries();

    if (!lowerQuery) return degrees;

    return rankDegrees(degrees, lowerQuery);
}

export function searchCourses(options: CourseSearchOptions) {
    const limit = options.limit ?? 50;
    const offset = options.offset ?? 0;
    const filtered = filterCourses(options);
    const page = paginate(filtered, limit, offset);

    return {
        ...page,
        query: options.q ?? null,
    };
}

export function searchDegrees(options: DegreeSearchOptions) {
    const limit = options.limit ?? 50;
    const offset = options.offset ?? 0;
    const filtered = filterDegrees(options);
    const page = paginate(filtered, limit, offset);

    return {
        ...page,
        query: options.q ?? null,
    };
}

export function generalSearch(options: GeneralSearchOptions) {
    const type = options.type ?? 'all';
    const limit = options.limit ?? 50;
    const offset = options.offset ?? 0;

    const courseOptions: CourseSearchOptions = {
        q: options.q,
        department: options.department,
        branch: options.branch,
        tag: options.tag,
    };

    const degreeOptions: DegreeSearchOptions = {
        q: options.q,
    };

    if (type === 'courses') {
        const courses = searchCourses({ ...courseOptions, limit, offset });
        return {
            type,
            query: options.q ?? null,
            courses,
            degrees: { data: [] as DegreeSummary[], total: 0, query: options.q ?? null },
        };
    }

    if (type === 'degrees') {
        const degrees = searchDegrees({ ...degreeOptions, limit, offset });
        return {
            type,
            query: options.q ?? null,
            courses: { data: [] as SearchResult[], total: 0, query: options.q ?? null },
            degrees,
        };
    }

    const filteredCourses = filterCourses(courseOptions);
    const filteredDegrees = filterDegrees(degreeOptions);
    const coursePage = paginate(filteredCourses, limit, offset);
    const degreePage = paginate(filteredDegrees, limit, offset);

    return {
        type,
        query: options.q ?? null,
        courses: { ...coursePage, query: options.q ?? null },
        degrees: { ...degreePage, query: options.q ?? null },
    };
}

export function getDepartmentSummaries() {
    return getAllFiles()
        .map((filename) => {
            const slug = filename.replace('.json', '');
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
