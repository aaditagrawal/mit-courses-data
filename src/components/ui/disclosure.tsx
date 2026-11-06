"use client";

import { useCallback, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

// The degree pools need one button and one panel, with a 200ms closing animation.
export function Disclosure({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [present, setPresent] = useState(false);
  const openRef = useRef(false);
  const panelId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupRef = useCallback((node: HTMLDivElement | null) => {
    if (node)
      return () => {
        if (closeTimer.current !== null) clearTimeout(closeTimer.current);
      };
  }, []);

  function toggle() {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    openRef.current = !openRef.current;
    setOpen(openRef.current);
    if (!openRef.current) {
      closeTimer.current = setTimeout(() => setPresent(false), 200);
    } else {
      setPresent(true);
    }
  }

  return (
    <div
      ref={cleanupRef}
      data-state={open ? "open" : "closed"}
      className="border border-border rounded-lg bg-card shadow-sm overflow-hidden group"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        data-state={open ? "open" : "closed"}
        onClick={toggle}
        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
      >
        {trigger}
        <div className="p-1 rounded-md text-muted-foreground group-hover:text-foreground transition-colors">
          <ChevronDown className="w-4 h-4 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
        </div>
      </button>
      <div
        id={panelId}
        hidden={!present}
        data-state={open ? "open" : "closed"}
        className="border-t border-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
      >
        {present && children}
      </div>
    </div>
  );
}
