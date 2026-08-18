"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, Terminal, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiDocsMarkdown } from "@/lib/api/docs";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1",
    desc: "Discovery — lists all available endpoints",
  },
  {
    method: "GET",
    path: "/api/v1/search",
    desc: "Unified search across courses and degrees",
    params: ["q", "type", "department", "branch", "tag", "limit", "offset"],
    example: "/api/v1/search?q=machine+learning&type=all&limit=10",
  },
  {
    method: "GET",
    path: "/api/v1/courses",
    desc: "List or search courses",
    params: ["q", "department", "branch", "tag", "limit", "offset"],
    example: "/api/v1/courses?q=CSS&branch=cps&limit=20",
  },
  {
    method: "GET",
    path: "/api/v1/courses/{code}",
    desc: "Get a single course by code",
    example: "/api/v1/courses/MAT%202122",
  },
  {
    method: "GET",
    path: "/api/v1/departments",
    desc: "List all departments",
  },
  {
    method: "GET",
    path: "/api/v1/departments/{slug}",
    desc: "Full catalog for a department",
    example: "/api/v1/departments/cps",
  },
  {
    method: "GET",
    path: "/api/v1/degrees",
    desc: "List or search degree programs",
    params: ["q", "limit", "offset"],
    example: "/api/v1/degrees?q=computer&limit=10",
  },
  {
    method: "GET",
    path: "/api/v1/degrees/{slug}",
    desc: "Full degree plan with semesters and elective pools",
    example: "/api/v1/degrees/btech-cse",
  },
];

export function ApiDocsPage() {
  const [copied, setCopied] = useState(false);
  // Undefined while server-rendering; optional chaining keeps the SSR value "".
  const baseUrl = globalThis.window?.location.origin ?? "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getApiDocsMarkdown(baseUrl));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-10">
        <header className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-xs"
          >
            <MoveLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>

          <div className="space-y-3">
            <div className="inline-flex items-center justify-center p-3 bg-primary/5 rounded-full">
              <Terminal className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Agent API</h1>
            <p className="text-muted-foreground leading-relaxed">
              Query course catalogs and degree plans over a JSON REST API. Copy the docs as Markdown
              to give your agent full context.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="font-mono text-xs" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy as Markdown
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="font-mono text-xs text-muted-foreground"
              asChild
            >
              <a href="/api/v1" target="_blank" rel="noopener noreferrer">
                Open /api/v1
              </a>
            </Button>
          </div>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Base URL
          </h2>
          <code className="block text-sm font-mono bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 break-all">
            {baseUrl || "https://courses.coolstuff.work"}
          </code>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Response format
          </h2>
          <pre className="text-xs font-mono bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 overflow-x-auto text-muted-foreground">
            {`{
  "data": { ... },
  "meta": { "total": 42, "count": 20, "query": "..." }
}`}
          </pre>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Query parameters
          </h2>
          <div className="text-sm text-muted-foreground space-y-2 border border-border/50 rounded-lg divide-y divide-border/50">
            {[
              ["q", "Text search (code, title, department, syllabus, tags)"],
              ["type", "On /search: all, courses, or degrees"],
              ["department", "Filter by department name or slug"],
              ["branch", "Filter by branch slug (e.g. cps, ece)"],
              ["tag", "Filter by tag (e.g. core, elective)"],
              ["limit", "Max results (default 50, max 100)"],
              ["offset", "Pagination offset"],
            ].map(([param, desc]) => (
              <div key={param} className="flex gap-4 px-4 py-2.5">
                <code className="font-mono text-xs text-accent-foreground shrink-0">{param}</code>
                <span className="text-xs">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Endpoints
          </h2>
          <div className="space-y-3">
            {ENDPOINTS.map((ep) => (
              <div
                key={ep.path}
                className="p-4 rounded-lg border border-border/50 bg-card/50 space-y-2"
              >
                <div className="flex flex-wrap items-baseline gap-2 font-mono text-sm">
                  <span className="text-accent-foreground">{ep.method}</span>
                  <span>{ep.path}</span>
                </div>
                <p className="text-sm text-muted-foreground">{ep.desc}</p>
                {ep.params && (
                  <p className="text-xs font-mono text-muted-foreground/70">
                    Params: {ep.params.join(", ")}
                  </p>
                )}
                {ep.example && baseUrl && (
                  <a
                    href={`${baseUrl}${ep.example}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors break-all"
                  >
                    {baseUrl}
                    {ep.example}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Notes for agents
          </h2>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
            <li>
              Course codes contain spaces — URL-encode them in path segments (e.g.{" "}
              <code className="font-mono text-xs">MAT%202122</code>).
            </li>
            <li>
              Use <code className="font-mono text-xs">/api/v1/search</code> for broad queries; use
              resource endpoints when you know the entity type.
            </li>
            <li>
              Paginate with <code className="font-mono text-xs">limit</code> and{" "}
              <code className="font-mono text-xs">offset</code> for large result sets.
            </li>
            <li>All endpoints return JSON and support CORS.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
