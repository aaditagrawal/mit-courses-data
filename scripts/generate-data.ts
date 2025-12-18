/**
 * Pre-build script to generate static JSON data files.
 * This allows course pages to fetch data client-side instead of being statically generated.
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'branch-json');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'data');

interface Course {
    sem: number | null;
    code: string;
    title: string;
    credits: { l: number; t: number; p: number; c: number } | null;
    tags: string[];
    syllabus: string[];
    references: string[];
    flags: string[];
    [key: string]: any;
}

interface Department {
    name: string;
    courses: Course[];
}

interface SearchResult extends Course {
    department: string;
    branchFile: string;
}

function getAllFiles(): string[] {
    if (!fs.existsSync(DATA_DIR)) return [];
    return fs.readdirSync(DATA_DIR).filter(file => file.endsWith('.json'));
}

function getDepartmentData(filename: string): Department | null {
    try {
        const filePath = path.join(DATA_DIR, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(fileContent);
        if (json.department) {
            return json.department as Department;
        }
        return null;
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
    }
}

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

function getAllCourses(): SearchResult[] {
    const files = getAllFiles();
    const courseMap = new Map<string, SearchResult>();

    files.forEach(file => {
        const dept = getDepartmentData(file);
        if (dept && dept.courses) {
            dept.courses.forEach(c => {
                const normalizedCode = c.code.trim();
                const existing = courseMap.get(normalizedCode);
                const currentCourse: SearchResult = {
                    ...c,
                    code: normalizedCode,
                    department: dept.name,
                    branchFile: file.replace('.json', '')
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

    return Array.from(courseMap.values());
}

async function main() {
    console.log('🔧 Generating static data files...');

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const courses = getAllCourses();
    console.log(`📚 Found ${courses.length} unique courses`);

    // Write all courses to a single JSON file for search/listing
    const allCoursesPath = path.join(OUTPUT_DIR, 'courses.json');
    fs.writeFileSync(allCoursesPath, JSON.stringify(courses));
    console.log(`✅ Written ${allCoursesPath}`);

    // Create a lookup map for individual course pages (keyed by code)
    const courseMap: Record<string, SearchResult> = {};
    courses.forEach(course => {
        courseMap[course.code] = course;
    });

    const courseMapPath = path.join(OUTPUT_DIR, 'course-map.json');
    fs.writeFileSync(courseMapPath, JSON.stringify(courseMap));
    console.log(`✅ Written ${courseMapPath}`);

    // Report sizes
    const coursesSize = fs.statSync(allCoursesPath).size;
    const mapSize = fs.statSync(courseMapPath).size;
    console.log(`📊 courses.json: ${(coursesSize / 1024).toFixed(1)} KB`);
    console.log(`📊 course-map.json: ${(mapSize / 1024).toFixed(1)} KB`);
    console.log('✨ Done!');
}

main().catch(console.error);
