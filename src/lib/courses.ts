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

export function getAllCourses(): SearchResult[] {
    const files = getAllFiles();
    let allCourses: SearchResult[] = [];

    files.forEach(file => {
        const dept = getDepartmentData(file);
        if (dept && dept.courses) {
            // Enrich course with department info if needed, or just flatten
            // We might want to add department slug/name to the course object for context
            const deptCourses = dept.courses.map(c => ({
                ...c,
                department: dept.name,
                branchFile: file.replace('.json', '')
            })) as SearchResult[];
            allCourses = allCourses.concat(deptCourses);
        }
    });

    return allCourses;
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
