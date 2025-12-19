'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Search, BookOpen, GraduationCap } from 'lucide-react';
import {
    CommandDialog,
    CommandEmpty,
    CommandList,
    CommandItem,
    CommandGroup,
} from '@/components/ui/command';
import { SearchResult } from '@/lib/courses';
import { DegreeSummary } from '@/lib/degrees';
import { useCommandMenu } from '@/lib/command-menu-context';
import { getCourseLink } from '@/lib/utils';

interface Props {
    courses: SearchResult[];
    degrees: DegreeSummary[];
}

export function GlobalCommandDialog({ courses, degrees }: Props) {
    const { open, setOpen } = useCommandMenu();
    const [query, setQuery] = React.useState("");
    const router = useRouter();

    const [randomizedCourses, setRandomizedCourses] = React.useState<SearchResult[]>([]);

    React.useEffect(() => {
        setRandomizedCourses([...courses].sort(() => 0.5 - Math.random()));
    }, [courses]);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [open, setOpen]);

    const filteredDegrees = React.useMemo(() => {
        if (!query) return degrees.slice(0, 10);
        const lowerQuery = query.toLowerCase();
        return degrees.filter(degree =>
            degree.title.toLowerCase().includes(lowerQuery) ||
            degree.department.toLowerCase().includes(lowerQuery)
        ).slice(0, 10);
    }, [query, degrees]);

    const filteredCourses = React.useMemo(() => {
        if (!query) return randomizedCourses.slice(0, 40);
        const lowerQuery = query.toLowerCase();

        return courses.filter(course => {
            const matchesCode = course.code.toLowerCase().includes(lowerQuery);
            const matchesTitle = course.title.toLowerCase().includes(lowerQuery);
            const matchesDepartment = course.department?.toLowerCase().includes(lowerQuery);
            const matchesSyllabus = course.syllabus?.some(s => s.toLowerCase().includes(lowerQuery));
            const matchesTags = course.tags?.some(t => t.toLowerCase().includes(lowerQuery));

            return matchesCode || matchesTitle || matchesSyllabus || matchesTags || matchesDepartment;
        }).slice(0, 40);
    }, [query, courses, randomizedCourses]);

    const getSnippet = (course: SearchResult, q: string) => {
        if (!q) return course.department;
        const lowerQ = q.toLowerCase();
        const matchingSyllabus = course.syllabus?.find(s => s.toLowerCase().includes(lowerQ));
        if (matchingSyllabus) {
            const index = matchingSyllabus.toLowerCase().indexOf(lowerQ);
            const start = Math.max(0, index - 20);
            const end = Math.min(matchingSyllabus.length, index + lowerQ.length + 50);
            return "..." + matchingSyllabus.substring(start, end) + "...";
        }
        return course.department;
    }

    const handleSelectCourse = (courseCode: string) => {
        setOpen(false);
        router.push(getCourseLink(courseCode));
    };

    const handleSelectDegree = (slug: string) => {
        setOpen(false);
        router.push(`/degree/${slug}`);
    };

    return (
        <CommandDialog
            open={open}
            onOpenChange={setOpen}
            shouldFilter={false}
        >
            <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <input
                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Search courses, degrees, or content..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <CommandList>
                {filteredCourses.length === 0 && filteredDegrees.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}

                {filteredDegrees.length > 0 && (
                    <CommandGroup heading="Degrees">
                        {filteredDegrees.map((degree) => (
                            <CommandItem
                                key={degree.slug}
                                value={degree.title}
                                onSelect={() => handleSelectDegree(degree.slug)}
                            >
                                <GraduationCap className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-sm font-medium truncate">{degree.title}</span>
                                    <span className="text-[10px] text-muted-foreground truncate">{degree.department}</span>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                {filteredCourses.length > 0 && (
                    <CommandGroup heading="Courses">
                        {filteredCourses.map((course) => (
                            <CommandItem
                                key={`${course.code}-${course.title}`}
                                value={`${course.code} ${course.title}`}
                                onSelect={() => handleSelectCourse(course.code)}
                            >
                                <BookOpen className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                <div className="flex flex-col min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-mono text-xs font-semibold text-foreground/80">{course.code}</span>
                                        <span className="text-sm font-medium truncate">{course.title}</span>
                                        {course.department && (
                                            <span className="ml-auto text-[10px] text-muted-foreground/60 shrink-0">
                                                {course.department.split(' ').map(w => w[0]).join('')}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground truncate max-w-full sm:max-w-md">
                                        {getSnippet(course, query)}
                                    </span>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </CommandList>
        </CommandDialog>
    );
}

export function CommandMenuTrigger() {
    const { setOpen } = useCommandMenu();

    return (
        <div
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground bg-secondary/50 border border-input rounded-md cursor-pointer hover:bg-secondary/80 transition-colors w-full max-w-lg mx-auto"
        >
            <Search className="w-4 h-4" />
            <span className="flex-1 text-left">Search courses...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
            </kbd>
        </div>
    );
}
