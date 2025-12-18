import { getAllDegreeSummaries } from "@/lib/degrees";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Book, GraduationCap, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Degrees | MIT Manipal",
  description: "Explore degree structures and course tracks",
};

export default function DegreesIndexPage() {
  const degrees = getAllDegreeSummaries();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <header className="space-y-4 text-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors font-mono text-xs uppercase tracking-wider mb-6 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary/5 rounded-full mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight pb-2">
              Degree Programs
            </h1>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-1 max-w-3xl mx-auto">
          {degrees.map((degree) => (
            <Link
              key={degree.slug}
              href={`/degree/${degree.slug}`}
              className="group"
            >
              <div className="flex items-center p-4 rounded-xl border bg-card hover:bg-muted/50 transition-all duration-200 hover:border-primary/30 hover:shadow-sm group-active:scale-[0.99]">
                <div className="flex-shrink-0 mr-4 p-3 bg-secondary rounded-lg group-hover:bg-background transition-colors border border-transparent group-hover:border-border/50">
                  <Book className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate pr-4">
                    {degree.title}
                  </h2>
                  <p className="text-xs text-muted-foreground truncate">
                    {degree.department}
                  </p>
                </div>

                <div className="flex items-center text-muted-foreground/30 group-hover:text-primary/50 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}

          {degrees.length === 0 && (
            <div className="col-span-full py-16 text-center text-muted-foreground border-2 border-dashed rounded-xl bg-muted/30">
              <p>No degree data found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
