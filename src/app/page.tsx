import { getAllCourses } from '@/lib/courses';
import { CommandMenu } from '@/components/CommandMenu';
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  const courses = getAllCourses();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">
      {/* Theme toggle in top-right corner */}
      <div className="fixed top-6 right-6 z-50">
        <ModeToggle />
      </div>
      
      <div className="z-10 w-full max-w-3xl flex flex-col items-center gap-8 text-center animate-in fade-in zoom-in duration-700 slide-in-from-bottom-5">

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-sans font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            Course Web
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl font-light tracking-wide max-w-md mx-auto">
            MIT Manipal Academic Year 2025-2026
          </p>
        </div>

        <div className="w-full max-w-xl">
          <CommandMenu data={courses} />
          <p className="mt-4 text-xs text-muted-foreground font-mono opacity-60">
            Press <kbd className="border rounded px-1">Ctrl</kbd> + <kbd className="border rounded px-1">K</kbd> to search
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm font-mono text-muted-foreground opacity-50 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center">
              <span className="font-bold text-foreground">17</span>
              <span>Departments</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-foreground">{courses.length}</span>
              <span>Courses</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-foreground">2025</span>
              <span>Academic Year</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-foreground">MIT</span>
              <span>Manipal</span>
            </div>
          </div>
          
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
