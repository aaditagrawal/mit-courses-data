"use client";

import { styles } from "@/styles/site.stylex";
import { styleClass } from "@/styles/classes";

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
    <div className={styleClass("appDegreePageStyle1")}>
      <div className={styleClass("componentsApiDocsPageStyle2")}>
        <header className={styleClass("appCourseCodePageStyle32")}>
          <Link href="/" className={styleClass("componentsApiDocsPageStyle4")}>
            <MoveLeft className={styleClass("componentsApiDocsPageStyle5")} />
            Back to Home
          </Link>

          <div className={styleClass("appCourseCodePageStyle26")}>
            <div className={styleClass("componentsApiDocsPageStyle7")}>
              <Terminal className={styleClass("componentsApiDocsPageStyle8")} />
            </div>
            <h1 className={styleClass("componentsApiDocsPageStyle9")}>Agent API</h1>
            <p className={styleClass("componentsApiDocsPageStyle10")}>
              Query course catalogs and degree plans over a JSON REST API. Copy the docs as Markdown
              to give your agent full context.
            </p>
          </div>

          <div className={styleClass("componentsApiDocsPageStyle11")}>
            <Button
              variant="outline"
              size="sm"
              xstyle={styles.appCourseCodePageStyle16}
              className="sx-appCourseCodePageStyle16 ui-text-defined"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className={styleClass("componentsApiDocsPageStyle5")} />
                  Copied
                </>
              ) : (
                <>
                  <Copy className={styleClass("componentsApiDocsPageStyle5")} />
                  Copy as Markdown
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              xstyle={styles.appDegreeSlugPageStyle26}
              className="sx-appDegreeSlugPageStyle26 ui-text-defined"
              asChild
            >
              <a href="/api/v1" target="_blank" rel="noopener noreferrer">
                Open /api/v1
              </a>
            </Button>
          </div>
        </header>

        <section className={styleClass("appCourseCodePageStyle26")}>
          <h2 className={styleClass("componentsApiDocsPageStyle17")}>Base URL</h2>
          <code className={styleClass("componentsApiDocsPageStyle18")}>
            {baseUrl || "https://courses.coolstuff.work"}
          </code>
        </section>

        <section className={styleClass("appCourseCodePageStyle26")}>
          <h2 className={styleClass("componentsApiDocsPageStyle17")}>Response format</h2>
          <pre className={styleClass("componentsApiDocsPageStyle21")}>
            {`{
  "data": { ... },
  "meta": { "total": 42, "count": 20, "query": "..." }
}`}
          </pre>
        </section>

        <section className={styleClass("appCourseCodePageStyle26")}>
          <h2 className={styleClass("componentsApiDocsPageStyle17")}>Query parameters</h2>
          <div className={styleClass("componentsApiDocsPageStyle24")}>
            {[
              ["q", "Text search (code, title, department, syllabus, tags)"],
              ["type", "On /search: all, courses, or degrees"],
              ["department", "Filter by department name or slug"],
              ["branch", "Filter by branch slug (e.g. cps, ece)"],
              ["tag", "Filter by tag (e.g. core, elective)"],
              ["limit", "Max results (default 50, max 100)"],
              ["offset", "Pagination offset"],
            ].map(([param, desc]) => (
              <div key={param} className={styleClass("componentsApiDocsPageStyle25")}>
                <code className={styleClass("componentsApiDocsPageStyle26")}>{param}</code>
                <span className={styleClass("componentsApiDocsPageStyle27")}>{desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styleClass("appCourseCodePageStyle12")}>
          <h2 className={styleClass("componentsApiDocsPageStyle17")}>Endpoints</h2>
          <div className={styleClass("appCourseCodePageStyle26")}>
            {ENDPOINTS.map((ep) => (
              <div key={ep.path} className={styleClass("componentsApiDocsPageStyle31")}>
                <div className={styleClass("componentsApiDocsPageStyle32")}>
                  <span className={styleClass("componentsApiDocsPageStyle33")}>{ep.method}</span>
                  <span>{ep.path}</span>
                </div>
                <p className={styleClass("componentsApiDocsPageStyle34")}>{ep.desc}</p>
                {ep.params && (
                  <p className={styleClass("componentsApiDocsPageStyle35")}>
                    Params: {ep.params.join(", ")}
                  </p>
                )}
                {ep.example && baseUrl && (
                  <a
                    href={`${baseUrl}${ep.example}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styleClass("componentsApiDocsPageStyle36")}
                  >
                    {baseUrl}
                    {ep.example}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={styleClass("appCourseCodePageStyle26")}>
          <h2 className={styleClass("componentsApiDocsPageStyle17")}>Notes for agents</h2>
          <ul className={styleClass("componentsApiDocsPageStyle39")}>
            <li>
              Course codes contain spaces — URL-encode them in path segments (e.g.{" "}
              <code className={styleClass("appCourseCodePageStyle16")}>MAT%202122</code>).
            </li>
            <li>
              Use <code className={styleClass("appCourseCodePageStyle16")}>/api/v1/search</code> for
              broad queries; use resource endpoints when you know the entity type.
            </li>
            <li>
              Paginate with <code className={styleClass("appCourseCodePageStyle16")}>limit</code>{" "}
              and <code className={styleClass("appCourseCodePageStyle16")}>offset</code> for large
              result sets.
            </li>
            <li>All endpoints return JSON and support CORS.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
