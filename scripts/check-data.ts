import fs from 'fs';
import path from 'path';

// Re-implementing logic from src/lib/courses.ts and src/lib/degrees.ts 
// to avoid path resolution issues with @/ aliases in a standalone script

const DATA_DIR = path.join(process.cwd(), 'branch-json');
const DEGREE_DIR = path.join(process.cwd(), 'degree-json');

interface Course {
    code: string;
    title: string;
    credits?: {
        l: number | null;
        t: number | null;
        p: number | null;
        c: number | null;
    } | null;
}

interface Department {
    name: string;
    courses: Course[];
}

interface DegreeData {
    degree_metadata: {
        title: string;
        department: string;
    };
    structure: {
        semesters: any[];
        elective_pools: Record<string, any>;
    };
}

function getAllCourses() {
    const courseMap = new Map<string, Course>();
    if (!fs.existsSync(DATA_DIR)) return courseMap;

    const files = fs.readdirSync(DATA_DIR).filter(file => file.endsWith('.json'));

    files.forEach(file => {
        try {
            const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8');
            const json = JSON.parse(content);
            const courses = json.department?.courses || [];
            courses.forEach((c: any) => {
                const code = c.code.trim();
                // Basic deduplication: keep the first one or we could add scoring logic
                if (!courseMap.has(code)) {
                    courseMap.set(code, c);
                }
            });
        } catch (e) {
            console.error(`Error reading ${file}:`, e);
        }
    });
    return courseMap;
}

function getAllDegrees() {
    if (!fs.existsSync(DEGREE_DIR)) return [];
    return fs.readdirSync(DEGREE_DIR).filter(file => file.endsWith('.json'));
}

