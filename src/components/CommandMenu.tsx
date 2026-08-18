"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, BookOpen, GraduationCap } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandList,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import { CourseSummary, SearchResult } from "@/lib/courses";
import { DegreeSummary } from "@/lib/degrees";
import { useCommandMenu } from "@/lib/command-menu-context";
import { getCourseLink } from "@/lib/utils";

/**
 * A rendered row. The snippet is resolved when the row is built rather than on
 * every render, so nothing downstream needs the syllabus text and the cache
 * below never retains it.
 */
interface PaletteCourse extends CourseSummary {
  snippet: string;
}

interface Props {
  courses: CourseSummary[];
  degrees: DegreeSummary[];
}

interface SearchApiResponse {
  data?: {
    courses?: {
      data?: SearchResult[];
    };
    degrees?: {
      data?: DegreeSummary[];
    };
  };
}

interface SearchHit {
  courses: PaletteCourse[];
  degrees: DegreeSummary[];
}

const EMPTY_HIT: SearchHit = { courses: [], degrees: [] };
const PREVIEW_COUNT = 40;
const QUERY_CACHE_LIMIT = 64;

/** The syllabus line that matched, windowed around the match. */
function buildSnippet(course: SearchResult, query: string): string {
  if (!query) return course.department;

  const lowerQuery = query.toLowerCase();
  const matchingSyllabus = course.syllabus?.find((s) => s.toLowerCase().includes(lowerQuery));
  if (!matchingSyllabus) return course.department;

  const index = matchingSyllabus.toLowerCase().indexOf(lowerQuery);
  const start = Math.max(0, index - 20);
  const end = Math.min(matchingSyllabus.length, index + lowerQuery.length + 50);
  return "..." + matchingSyllabus.substring(start, end) + "...";
}

function toPaletteCourse(course: SearchResult, query: string): PaletteCourse {
  return {
    code: course.code,
    title: course.title,
    department: course.department,
    snippet: buildSnippet(course, query),
  };
}

/**
 * `count` uniformly random items, via a partial Fisher-Yates over a copy.
 *
 * Only the first `count` positions are resolved, so this is O(count) rather
 * than the O(n log n) of sorting. It also actually shuffles: comparing with
 * `() => 0.5 - Math.random()` is not a consistent comparator, so the resulting
 * order depends on the sort algorithm and is far from uniform.
 */
function sample<T>(items: T[], count: number): T[] {
  const pool = items.slice();
  const take = Math.min(count, pool.length);
  for (let i = 0; i < take; i++) {
    const j = i + Math.floor(Math.random() * (pool.length - i));
    const swap = pool[i];
    pool[i] = pool[j];
    pool[j] = swap;
  }
  pool.length = take;
  return pool;
}

export function GlobalCommandDialog({ courses, degrees }: Props) {
  const { open, setOpen } = useCommandMenu();
  const [query, setQuery] = React.useState("");
  const [hit, setHit] = React.useState<SearchHit>(EMPTY_HIT);
  const [isSearching, setIsSearching] = React.useState(false);
  const router = useRouter();

  // Responses keyed by query. The palette fires a request per keystroke, so
  // backspacing or retyping otherwise refetches results already in memory.
  const cache = React.useRef(new Map<string, SearchHit>());

  // Only the rows that get rendered are ever sampled. Deferred to an effect so
  // the server-rendered markup and the first client render agree.
  const [preview, setPreview] = React.useState<PaletteCourse[]>([]);

  React.useEffect(() => {
    setPreview(
      sample(courses, PREVIEW_COUNT).map((course) => ({ ...course, snippet: course.department })),
    );
  }, [courses]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  React.useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setHit(EMPTY_HIT);
      setIsSearching(false);
      return;
    }

    const cached = cache.current.get(trimmedQuery);
    if (cached) {
      setHit(cached);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    setIsSearching(true);

    const timeout = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/v1/search?q=${encodeURIComponent(trimmedQuery)}&type=all&limit=${PREVIEW_COUNT}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          setHit(EMPTY_HIT);
          return;
        }

        // SAFETY: the response comes from this app's own /api/v1/search route,
        // whose envelope SearchApiResponse mirrors. Every field below is read
        // through optional chaining with an empty-array fallback, so a payload
        // that ever drifts from the contract degrades to "no results" rather
        // than throwing.
        const payload = (await response.json()) as SearchApiResponse;
        // Projected before caching: retaining raw results would hold the
        // syllabus and reference text this PR exists to stop shipping.
        const next: SearchHit = {
          courses: (payload.data?.courses?.data ?? []).map((course) =>
            toPaletteCourse(course, trimmedQuery),
          ),
          degrees: payload.data?.degrees?.data ?? [],
        };

        if (cache.current.size >= QUERY_CACHE_LIMIT) {
          const oldest = cache.current.keys().next();
          if (!oldest.done) cache.current.delete(oldest.value);
        }
        cache.current.set(trimmedQuery, next);

        setHit(next);
      } catch (error) {
        const aborted = error instanceof Error && error.name === "AbortError";
        if (!aborted) {
          setHit(EMPTY_HIT);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 120);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query]);

  const filteredDegrees = React.useMemo(() => {
    if (!query) return degrees.slice(0, 10);
    return hit.degrees.slice(0, 10);
  }, [query, degrees, hit]);

  const filteredCourses = React.useMemo<PaletteCourse[]>(() => {
    if (!query) return preview;
    return hit.courses.slice(0, PREVIEW_COUNT);
  }, [query, hit, preview]);

  const handleSelectCourse = (courseCode: string) => {
    setOpen(false);
    router.push(getCourseLink(courseCode));
  };

  const handleSelectDegree = (slug: string) => {
    setOpen(false);
    router.push(`/degree/${slug}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          aria-label="Search courses, degrees, or content"
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search courses, degrees, or content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <CommandList>
        {filteredCourses.length === 0 && filteredDegrees.length === 0 && (
          <CommandEmpty>{isSearching ? "Searching..." : "No results found."}</CommandEmpty>
        )}

        {filteredDegrees.length > 0 && (
          <CommandGroup heading="Degrees">
            {filteredDegrees.map((degree) => (
              <CommandItem
                key={degree.slug}
                value={degree.title}
                onSelect={() => handleSelectDegree(degree.slug)}
              >
                <GraduationCap className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-medium truncate">{degree.title}</span>
                  <span className="text-[10px] text-muted-foreground truncate">
                    {degree.department}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredCourses.length > 0 && (
          <CommandGroup heading="Courses">
            {filteredCourses.map((course) => (
              <CommandItem
                key={`${course.code}-${course.title}`}
                value={`${course.code} ${course.title}`}
                onSelect={() => handleSelectCourse(course.code)}
              >
                <BookOpen className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-semibold text-foreground/80">
                      {course.code}
                    </span>
                    <span className="text-sm font-medium truncate">{course.title}</span>
                    {course.department && (
                      <span className="ml-auto text-[10px] text-muted-foreground/60 shrink-0">
                        {course.department
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground truncate max-w-full sm:max-w-md">
                    {course.snippet}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}

export function CommandMenuTrigger() {
  const { setOpen } = useCommandMenu();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground bg-secondary/50 border border-input rounded-md cursor-pointer hover:bg-secondary/80 transition-colors w-full max-w-lg mx-auto"
    >
      <Search className="w-4 h-4" />
      <span className="flex-1 text-left">Search courses...</span>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
