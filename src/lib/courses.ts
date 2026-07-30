// Edge-compatible course data loader
// Imports JSON directly instead of using fs module

import { Course, Department } from './types';

// Import all department JSON files directly (bundled at build time)
import mathData from '../../branch-json/Math.json';
import aeroAutoData from '../../branch-json/aero-auto.json';
import biomedData from '../../branch-json/biomed.json';
import chemEleData from '../../branch-json/chem-ele.json';
import chemData from '../../branch-json/chem.json';
import civilData from '../../branch-json/civil.json';
import cpsData from '../../branch-json/cps.json';
import eceData from '../../branch-json/ece.json';
import eeeData from '../../branch-json/eee.json';
import humData from '../../branch-json/hum.json';
import iceData from '../../branch-json/ice.json';
import ictData from '../../branch-json/ict.json';
import industrialEngData from '../../branch-json/industrial-eng.json';
import mechData from '../../branch-json/mech.json';
import mechxData from '../../branch-json/mechx.json';
import phyData from '../../branch-json/phy.json';
import sceData from '../../branch-json/sce.json';
import vlsiData from '../../branch-json/vlsi.json';

// All department data with file identifiers
const allDepartments: Array<{ data: { department: Department }, file: string }> = [
    { data: mathData as { department: Department }, file: 'Math' },
    { data: aeroAutoData as { department: Department }, file: 'aero-auto' },
    { data: biomedData as { department: Department }, file: 'biomed' },
    { data: chemEleData as { department: Department }, file: 'chem-ele' },
    { data: chemData as { department: Department }, file: 'chem' },
    { data: civilData as { department: Department }, file: 'civil' },
    { data: cpsData as { department: Department }, file: 'cps' },
    { data: eceData as { department: Department }, file: 'ece' },
    { data: eeeData as { department: Department }, file: 'eee' },
    { data: humData as { department: Department }, file: 'hum' },
    { data: iceData as { department: Department }, file: 'ice' },
    { data: ictData as { department: Department }, file: 'ict' },
    { data: industrialEngData as { department: Department }, file: 'industrial-eng' },
    { data: mechData as { department: Department }, file: 'mech' },
    { data: mechxData as { department: Department }, file: 'mechx' },
    { data: phyData as { department: Department }, file: 'phy' },
    { data: sceData as { department: Department }, file: 'sce' },
    { data: vlsiData as { department: Department }, file: 'vlsi' },
];

// file identifier -> department, so lookups are O(1) instead of a linear scan
const departmentsByFile = new Map<string, Department>(
    allDepartments.map(({ data, file }) => [file, data.department]),
);

export interface SearchResult extends Course {
    department: string;
    branchFile: string;
    matchType?: 'code' | 'title' | 'content';
}

// A course as it appeared in one department file, before it wins/loses deduplication.
// Keeping the raw parts avoids materialising a SearchResult for entries that lose.
interface CourseCandidate {
    course: Course;
    code: string;
    department: string;
    branchFile: string;
}

// Total length of every entry, without building the joined string.
// The branch JSON is type-asserted rather than validated, and the `join('')`
// this replaces coerced non-string entries instead of throwing, so a malformed
// syllabus entry must not take down every page that loads the course index.
function totalLength(values: readonly string[]): number {
    let total = 0;
    for (const value of values) {
        total += (typeof value === 'string' ? value : String(value ?? '')).length;
    }
    return total;
}

// Helper function to calculate data completeness score
function calculateDataScore(candidate: CourseCandidate): number {
    const course = candidate.course;
    let score = 0;

    if (candidate.department && candidate.department.trim().length > 0) score += 10;
    if (course.syllabus && course.syllabus.length > 0) {
        score += course.syllabus.length;
        score += totalLength(course.syllabus) / 100;
    }
    if (course.references && course.references.length > 0) {
        score += course.references.length * 2;
    }
    if (course.tags && course.tags.length > 0) {
        score += course.tags.length;
    }
    if (course.credits) {
        if (course.credits.l !== null && course.credits.l !== undefined) score += 1;
        if (course.credits.t !== null && course.credits.t !== undefined) score += 1;
        if (course.credits.p !== null && course.credits.p !== undefined) score += 1;
        if (course.credits.c !== null && course.credits.c !== undefined) score += 1;
    }
    if (course.title) score += course.title.length / 10;
    if (course.sem !== null && course.sem !== undefined) score += 2;

    return score;
}

interface CourseIndex {
    courses: SearchResult[];
    byCode: Map<string, SearchResult>;
}

// Cache the processed courses
let cachedIndex: CourseIndex | null = null;

function buildCourseIndex(): CourseIndex {
    const winners = new Map<string, CourseCandidate>();
    // Only populated for codes that actually collide, so the ~900 courses that
    // appear in a single file never pay for a completeness score at all.
    const winningScores = new Map<string, number>();

    for (const { data, file } of allDepartments) {
        const dept = data.department;
        if (!dept || !dept.courses) continue;

        for (const course of dept.courses) {
            const code = course.code.trim();
            const candidate: CourseCandidate = {
                course,
                code,
                department: dept.name,
                branchFile: file,
            };

            const incumbent = winners.get(code);
            if (incumbent === undefined) {
                // Map keeps first-insertion order even when the value is replaced
                // later, so the final ordering matches first-occurrence order.
                winners.set(code, candidate);
                continue;
            }

            let incumbentScore = winningScores.get(code);
            if (incumbentScore === undefined) {
                incumbentScore = calculateDataScore(incumbent);
                winningScores.set(code, incumbentScore);
            }

            const candidateScore = calculateDataScore(candidate);
            if (candidateScore > incumbentScore) {
                winners.set(code, candidate);
                winningScores.set(code, candidateScore);
            }
        }
    }

    const courses: SearchResult[] = [];
    const byCode = new Map<string, SearchResult>();

    for (const candidate of winners.values()) {
        const resolved: SearchResult = {
            ...candidate.course,
            code: candidate.code,
            department: candidate.department,
            branchFile: candidate.branchFile,
        };
        courses.push(resolved);
        byCode.set(candidate.code, resolved);
    }

    return { courses, byCode };
}

function getCourseIndex(): CourseIndex {
    cachedIndex ??= buildCourseIndex();
    return cachedIndex;
}

export function getAllCourses(): SearchResult[] {
    return getCourseIndex().courses;
}

/**
 * Shared code -> course index. Callers that need many lookups should read this
 * once instead of rebuilding their own map over every course.
 */
export function getCourseMap(): ReadonlyMap<string, SearchResult> {
    return getCourseIndex().byCode;
}

/**
 * O(1) lookup by exact (already trimmed) course code.
 */
export function getCourseByCode(code: string): SearchResult | undefined {
    return getCourseIndex().byCode.get(code);
}

// Re-export for compatibility
export function getAllFiles(): string[] {
    return allDepartments.map(d => d.file + '.json');
}

export function getDepartmentData(filename: string): Department | null {
    const baseName = filename.replace('.json', '');
    return departmentsByFile.get(baseName) ?? null;
}
