import { getAllCourses } from '@/lib/courses';
import { NetworkGraph } from '@/components/NetworkGraph';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';

export const metadata = {
    title: 'Explore Courses | MIT Manipal',
    description: 'Interactive network graph visualization of MIT Manipal courses',
};

export default function ExplorePage() {
    const courses = getAllCourses();

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
                                {courses.length} courses • 17 departments
                            </p>
                        </div>
                    </div>
                    <ModeToggle />
                </div>
            </header>

            {/* Graph container - full viewport */}
            <div className="pt-20 h-screen">
                <NetworkGraph courses={graphData} />
            </div>
        </main>
    );
}