function checkData() {
    const courseMap = getAllCourses();
    const degrees = getAllDegrees();

    const results: any = {
        missing_courses: [],
        missing_pools: [],
        placeholder_codes: [],
        data_inconsistencies: []
    };

    degrees.forEach(degreeFile => {
        try {
            const content = fs.readFileSync(path.join(DEGREE_DIR, degreeFile), 'utf-8');
            const data: DegreeData = JSON.parse(content);
            const degreeName = data.degree_metadata.title;

            data.structure.semesters.forEach(sem => {
                // Check core courses
                (sem.core_courses || []).forEach((code: string) => {
                    const normalized = code.trim();
                    if (normalized.includes('****')) {
                        results.placeholder_codes.push({ degree: degreeName, file: degreeFile, code, context: `Core course in Sem ${sem.sem_index}` });
                    } else if (!courseMap.has(normalized) && !normalized.endsWith('4191') && !normalized.endsWith('4292') && !normalized.endsWith('4293')) {
                        results.missing_courses.push({ degree: degreeName, file: degreeFile, code, context: `Core course in Sem ${sem.sem_index}` });
                    }
                });

                // Check elective slots
                (sem.elective_slots || []).forEach((slot: any) => {
                    if (slot.course_code) {
                        const normalized = slot.course_code.trim();
                        if (normalized.includes('****')) {
                            results.placeholder_codes.push({ degree: degreeName, file: degreeFile, code: slot.course_code, context: `Elective slot ${slot.label} in Sem ${sem.sem_index}` });
                        } else if (!courseMap.has(normalized) && !normalized.endsWith('4191') && !normalized.endsWith('4292') && !normalized.endsWith('4293')) {
                            results.missing_courses.push({ degree: degreeName, file: degreeFile, code: slot.course_code, context: `Elective slot ${slot.label} in Sem ${sem.sem_index}` });
                        }
                    }

                    if (slot.pool_ref) {
                        if (!data.structure.elective_pools[slot.pool_ref]) {
                            results.missing_pools.push({ degree: degreeName, file: degreeFile, pool: slot.pool_ref, context: `Slot ${slot.label} in Sem ${sem.sem_index}` });
                        }
                    }

                    // Check inline courses in elective slots (if any)
                    if (slot.courses) {
                        slot.courses.forEach((code: string) => {
                            const normalized = code.trim();
                            if (normalized.includes('****')) {
                                results.placeholder_codes.push({ degree: degreeName, file: degreeFile, code, context: `Inline elective in slot ${slot.label} Sem ${sem.sem_index}` });
                            } else if (!courseMap.has(normalized) && !normalized.endsWith('4191') && !normalized.endsWith('4292') && !normalized.endsWith('4293')) {
                                results.missing_courses.push({ degree: degreeName, file: degreeFile, code, context: `Inline elective in slot ${slot.label} Sem ${sem.sem_index}` });
                            }
                        });
                    }
                });
            });

            // Check elective pools
            Object.entries(data.structure.elective_pools).forEach(([poolName, poolData]) => {
                const checkCourseList = (courses: string[], context: string) => {
                    courses.forEach(code => {
                        const normalized = code.trim();
                        if (normalized.includes('****')) {
                            results.placeholder_codes.push({ degree: degreeName, file: degreeFile, code, context });
                        } else if (!courseMap.has(normalized) && !normalized.endsWith('4191') && !normalized.endsWith('4292') && !normalized.endsWith('4293')) {
                            results.missing_courses.push({ degree: degreeName, file: degreeFile, code, context });
                        }
                    });
                };

                if (Array.isArray(poolData)) {
                    if (poolData.length > 0 && typeof poolData[0] === 'string') {
                        checkCourseList(poolData as string[], `Pool ${poolName}`);
                    } else {
                        // Array of tracks
                        (poolData as any[]).forEach(track => {
                            checkCourseList(track.courses || [], `Track ${track.track_name} in Pool ${poolName}`);
                        });
                    }
                } else if (typeof poolData === 'object' && poolData !== null) {
                    // Object of tracks
                    Object.entries(poolData).forEach(([trackName, courses]) => {
                        checkCourseList(courses as string[], `Track ${trackName} in Pool ${poolName}`);
                    });
                }
            });

        } catch (e) {
            console.error(`Error processing ${degreeFile}:`, e);
            results.data_inconsistencies.push({ file: degreeFile, error: (e as Error).message });
        }
    });

    // Generate report
    console.log("# Broken Data/Links Report\n");

    if (results.missing_courses.length > 0) {
        console.log("## Missing Courses");
        console.log("| Degree | Code | Context | File |");
        console.log("|---|---|---|---|");
        results.missing_courses.forEach((m: any) => {
            console.log(`| ${m.degree} | \`${m.code}\` | ${m.context} | \`${m.file}\` |`);
        });
        console.log("\n");
    }

    if (results.missing_pools.length > 0) {
        console.log("## Missing Elective Pools");
        console.log("| Degree | Pool Reference | Context | File |");
        console.log("|---|---|---|---|");
        results.missing_pools.forEach((m: any) => {
            console.log(`| ${m.degree} | \`${m.pool}\` | ${m.context} | \`${m.file}\` |`);
        });
        console.log("\n");
    }

    if (results.placeholder_codes.length > 0) {
        console.log("## Placeholder/Incomplete Codes");
        console.log("| Degree | Code | Context | File |");
        console.log("|---|---|---|---|");
        results.placeholder_codes.forEach((m: any) => {
            console.log(`| ${m.degree} | \`${m.code}\` | ${m.context} | \`${m.file}\` |`);
        });
        console.log("\n");
    }

    if (results.data_inconsistencies.length > 0) {
        console.log("## Data Inconsistencies/Errors");
        results.data_inconsistencies.forEach((m: any) => {
            console.log(`- **${m.file}**: ${m.error}`);
        });
        console.log("\n");
    }

    if (results.missing_courses.length === 0 && results.missing_pools.length === 0 && results.placeholder_codes.length === 0) {
        console.log("No broken links or missing data found! 🎉");
    }
}

checkData();
