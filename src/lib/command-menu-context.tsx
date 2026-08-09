"use client";

import * as React from "react";
import { CourseSummary } from "@/lib/courses";

interface CommandMenuContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  /**
   * Course summaries the root layout already serialised for the palette.
   * Other client components should read them from here rather than take
   * their own copy as a prop, which would duplicate the payload in the same
   * document.
   */
  courses: CourseSummary[];
}

const CommandMenuContext = React.createContext<CommandMenuContextType | undefined>(undefined);

export function CommandMenuProvider({
  children,
  courses,
}: {
  children: React.ReactNode;
  courses: CourseSummary[];
}) {
  const [open, setOpen] = React.useState(false);
  const value = React.useMemo(() => ({ open, setOpen, courses }), [open, courses]);

  return <CommandMenuContext.Provider value={value}>{children}</CommandMenuContext.Provider>;
}

export function useCommandMenu() {
  const context = React.useContext(CommandMenuContext);
  if (!context) {
    throw new Error("useCommandMenu must be used within a CommandMenuProvider");
  }
  return context;
}
