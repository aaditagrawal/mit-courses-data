import fs from 'fs';
import path from 'path';
import { Course, Department } from './types';

const DATA_DIR = path.join(process.cwd(), 'branch-json');

export function getAllFiles(): string[] {
    if (!fs.existsSync(DATA_DIR)) return [];
    return fs.readdirSync(DATA_DIR).filter(file => file.endsWith('.json'));
}

export function getDepartmentData(filename: string): Department | null {
    try {
        const filePath = path.join(DATA_DIR, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(fileContent);
        // Handle structure: { department: { name: "...", courses: [...] } }
        if (json.department) {
            return json.department as Department;
        }
        return null;
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
    }
}

// Helper function to calculate data completeness score
function calculateDataScore(course: SearchResult): number {
    let score = 0;

    // Department name (high priority)
    if (course.department && course.department.trim().length > 0) score += 10;

    // Syllabus content
    if (course.syllabus && course.syllabus.length > 0) {
        score += course.syllabus.length; // More syllabus items = higher score
        score += course.syllabus.join('').length / 100; // Longer content = higher score
    }

    // References
    if (course.references && course.references.length > 0) {
        score += course.references.length * 2;
    }

    // Tags
    if (course.tags && course.tags.length > 0) {
        score += course.tags.length;
    }

    // Credits (prefer non-null credits)
    if (course.credits) {
        if (course.credits.l !== null && course.credits.l !== undefined) score += 1;
        if (course.credits.t !== null && course.credits.t !== undefined) score += 1;
        if (course.credits.p !== null && course.credits.p !== undefined) score += 1;
        if (course.credits.c !== null && course.credits.c !== undefined) score += 1;
    }

    // Title length (prefer more descriptive titles)
    if (course.title) score += course.title.length / 10;

    // Semester info
    if (course.sem !== null && course.sem !== undefined) score += 2;

    return score;
}

export function getAllCourses(): SearchResult[] {
    const files = getAllFiles();
    const courseMap = new Map<string, SearchResult>();

    files.forEach(file => {
        const dept = getDepartmentData(file);
        if (dept && dept.courses) {
            dept.courses.forEach(c => {
                // specific fix for some courses having spaces in code
                const normalizedCode = c.code.trim();
                const existing = courseMap.get(normalizedCode);
                const currentCourse: SearchResult = {
                    ...c,
                    code: normalizedCode, // Ensure clean code is used
                    department: dept.name,
                    branchFile: file.replace('.json', '')
                };

                if (!existing) {
                    courseMap.set(normalizedCode, currentCourse);
                } else {
                    // Compare data completeness and keep the one with more data
                    const existingScore = calculateDataScore(existing);
                    const currentScore = calculateDataScore(currentCourse);

                    if (currentScore > existingScore) {
                        courseMap.set(normalizedCode, currentCourse);
                    }
                }
            });
        }
    });

    return Array.from(courseMap.values());
}

export interface SearchResult extends Course {
    department: string;
    branchFile: string;
    matchType?: 'code' | 'title' | 'content';
}

export function searchCourses(query: string, limit = 50): SearchResult[] {
    const courses = getAllCourses() as SearchResult[];
    if (!query) return courses.slice(0, limit);

    const lowerQuery = query.toLowerCase();

    // Simple filter for now, can be optimized
    return courses.filter(course => {
        return (
            course.code?.toLowerCase().includes(lowerQuery) ||
            course.title?.toLowerCase().includes(lowerQuery) ||
            course.syllabus?.some(s => s.toLowerCase().includes(lowerQuery))
        );
    }).slice(0, limit);
}
