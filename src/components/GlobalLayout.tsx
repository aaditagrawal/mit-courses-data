'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { GlobalCommandDialog } from '@/components/CommandMenu';
import { CommandMenuProvider } from '@/lib/command-menu-context';
import { SearchResult } from '@/lib/courses';
import { DegreeSummary } from '@/lib/degrees';
import Link from 'next/link';

interface Props {
    children: React.ReactNode;
    courses: SearchResult[];
    degrees: DegreeSummary[];
}

export function GlobalLayout({ children, courses, degrees }: Props) {
    return (
        <CommandMenuProvider>
            <GlobalCommandDialog courses={courses} degrees={degrees} />

            {/* Global Header */}
            <div className="fixed top-4 right-4 z-[100] flex gap-2">
                <ModeToggle />
            </div>

            {children}
        </CommandMenuProvider>
    );
}
