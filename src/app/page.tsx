import Link from 'next/link';
import { CommandMenuTrigger } from '@/components/CommandMenu';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 bg-background text-foreground transition-colors duration-300">

      <div className="z-10 w-full max-w-3xl flex flex-col items-center gap-6 sm:gap-8 text-center animate-in fade-in zoom-in duration-700 slide-in-from-bottom-5">

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-sans font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            Course Web
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl font-light tracking-wide max-w-md mx-auto">
            MIT Manipal Academic Year 2025-2026
          </p>
        </div>

        <div className="w-full max-w-xl">
          <CommandMenuTrigger />
          <p className="mt-4 text-xs text-muted-foreground font-mono opacity-60">
            Press <kbd className="border rounded px-1">Ctrl</kbd> + <kbd className="border rounded px-1">K</kbd> to search
          </p>
        </div>

        {/* Explore Graph Link */}
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Explore Graph Link */}
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary border border-border/50 rounded-lg text-sm font-mono text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
              <circle cx="12" cy="12" r="2" />
              <circle cx="6" cy="6" r="2" />
              <circle cx="18" cy="6" r="2" />
              <circle cx="6" cy="18" r="2" />
              <circle cx="18" cy="18" r="2" />
              <path d="M12 10V8M12 14v2M10 12H8M14 12h2M7.5 7.5 10 10M14 14l2.5 2.5M7.5 16.5 10 14M14 10l2.5-2.5" />
            </svg>
            <span>Explore Graph</span>
            <span className="opacity-0 group-hover:opacity-60 transition-opacity">→</span>
          </Link>

          {/* Degree Structure Link */}
          <Link
            href="/degree"
            className="group inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary border border-border/50 rounded-lg text-sm font-mono text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            <span>Degree Plans</span>
            <span className="opacity-0 group-hover:opacity-60 transition-opacity">→</span>
          </Link>
        </div>

        <div className="mt-12 space-y-8">
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="p-4 bg-secondary/20 rounded-lg border border-border/50 max-w-md mx-auto">
              <p className="text-sm mb-3 opacity-80">
                Data has been extracted from curriculum published by Manipal Institute of Technology, Manipal.
              </p>
              <a
                href="mailto:aadit.mitmpl2023@learner.manipal.edu?subject=COURSE%20WEBSITE%20BUG%20REPORT&body=Hey!%0A%0AFound%20the%20following%20issues%20in%20the%20site%20data%3A%0A%0ACourse%20Code%3A%0AIssue%20found%3A"
                className="inline-flex items-center gap-2 text-xs bg-background border border-border/50 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Report Discrepancies (via Email)
              </a>
            </div>
            <p className="text-xs opacity-60">
              Made by <a href="https://aadit.cc" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent-foreground transition-colors">Aadit</a>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
