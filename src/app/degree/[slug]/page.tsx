import { getDegreeData, getAllDegrees, DegreeData, Semester, ElectiveSlot } from '@/lib/degrees';
import { getAllCourses, SearchResult } from '@/lib/courses';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { cn, getCourseLink } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';

// Next.js 15+ Page Props Interface
interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static params for all known degrees
export async function generateStaticParams() {
    const degrees = getAllDegrees();
    return degrees.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const data = getDegreeData(slug);
    if (!data) return { title: 'Degree Not Found' };
    return {
        title: `${data.degree_metadata.title} | Structure`,
        description: `Course structure for ${data.degree_metadata.title}`,
    };
}

export default async function DegreePage({ params }: PageProps) {
    const { slug } = await params;
    const data = getDegreeData(slug);

    if (!data) {
        notFound();
    }

    // Pre-fetch all courses to check existence and get details
    const allCourses = getAllCourses();
    const courseMap = new Map<string, SearchResult>();
    allCourses.forEach(c => courseMap.set(c.code.trim(), c));

    const { degree_metadata, structure, footnotes } = data;

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md border-border">
                <div className="container flex h-14 items-center pl-6 max-w-[1400px] mx-auto">
                    <Link href="/degree" className="mr-6 flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <span className="font-mono">← Degrees</span>
                    </Link>
                    <div className="flex flex-1 items-center justify-between overflow-hidden">
                        <h1 className="text-sm font-semibold tracking-tight truncate mr-4 text-foreground uppercase tracking-wider">{degree_metadata.title}</h1>
                        <div className="text-xs text-muted-foreground font-mono hidden sm:block whitespace-nowrap">
                            v{degree_metadata.handbook_version} • {degree_metadata.total_credits_required} Credits
                        </div>
                    </div>
                </div>
            </header>

            <main className="container max-w-[1400px] mx-auto p-4 sm:p-8 lg:p-12">
                <div className="space-y-12">

                    {/* Header Block */}
                    <div className="border-b border-border pb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">{degree_metadata.title}</h1>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                            <p className="font-medium">{degree_metadata.department}</p>
                            <div className="hidden sm:block w-px h-4 bg-border"></div>
                            <div className="font-mono text-muted-foreground/60">Total Credits: {degree_metadata.total_credits_required}</div>
                        </div>
                    </div>

                    {/* Semesters Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 sm:gap-16">
                        {structure.semesters.map((sem) => (
                            <SemesterBlock
                                key={sem.sem_index}
                                semester={sem}
                                courseMap={courseMap}
                                pools={structure.elective_pools}
                            />
                        ))}
                    </div>

                    {/* Footnotes */}
                    {footnotes && footnotes.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-border">
                            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-muted-foreground">Notes</h3>
                            <ul className="space-y-3">
                                {footnotes.map((note, idx) => (
                                    <li key={idx} className="text-sm text-muted-foreground flex gap-3 items-start">
                                        <span className="font-mono text-xs font-bold text-foreground mt-0.5">{note.symbol}</span>
                                        <span>{note.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}


// Helper functions for consistent display of course data
function getCourseTitle(code: string, courseMap: Map<string, SearchResult>): string {
    const cleanCode = code.trim();
    const course = courseMap.get(cleanCode);
    if (course) return course.title;

    if (cleanCode.endsWith('4191')) return 'Mini Project for Minor Specialisation';
    if (cleanCode.endsWith('4293')) return 'Project Work / Practice School (Honours)';
    if (cleanCode.endsWith('4292')) return 'Project Work';

    return 'Course data not found';
}

function getCourseCredits(code: string, courseMap: Map<string, SearchResult>): string | number {
    const cleanCode = code.trim();
    const course = courseMap.get(cleanCode);
    if (course) return course.credits?.c ?? '-';

    if (cleanCode.endsWith('4191')) return 8;
    if (cleanCode.endsWith('4293') || cleanCode.endsWith('4292')) return 12;

    return '-';
}


function SemesterBlock({
    semester,
    courseMap,
    pools
}: {
    semester: Semester;
    courseMap: Map<string, SearchResult>;
    pools: Record<string, any>;
}) {
    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-baseline mb-4 border-b-2 border-foreground pb-2">
                <h2 className="text-lg font-bold uppercase tracking-tight text-foreground">Semester {semester.sem_index}</h2>
                <div className="font-mono text-xs text-muted-foreground">
                    {semester.total_credits} Credits • {semester.total_contact_hours} Hours
                </div>
            </div>

            <div className="space-y-8">
                {/* Core Courses Table */}
                <div>
                    <div className="relative overflow-hidden rounded-sm border border-border overflow-x-auto">
                        <table className="w-full text-sm text-left min-w-[600px] sm:min-w-full">
                            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
                                <tr>
                                    <th className="px-4 py-2 font-medium w-32 border-r border-border">Code</th>
                                    <th className="px-4 py-2 font-medium">Subject Name</th>
                                    <th className="px-4 py-2 font-medium w-16 text-right hidden sm:table-cell">L</th>
                                    <th className="px-4 py-2 font-medium w-16 text-right hidden sm:table-cell">T</th>
                                    <th className="px-4 py-2 font-medium w-16 text-right hidden sm:table-cell">P</th>
                                    <th className="px-4 py-2 font-medium w-16 text-right border-l border-border">C</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border bg-background">
                                {semester.core_courses.map((code, idx) => (
                                    <CourseRow key={`${code}-${idx}`} code={code} courseMap={courseMap} />
                                ))}
                                {semester.core_courses.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground italic text-xs">
                                            No core courses this semester
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Electives */}
                {semester.elective_slots.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-1">Electives & Tracks</h3>
                        <div className="grid gap-4">
                            {semester.elective_slots.map((slot) => (
                                <ElectiveItem
                                    key={slot.slot_id}
                                    slot={slot}
                                    pools={pools}
                                    courseMap={courseMap}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function CourseRow({ code, courseMap }: { code: string; courseMap: Map<string, SearchResult> }) {
    const course = courseMap.get(code.trim());
    const isMissing = !course;
    const cleanCode = code.trim();
    const is4191 = cleanCode.endsWith('4191');
    const is4293 = cleanCode.endsWith('4293');
    const is4292 = cleanCode.endsWith('4292');

    // For missing special courses, redirect to their info pages
    if (isMissing && (is4191 || is4293 || is4292)) {
        const link = getCourseLink(code);
        const title = getCourseTitle(code, courseMap);
        const credits = getCourseCredits(code, courseMap);

        return (
            <tr className="group hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 border-r border-border font-mono font-medium text-muted-foreground group-hover:text-foreground">
                    <Link href={link} className="hover:underline underline-offset-4 decoration-border">
                        {code}
                    </Link>
                </td>
                <td className="px-4 py-3 font-medium text-foreground">
                    <Link href={link} className="block w-full h-full">
                        {title}
                    </Link>
                </td>
                <td className="px-4 py-3 text-right hidden sm:table-cell text-muted-foreground font-mono text-xs">-</td>
                <td className="px-4 py-3 text-right hidden sm:table-cell text-muted-foreground font-mono text-xs">-</td>
                <td className="px-4 py-3 text-right hidden sm:table-cell text-muted-foreground font-mono text-xs">-</td>
                <td className="px-4 py-3 text-right border-l border-border font-mono font-bold text-foreground">{credits}</td>
            </tr>
        )
    }

    if (isMissing) {
        const link = getCourseLink(code);
        return (
            <tr className="group hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 border-r border-border font-mono font-medium text-muted-foreground group-hover:text-foreground">
                    <Link href={link} className="hover:underline underline-offset-4 decoration-border">
                        {code}
                    </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground/60 italic">
                    <Link href={link} className="block w-full h-full">
                        Course data not found
                    </Link>
                </td>
                <td className="px-4 py-3 text-right hidden sm:table-cell text-muted-foreground/30 font-mono text-xs">-</td>
                <td className="px-4 py-3 text-right hidden sm:table-cell text-muted-foreground/30 font-mono text-xs">-</td>
                <td className="px-4 py-3 text-right hidden sm:table-cell text-muted-foreground/30 font-mono text-xs">-</td>
                <td className="px-4 py-3 text-right border-l border-border font-mono text-muted-foreground/50">-</td>
            </tr>
        )
    }

    // For 4191 courses, link to mini-projects page
    const courseLink = is4191 ? '/mini-projects' : `/course/${code}`;

    return (
        <tr className="group hover:bg-muted/30 transition-colors">
            <td className="px-4 py-3 border-r border-border font-mono font-medium text-muted-foreground group-hover:text-foreground">
                <Link href={courseLink} className="hover:underline underline-offset-4 decoration-border">
                    {code}
                </Link>
            </td>
            <td className="px-4 py-3 font-medium text-foreground">
                <Link href={courseLink} className="block w-full h-full">
                    {course.title}
                </Link>
            </td>
            <td className="px-4 py-3 text-right hidden sm:table-cell text-muted-foreground font-mono text-xs">{course.credits?.l ?? '-'}</td>
            <td className="px-4 py-3 text-right hidden sm:table-cell text-muted-foreground font-mono text-xs">{course.credits?.t ?? '-'}</td>
            <td className="px-4 py-3 text-right hidden sm:table-cell text-muted-foreground font-mono text-xs">{course.credits?.p ?? '-'}</td>
            <td className="px-4 py-3 text-right border-l border-border font-mono font-bold text-foreground">{course.credits?.c ?? '-'}</td>
        </tr>
    )
}

function ElectiveItem({
    slot,
    pools,
    courseMap
}: {
    slot: ElectiveSlot;
    pools: Record<string, any>;
    courseMap: Map<string, SearchResult>;
}) {
    let poolData = slot.pool_ref ? pools[slot.pool_ref] : null;

    // Use direct courses if pool_ref is missing or pool doesn't exist
    if (!poolData) {
        if (slot.courses) {
            poolData = slot.courses;
        } else if (slot.course_code) {
            poolData = [slot.course_code];
        }
    }

    // Determine pool type
    const isArray = Array.isArray(poolData);
    // Case 1: Simple list of strings
    const isSimpleList = isArray && (poolData.length === 0 || typeof poolData[0] === 'string');
    // Case 2: Array of Track objects
    const isTrackArray = isArray && poolData.length > 0 && typeof poolData[0] !== 'string';
    // Case 3: Object (Dictionary) of tracks (e.g. Civil Engineering)
    const isTrackDict = !isArray && poolData && typeof poolData === 'object';

    let displayMode: 'simple' | 'tracks' | 'none' = 'none';
    let simpleCourses: string[] = [];
    let tracks: { track_name: string, courses: string[] }[] = [];

    if (isSimpleList) {
        displayMode = 'simple';
        simpleCourses = poolData as string[] || [];
    } else if (isTrackArray) {
        displayMode = 'tracks';
        tracks = poolData as { track_name: string, courses: string[] }[];
    } else if (isTrackDict) {
        displayMode = 'tracks';
        // Normalize dict to tracks array
        tracks = Object.entries(poolData).map(([key, value]) => ({
            track_name: key.replace(/_/g, ' '),
            courses: value as string[]
        }));
    }

    if (!poolData) {
        return (
            <div className="text-xs text-destructive italic p-2 border border-destructive/20 rounded bg-destructive/5">
                Pool definition '{slot.pool_ref}' missing.
            </div>
        )
    }

    return (
        <Collapsible.Root className="border border-border rounded-lg bg-card shadow-sm overflow-hidden group">
            <Collapsible.Trigger className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors text-left">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-foreground">{slot.label}</span>
                    </div>
                    {displayMode === 'tracks' && <span className="text-xs text-muted-foreground">Contains {tracks.length} specialization tracks</span>}
                    {displayMode === 'simple' && simpleCourses.length > 0 && <span className="text-xs text-muted-foreground">{simpleCourses.length} course options available</span>}
                </div>
                <div className="p-1 rounded-md text-muted-foreground group-hover:text-foreground transition-colors">
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
                </div>
            </Collapsible.Trigger>

            <Collapsible.Content className="border-t border-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200">
                <div className="p-2 bg-background">
                    {/* Simple List */}
                    {displayMode === 'simple' && simpleCourses.map((c, idx) => (
                        <div key={`${c}-${idx}`} className="flex items-center justify-between p-2 rounded hover:bg-muted/30 group/item transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-xs font-semibold text-muted-foreground w-20">{c}</span>
                                <Link href={getCourseLink(c)} className="text-sm font-medium text-foreground hover:underline">
                                    {getCourseTitle(c, courseMap)}
                                </Link>
                            </div>
                            <div className="text-xs font-mono text-muted-foreground">
                                {getCourseCredits(c, courseMap)}C
                            </div>
                        </div>
                    ))}

                    {/* Tracks Grid */}
                    {displayMode === 'tracks' && (
                        <div className="grid grid-cols-1 gap-6 p-2">
                            {tracks.map((track, idx) => (
                                <div key={idx} className="space-y-3">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-1">
                                        {track.track_name}
                                    </h4>
                                    <div className="space-y-1">
                                        {track.courses.map((c, i) => (
                                            <div key={`${c}-${i}`} className="flex items-center justify-between p-2 rounded hover:bg-muted/30 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-mono text-xs font-semibold text-muted-foreground w-20">{c}</span>
                                                    <Link href={getCourseLink(c)} className="text-sm font-medium text-foreground hover:underline">
                                                        {getCourseTitle(c, courseMap)}
                                                    </Link>
                                                </div>
                                                <div className="text-xs font-mono text-muted-foreground">
                                                    {getCourseCredits(c, courseMap)}C
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}
