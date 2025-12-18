import { getAllCourses } from '@/lib/courses';
import { getAllDegrees, getDegreeData, DegreeData } from '@/lib/degrees';
import { NetworkGraph } from '@/components/NetworkGraph';
import Link from 'next/link';

export const metadata = {
    title: 'Explore Courses | MIT Manipal',
    description: 'Interactive network graph visualization of MIT Manipal courses',
};

// Extract all course codes from a degree structure
function extractDegreeCourses(data: DegreeData): string[] {
    const codes: string[] = [];

    // Get courses from semesters
    data.structure.semesters.forEach(sem => {
        codes.push(...sem.core_courses);

        // Check elective slots for specific courses
        sem.elective_slots?.forEach(slot => {
            if ((slot as { course_code?: string }).course_code) {
                codes.push((slot as { course_code?: string }).course_code!);
            }
            if ((slot as { courses?: string[] }).courses) {
                codes.push(...(slot as { courses?: string[] }).courses!);
            }
        });
    });

    // Get courses from elective pools
    Object.values(data.structure.elective_pools || {}).forEach(pool => {
        if (Array.isArray(pool)) {
            pool.forEach(item => {
                if (typeof item === 'string') {
                    codes.push(item);
                } else if (item && typeof item === 'object' && 'courses' in item) {
                    codes.push(...(item as { courses: string[] }).courses);
                }
            });
        } else if (typeof pool === 'object') {
            Object.values(pool).forEach(subPool => {
                if (Array.isArray(subPool)) {
                    codes.push(...subPool);
                }
            });
        }
    });

    return [...new Set(codes)]; // Deduplicate
}

export default function ExplorePage() {
    const courses = getAllCourses();

    // Get degree data for graph linking
    const degreeSlugs = getAllDegrees();
    const degreeData = degreeSlugs.map(slug => {
        const data = getDegreeData(slug);
        if (!data) return null;
        return {
            slug,
            title: data.degree_metadata.title,
            courses: extractDegreeCourses(data),
        };
    }).filter((d): d is { slug: string; title: string; courses: string[] } => d !== null);

    // Transform to the shape needed by NetworkGraph
    const graphData = courses.map(c => ({
        code: c.code,
        title: c.title,
        department: c.department || 'Unknown',
    }));

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-mono"
                        >
                            ← Home
                        </Link>
                        <div className="h-4 w-px bg-border" />
                        <div>
                            <h1 className="text-lg font-semibold tracking-tight">
                                Explore Courses
                            </h1>
                            <p className="text-xs text-muted-foreground font-mono">
                                {courses.length} courses • {degreeData.length} degrees • 17 departments
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Graph container - full viewport */}
            <div className="pt-20 h-screen">
                <NetworkGraph courses={graphData} degrees={degreeData} />
            </div>
        </main>
    );
}

