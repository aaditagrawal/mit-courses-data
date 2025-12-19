'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MoveLeft, FileX2, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    const pathname = usePathname();
    const isCoursePath = pathname?.startsWith('/course/');

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-500">
                <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-destructive/10 border border-destructive/20">
                        <FileX2 className="w-12 h-12 text-destructive" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        {isCoursePath
                            ? "Subject Data Not Properly Published in the Handbook"
                            : "Page Not Found"}
                    </h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {isCoursePath
                            ? "The course you're looking for hasn't been published yet or the data may be incomplete. Please check back later or search for another course."
                            : "The page you are looking for doesn't exist or has been moved."}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild variant="default">
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/explore" className="flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            Explore Courses
                        </Link>
                    </Button>
                </div>

                {isCoursePath && (
                    <div className="pt-6 border-t border-border/50">
                        <p className="text-sm text-muted-foreground mb-3 font-medium">
                            If you think this is a mistake, kindly reach out
                        </p>
                        <a
                            href="mailto:aadit.mitmpl2023@learner.manipal.edu?subject=COURSE%20WEBSITE%20BUG%20REPORT&body=Hey!%0A%0AFound%20the%20following%20issues%20in%20the%20site%20data%3A%0A%0ACourse%20Code%3A%0AIssue%20found%3A"
                            className="inline-flex items-center gap-2 text-xs bg-secondary/50 hover:bg-secondary border border-border/50 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300"
                        >
                            Report Discrepancies (via Email)
                        </a>
                    </div>
                )}

                <p className="text-xs text-muted-foreground/60 font-mono pt-4">
                    Error 404 • {isCoursePath ? "Course not found" : "Null route"}
                </p>
            </div>
        </div>
    );
}
