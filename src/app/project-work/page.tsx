import { ModeToggle } from '@/components/mode-toggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoveLeft, BookOpen, GraduationCap, Clock, Building2, Presentation } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Project Work | MIT Manipal',
    description: 'Information about 4292 courses - Major Project Work for B.Tech students',
};

export default function ProjectWorkPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-6 bg-background/80 backdrop-blur-sm border-b border-border/50">
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
                    <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-xs sm:text-sm">Back to Home</span>
                </Link>
                <ModeToggle />
            </nav>

            {/* Main Content */}
            <main className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-500">

                {/* Header */}
                <header className="space-y-4">
                    <div className="flex flex-wrap gap-2 items-center">
                        <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider text-muted-foreground border-accent-foreground/20">
                            Academic Information
                        </Badge>
                        <Badge variant="secondary" className="font-mono text-xs">
                            Major Project
                        </Badge>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                        Project Work
                    </h1>
                    <div className="flex items-center gap-4 text-lg font-mono text-muted-foreground">
                        <span className="text-accent-foreground font-semibold">XXX 4292</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Main Content */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Overview */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-accent-foreground" />
                                Overview
                            </h2>
                            <Card className="border-border/50 bg-card/50 shadow-sm">
                                <CardContent className="p-6 space-y-4">
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        The Project Work (<span className="font-mono text-accent-foreground">XXX 4292</span>) is a major academic requirement for B.Tech students. It provides an opportunity to apply theoretical knowledge to solve real-world engineering problems.
                                    </p>
                                    <p className="text-sm leading-relaxed text-muted-foreground font-medium text-foreground">
                                        Note: This course is for students pursuing the regular B.Tech degree (without Honours).
                                    </p>
                                    <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/5 border border-accent/10 italic text-sm text-muted-foreground">
                                        <Building2 className="w-5 h-5 text-accent-foreground shrink-0 mt-0.5" />
                                        <span>The project work may be carried out in the institution, industry, research laboratory, or any other competent institutions.</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Schedule & Evaluation */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-accent-foreground" />
                                Duration & Evaluation
                            </h2>
                            <Card className="border-border/50 bg-card/50 shadow-sm">
                                <CardContent className="p-6">
                                    <ul className="space-y-4">
                                        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                                            <span className="font-mono text-accent-foreground/50 shrink-0 mt-1">01</span>
                                            <span><strong className="text-foreground">Duration:</strong> Minimum of 16 weeks, extendable up to 24 weeks.</span>
                                        </li>
                                        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                                            <span className="font-mono text-accent-foreground/50 shrink-0 mt-1">02</span>
                                            <span><strong className="text-foreground">Mid-Semester Evaluation:</strong> Conducted after approximately 8 weeks. An interim project report must be submitted.</span>
                                        </li>
                                        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                                            <span className="font-mono text-accent-foreground/50 shrink-0 mt-1">03</span>
                                            <span><strong className="text-foreground">Final Evaluation:</strong> Includes submission of the final project report and a viva-voce.</span>
                                        </li>
                                        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                                            <span className="font-mono text-accent-foreground/50 shrink-0 mt-1">04</span>
                                            <span><strong className="text-foreground">Presentation:</strong> Students must present their work before the department committee as part of the evaluation.</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </section>

                    </div>

                    {/* Right Column: Quick Info */}
                    <div className="space-y-6">

                        {/* Credits Card */}
                        <Card className="border-border/50 overflow-hidden">
                            <CardHeader className="bg-muted/50 pb-3 border-b border-border/50 px-6">
                                <CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Credits Structure</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 text-center">
                                <div className="text-5xl font-bold font-mono text-accent-foreground mb-2">12</div>
                                <div className="text-xs uppercase tracking-widest text-muted-foreground">Total Credits</div>
                                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                                    Major project-based course with no traditional lecture/tutorial/practical split
                                </p>
                            </CardContent>
                        </Card>

                    </div>

                </div>
            </main>
        </div>
    );
}
