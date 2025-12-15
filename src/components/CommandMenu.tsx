'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Search, BookOpen, BookText, Code } from 'lucide-react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { SearchResult } from '@/lib/courses';

interface Props {
    data?: SearchResult[];
}

export function CommandMenu({ data = [] }: Props) {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const filteredCourses = React.useMemo(() => {
        if (!query) return data.slice(0, 50);
        const lowerQuery = query.toLowerCase();

        return data.filter(course => {
            const matchesCode = course.code.toLowerCase().includes(lowerQuery);
            const matchesTitle = course.title.toLowerCase().includes(lowerQuery);
            const matchesDepartment = course.department?.toLowerCase().includes(lowerQuery);
            const matchesSyllabus = course.syllabus?.some(s => s.toLowerCase().includes(lowerQuery));
            const matchesTags = course.tags?.some(t => t.toLowerCase().includes(lowerQuery));

            return matchesCode || matchesTitle || matchesSyllabus || matchesTags || matchesDepartment;
        }).slice(0, 50); // Slice AFTER filtering
    }, [query, data]);

    const getSnippet = (course: SearchResult, q: string) => {
        if (!q) return course.department;
        const lowerQ = q.toLowerCase();
        const matchingSyllabus = course.syllabus?.find(s => s.toLowerCase().includes(lowerQ));
        if (matchingSyllabus) {
            // Truncate snippet
            const index = matchingSyllabus.toLowerCase().indexOf(lowerQ);
            const start = Math.max(0, index - 20);
            const end = Math.min(matchingSyllabus.length, index + lowerQ.length + 50);
            return "..." + matchingSyllabus.substring(start, end) + "...";
        }
        return course.department;
    }

    const handleSelect = (courseCode: string) => {
        setOpen(false);
        router.push(`/course/${courseCode}`);
    };

    return (
        <>
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

            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                shouldFilter={false} // We will filter manually to handle large datasets and deep search
            >
                <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <input
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Search by course code, title, or content..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <CommandList>
                    {filteredCourses.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}

                    {filteredCourses.map((course) => (
                        <CommandItem
                            key={course.code + course.title}
                            value={`${course.code} ${course.title}`}
                            onSelect={() => handleSelect(course.code)}
                        >
                            <BookOpen className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs font-semibold text-foreground/80">{course.code}</span>
                                    <span className="text-sm font-medium">{course.title}</span>
                                    {course.department && (
                                        <span className="ml-auto text-[10px] text-muted-foreground/60">
                                            {course.department.split(' ').map(w => w[0]).join('')}
                                        </span>
                                    )}
                                </div>
                                <span className="text-[10px] text-muted-foreground truncate max-w-[400px]">
                                    {getSnippet(course, query)}
                                </span>
                            </div>
                        </CommandItem>
                    ))}

                </CommandList>
            </CommandDialog>
        </>
    );
}
