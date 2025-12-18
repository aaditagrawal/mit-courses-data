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

export interface SearchResult extends Course {
    department: string;
    branchFile: string;
    matchType?: 'code' | 'title' | 'content';
}

// Helper function to calculate data completeness score
function calculateDataScore(course: SearchResult): number {
    let score = 0;

    if (course.department && course.department.trim().length > 0) score += 10;
    if (course.syllabus && course.syllabus.length > 0) {
        score += course.syllabus.length;
        score += course.syllabus.join('').length / 100;
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

// Cache the processed courses
let cachedCourses: SearchResult[] | null = null;

export function getAllCourses(): SearchResult[] {
    if (cachedCourses) return cachedCourses;

    const courseMap = new Map<string, SearchResult>();

    allDepartments.forEach(({ data, file }) => {
        const dept = data.department;
        if (dept && dept.courses) {
            dept.courses.forEach(c => {
                const normalizedCode = c.code.trim();
                const existing = courseMap.get(normalizedCode);
                const currentCourse: SearchResult = {
                    ...c,
                    code: normalizedCode,
                    department: dept.name,
                    branchFile: file
                };

                if (!existing) {
                    courseMap.set(normalizedCode, currentCourse);
                } else {
                    const existingScore = calculateDataScore(existing);
                    const currentScore = calculateDataScore(currentCourse);
                    if (currentScore > existingScore) {
                        courseMap.set(normalizedCode, currentCourse);
                    }
                }
            });
        }
    });

    cachedCourses = Array.from(courseMap.values());
    return cachedCourses;
}

export function searchCourses(query: string, limit = 50): SearchResult[] {
    const courses = getAllCourses();
    if (!query) return courses.slice(0, limit);

    const lowerQuery = query.toLowerCase();

    return courses.filter(course => {
        return (
            course.code?.toLowerCase().includes(lowerQuery) ||
            course.title?.toLowerCase().includes(lowerQuery) ||
            course.syllabus?.some(s => s.toLowerCase().includes(lowerQuery))
        );
    }).slice(0, limit);
}

// Re-export for compatibility
export function getAllFiles(): string[] {
    return allDepartments.map(d => d.file + '.json');
}

export function getDepartmentData(filename: string): Department | null {
    const baseName = filename.replace('.json', '');
    const found = allDepartments.find(d => d.file === baseName);
    return found ? found.data.department : null;
}
