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

function matchesQuery(text: string | undefined, query: string): boolean {
    return Boolean(text?.toLowerCase().includes(query));
}

function filterCourses(options: CourseSearchOptions): SearchResult[] {
    const { q, department, branch, tag } = options;
    const lowerQuery = q?.trim().toLowerCase();
    const lowerDepartment = department?.trim().toLowerCase();
    const lowerBranch = branch?.trim().toLowerCase();
    const lowerTag = tag?.trim().toLowerCase();

    return getAllCourses().filter((course) => {
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

        return (
            matchesQuery(course.code, lowerQuery) ||
            matchesQuery(course.title, lowerQuery) ||
            matchesQuery(course.department, lowerQuery) ||
            course.syllabus?.some((topic) => matchesQuery(topic, lowerQuery)) ||
            course.tags?.some((t) => matchesQuery(t, lowerQuery)) ||
            course.references?.some((ref) => matchesQuery(ref, lowerQuery))
        );
    });
}

function filterDegrees(options: DegreeSearchOptions): DegreeSummary[] {
    const lowerQuery = options.q?.trim().toLowerCase();
    const degrees = getAllDegreeSummaries();

    if (!lowerQuery) return degrees;

    return degrees.filter(
        (degree) =>
            matchesQuery(degree.title, lowerQuery) ||
            matchesQuery(degree.department, lowerQuery) ||
            matchesQuery(degree.slug, lowerQuery),
    );
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
