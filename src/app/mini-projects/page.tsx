import { ModeToggle } from '@/components/mode-toggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoveLeft, BookOpen, GraduationCap } from 'lucide-react';
import Link from 'next/link';


export const metadata = {
    title: 'Mini Projects for Minor Specialisation | MIT Manipal',
    description: 'Information about 4191 courses - 8 credit mini projects for students pursuing a minor specialisation',
};

export default function MiniProjectsPage() {
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
                            Minor Specialisation
                        </Badge>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                        Mini Projects for Minor Specialisation
                    </h1>
                    <div className="flex items-center gap-4 text-lg font-mono text-muted-foreground">
                        <span className="text-accent-foreground font-semibold">XXX 4191</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Main Content */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Overview */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-accent-foreground" />
                                What are 4191 Courses?
                            </h2>
                            <Card className="border-border/50 bg-card/50 shadow-sm">
                                <CardContent className="p-6 space-y-4">
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        Courses with the code <span className="font-mono text-accent-foreground">XXX 4191</span> are <strong className="text-foreground">Mini Projects for Minor Specialisation</strong>.
                                        These are specialized project-based courses designed for students pursuing a minor in a specific discipline.
                                    </p>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        The "XXX" prefix varies based on the department offering the minor. For example:
                                    </p>
                                    <ul className="space-y-2 ml-4">
                                        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                                            <span className="font-mono text-accent-foreground shrink-0">•</span>
                                            <span><span className="font-mono text-accent-foreground">AAE 4191</span> - Aerospace Engineering Mini Project</span>
                                        </li>
                                        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                                            <span className="font-mono text-accent-foreground shrink-0">•</span>
                                            <span><span className="font-mono text-accent-foreground">BIO 4191</span> - Biotechnology Mini Project</span>
                                        </li>
                                        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                                            <span className="font-mono text-accent-foreground shrink-0">•</span>
                                            <span><span className="font-mono text-accent-foreground">CIE 4191</span> - Civil Engineering Mini Project</span>
                                        </li>
                                        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                                            <span className="font-mono text-accent-foreground shrink-0">•</span>
                                            <span className="text-xs italic">and similarly for other departments...</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Key Features */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-accent-foreground" />
                                Key Features
                            </h2>
                            <Card className="border-border/50 bg-card/50 shadow-sm">
                                <CardContent className="p-6">
                                    <ul className="space-y-3">
                                        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground hover:text-foreground transition-colors">
                                            <span className="font-mono text-accent-foreground/50 shrink-0 mt-1">01</span>
                                            <span><strong className="text-foreground">8 Credits:</strong> These courses carry 8 credits, reflecting the substantial project work involved.</span>
                                        </li>
                                        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground hover:text-foreground transition-colors">
                                            <span className="font-mono text-accent-foreground/50 shrink-0 mt-1">02</span>
                                            <span><strong className="text-foreground">Project-Based Learning:</strong> Focus on hands-on, practical application of knowledge in the minor discipline.</span>
                                        </li>
                                        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground hover:text-foreground transition-colors">
                                            <span className="font-mono text-accent-foreground/50 shrink-0 mt-1">03</span>
                                            <span><strong className="text-foreground">Minor Requirements:</strong> These courses are specifically for students who have declared and are completing a minor specialisation.</span>
                                        </li>
                                        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground hover:text-foreground transition-colors">
                                            <span className="font-mono text-accent-foreground/50 shrink-0 mt-1">04</span>
                                            <span><strong className="text-foreground">Department-Specific:</strong> The project work is supervised by faculty from the respective department and aligns with that discipline's focus areas.</span>
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
                                <CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Credit Structure</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 text-center">
                                <div className="text-5xl font-bold font-mono text-accent-foreground mb-2">8</div>
                                <div className="text-xs uppercase tracking-widest text-muted-foreground">Total Credits</div>
                                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                                    Project-based course with no traditional lecture/tutorial/practical split
                                </p>
                            </CardContent>
                        </Card>

                    </div>

                </div>
            </main>
        </div>
    );
}
