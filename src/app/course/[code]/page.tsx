import { getAllCourses } from '@/lib/courses';
import { CreditStructure } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModeToggle } from '@/components/mode-toggle';
import { MoveLeft, BookOpen, Share2, Printer } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ code: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    const courses = getAllCourses();
    // Deduplicate codes to avoid build errors
    const uniqueCodes = Array.from(new Set(courses.map(c => c.code))).filter(Boolean);

    return uniqueCodes.map((code) => ({
        code: code,
    }));
}

export default async function CoursePage({ params }: Props) {
    const { code } = await params;
    const decodedCode = decodeURIComponent(code);
    const courses = getAllCourses();
    const course = courses.find((c) => c.code === decodedCode);

    if (!course) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-6 bg-background/80 backdrop-blur-sm border-b border-border/50">
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
                    <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-xs sm:text-sm">Back to Search</span>
                </Link>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Share2 className="w-4 h-4" />
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-500">

                {/* Header */}
                <header className="space-y-4">
                    <div className="flex flex-wrap gap-2 items-center max-w-full">
                        <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider text-muted-foreground border-accent-foreground/20 max-w-[200px] sm:max-w-none">
                            {course.department}
                        </Badge>
                        {course.tags?.map(tag => (
                            <Badge key={tag} variant="secondary" className="font-mono text-xs max-w-[150px] sm:max-w-[200px]">
                                {tag}
                            </Badge>
                        ))}
                        {course.sem && (
                            <Badge variant="outline" className="font-mono text-xs">
                                Sem {course.sem}
                            </Badge>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                        {course.title}
                    </h1>
                    <div className="flex items-center gap-4 text-lg font-mono text-muted-foreground">
                        <span className="text-accent-foreground font-semibold">{course.code}</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Details */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Syllabus */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-accent-foreground" />
                                Syllabus
                            </h2>
                            <Card className="border-border/50 bg-card/50 shadow-sm">
                                <CardContent className="p-6">
                                    <ul className="space-y-3">
                                        {course.syllabus?.map((topic, index) => (
                                            <li key={index} className="flex gap-3 text-sm leading-relaxed text-muted-foreground hover:text-foreground transition-colors">
                                                <span className="font-mono text-accent-foreground/50 shrink-0 mt-1">{(index + 1).toString().padStart(2, '0')}</span>
                                                <span>{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </section>

                        {/* References */}
                        {course.references && course.references.length > 0 && (
                            <section>
                                <h2 className="text-xl font-semibold mb-4">References</h2>
                                <ul className="grid gap-3">
                                    {course.references.map((ref, i) => (
                                        <li key={i} className="text-sm p-4 rounded-md bg-secondary/30 border border-transparent hover:border-border transition-colors text-muted-foreground">
                                            {ref}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                    </div>

                    {/* Right Column: Credits & Meta */}
                    <div className="space-y-6">

                        {/* Credits Card */}
                        <Card className="border-border/50 overflow-hidden">
                            <CardHeader className="bg-muted/50 pb-3 border-b border-border/50 px-6">
                                <CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Credits Structure</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border/50">
                                    <CreditItem label="Lecture" value={course.credits?.l || 0} />
                                    <CreditItem label="Tutorial" value={course.credits?.t || 0} />
                                    <CreditItem label="Practical" value={course.credits?.p || 0} />
                                    <CreditItem label="Total" value={course.credits?.c || 0} isTotal />
                                </div>
                            </CardContent>
                        </Card>


                    </div>

                </div>
            </main>
        </div>
    );
}

function CreditItem({ label, value, isTotal }: { label: string, value: number, isTotal?: boolean }) {
    return (
        <div className={`flex flex-col items-center justify-center p-3 sm:p-4 transition-colors ${isTotal ? 'bg-accent/10' : 'hover:bg-muted/30'}`}>
            <span className={`text-2xl sm:text-3xl font-bold font-mono tracking-tighter ${isTotal ? 'text-accent-foreground' : 'text-foreground'}`}>
                {value}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground mt-1 sm:mt-2 font-medium">
                {label}
            </span>
        </div>
    )
}
