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

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {degrees.map((degree) => (
            <Link
              key={degree.slug}
              href={`/degree/${degree.slug}`}
              className="group h-full"
            >
              <div className="flex flex-col h-full p-6 rounded-2xl border bg-card hover:bg-muted/50 transition-all duration-300 hover:border-primary/30 hover:shadow-md group-active:scale-[0.98]">
                <div className="flex-1 space-y-2">
                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {degree.title}
                  </h2>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {degree.department}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between text-xs font-mono text-muted-foreground/50">
                  <span className="group-hover:text-primary/70 transition-colors">View Structure</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
