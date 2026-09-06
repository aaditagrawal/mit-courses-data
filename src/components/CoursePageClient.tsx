"use client";

import { styles } from "@/styles/site.stylex";
import { styleClass } from "@/styles/classes";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchReferenceButton } from "@/components/course-actions";
import { ModeToggle } from "@/components/mode-toggle";
import { MoveLeft, BookOpen, Loader2, FileX2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Course {
  sem: number | null;
  code: string;
  title: string;
  credits: { l: number; t: number; p: number; c: number } | null;
  tags: string[];
  syllabus: string[];
  references: string[];
  department: string;
}

export default function CoursePageClient() {
  // `/course/[code]` has a single dynamic segment, so `code` is always a string.
  const params = useParams<{ code: string }>();
  const code = decodeURIComponent(params.code);

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!code || code === "_placeholder") {
      setLoading(false);
      return;
    }

    fetch("/data/course-map.json")
      .then((res) => res.json())
      .then((data: Record<string, Course>) => {
        const found = data[code];
        if (found) {
          setCourse(found);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [code]);

  if (loading) {
    return (
      <div className={styleClass("componentsCoursePageClientStyle5")}>
        <Loader2 className={styleClass("componentsCoursePageClientStyle6")} />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className={styleClass("appDegreePageStyle1")}>
        <nav className={styleClass("appCourseCodePageStyle6")}>
          <Link href="/" className={styleClass("appCourseCodePageStyle7")}>
            <MoveLeft className={styleClass("appCourseCodePageStyle8")} />
            <span className={styleClass("appCourseCodePageStyle9")}>Back to Search</span>
          </Link>
          <ModeToggle />
        </nav>
        <main className={styleClass("componentsCoursePageClientStyle12")}>
          <div className={styleClass("appNotFoundStyle3")}>
            <div className={styleClass("appNotFoundStyle4")}>
              <FileX2 className={styleClass("appNotFoundStyle5")} />
            </div>
          </div>
          <div>
            <h1 className={styleClass("componentsCoursePageClientStyle16")}>Course Not Found</h1>
            <p className={styleClass("componentsCoursePageClientStyle17")}>
              The course &quot;{code}&quot; could not be found in the database.
            </p>
            <p className={styleClass("componentsApiDocsPageStyle34")}>
              Subject Data Not Properly Published in the Handbook
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styleClass("appCourseCodePageStyle5")}>
      {/* Navigation */}
      <nav className={styleClass("appCourseCodePageStyle6")}>
        <Link href="/" className={styleClass("appCourseCodePageStyle7")}>
          <MoveLeft className={styleClass("appCourseCodePageStyle8")} />
          <span className={styleClass("appCourseCodePageStyle9")}>Back to Search</span>
        </Link>
        <div className={styleClass("appCourseCodePageStyle10")}>
          <ModeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <main className={styleClass("appCourseCodePageStyle11")}>
        {/* Header */}
        <header className={styleClass("appCourseCodePageStyle12")}>
          <div className={styleClass("appCourseCodePageStyle13")}>
            <Badge
              variant="outline"
              xstyle={styles.appCourseCodePageStyle14}
              className="sx-appCourseCodePageStyle14 ui-text-defined"
              title={course.department}
            >
              {course.department}
            </Badge>
            {course.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                xstyle={styles.appCourseCodePageStyle15}
                className="sx-appCourseCodePageStyle15 ui-text-defined"
              >
                {tag}
              </Badge>
            ))}
            {course.sem && (
              <Badge
                variant="outline"
                xstyle={styles.appCourseCodePageStyle16}
                className="sx-appCourseCodePageStyle16 ui-text-defined"
              >
                Sem {course.sem}
              </Badge>
            )}
          </div>

          <h1 className={styleClass("appCourseCodePageStyle17")}>{course.title}</h1>
          <div className={styleClass("appCourseCodePageStyle18")}>
            <span className={styleClass("appCourseCodePageStyle19")}>{course.code}</span>
          </div>
        </header>

        <div className={styleClass("appCourseCodePageStyle20")}>
          {/* Left Column: Details */}
          <div className={styleClass("appCourseCodePageStyle21")}>
            {/* Syllabus */}
            <section>
              <h2 className={styleClass("appCourseCodePageStyle22")}>
                <BookOpen className={styleClass("appCourseCodePageStyle23")} />
                Syllabus
              </h2>
              <Card
                xstyle={styles.appCourseCodePageStyle24}
                className="sx-appCourseCodePageStyle24"
              >
                <CardContent
                  xstyle={styles.appCourseCodePageStyle25}
                  className="sx-appCourseCodePageStyle25"
                >
                  <ul className={styleClass("appCourseCodePageStyle26")}>
                    {course.syllabus?.map((topic, index) => (
                      <li key={index} className={styleClass("appCourseCodePageStyle27")}>
                        <span className={styleClass("appCourseCodePageStyle28")}>
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* References */}
            {course.references && course.references.length > 0 && (
              <section>
                <h2 className={styleClass("appCourseCodePageStyle29")}>References</h2>
                <ul className={styleClass("appCourseCodePageStyle30")}>
                  {course.references.map((ref, i) => (
                    <li key={i} className={styleClass("appCourseCodePageStyle31")}>
                      <span>{ref}</span>
                      <SearchReferenceButton reference={ref} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Column: Credits & Meta */}
          <div className={styleClass("appCourseCodePageStyle32")}>
            {/* Credits Card */}
            <Card xstyle={styles.appCourseCodePageStyle33} className="sx-appCourseCodePageStyle33">
              <CardHeader
                xstyle={styles.appCourseCodePageStyle34}
                className="sx-appCourseCodePageStyle34 ui-border-b"
              >
                <CardTitle
                  xstyle={styles.appCourseCodePageStyle35}
                  className="sx-appCourseCodePageStyle35 ui-text-defined"
                >
                  Credits Structure
                </CardTitle>
              </CardHeader>
              <CardContent
                xstyle={styles.appCourseCodePageStyle36}
                className="sx-appCourseCodePageStyle36"
              >
                <div className={styleClass("appCourseCodePageStyle37")}>
                  <CreditItem label="Lecture" value={course.credits?.l || 0} />
                  <CreditItem label="Tutorial" value={course.credits?.t || 0} />
                  <CreditItem label="Practical" value={course.credits?.p || 0} />
                  <CreditItem label="Total" value={course.credits?.c || 0} isTotal />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function CreditItem({
  label,
  value,
  isTotal,
}: {
  label: string;
  value: number;
  isTotal?: boolean;
}) {
  return (
    <div className={styleClass(isTotal ? "appCourseCodePageStyle1" : "appCourseCodePageStyle2")}>
      <span className={styleClass(isTotal ? "appCourseCodePageStyle3" : "appCourseCodePageStyle4")}>
        {value}
      </span>
      <span className={styleClass("appCourseCodePageStyle38")}>{label}</span>
    </div>
  );
}
