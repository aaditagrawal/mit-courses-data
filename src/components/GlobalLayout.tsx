"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { GlobalCommandDialog } from "@/components/CommandMenu";
import { CommandMenuProvider } from "@/lib/command-menu-context";
import { CourseSummary } from "@/lib/courses";
import { DegreeSummary } from "@/lib/degrees";

interface Props {
  children: React.ReactNode;
  courses: CourseSummary[];
  degrees: DegreeSummary[];
}

export function GlobalLayout({ children, courses, degrees }: Props) {
  return (
    <CommandMenuProvider courses={courses}>
      <GlobalCommandDialog courses={courses} degrees={degrees} />

      {/* Global Header */}
      <div className="fixed top-4 right-4 z-[100] flex gap-3">
        <ModeToggle />
      </div>

      {children}
    </CommandMenuProvider>
  );
}
