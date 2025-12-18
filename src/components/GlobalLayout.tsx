'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { GlobalCommandDialog } from '@/components/CommandMenu';
import { CommandMenuProvider } from '@/lib/command-menu-context';
import { SearchResult } from '@/lib/courses';
import Link from 'next/link';

interface Props {
    children: React.ReactNode;
    courses: SearchResult[];
}

export function GlobalLayout({ children, courses }: Props) {
    return (
        <CommandMenuProvider>
            <GlobalCommandDialog data={courses} />

            {/* Global Header */}
            <div className="fixed top-4 right-4 z-[100] flex gap-2">
                <ModeToggle />
            </div>

            {children}
        </CommandMenuProvider>
    );
}
