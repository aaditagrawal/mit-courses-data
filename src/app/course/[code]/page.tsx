import { styles } from "@/styles/site.stylex";
import { styleClass } from "@/styles/classes";
import { getCourseByCode } from "@/lib/courses";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchReferenceButton } from "@/components/course-actions";
import { MoveLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ code: string }>;
}

// Force dynamic SSR - no static generation at build time
export const dynamic = "force-dynamic";

// Use Edge runtime for Cloudflare Workers
export const runtime = "edge";

export default async function CoursePage({ params }: Props) {
  const { code } = await params;
  const decodedCode = decodeURIComponent(code);
  const course = getCourseByCode(decodedCode);

  if (!course) {
    notFound();
  }

  return (
    <div className={styleClass("appCourseCodePageStyle5")}>
      {/* Navigation */}
      <nav className={styleClass("appCourseCodePageStyle6")}>
        <Link href="/" className={styleClass("appCourseCodePageStyle7")}>
          <MoveLeft className={styleClass("appCourseCodePageStyle8")} />
          <span className={styleClass("appCourseCodePageStyle9")}>Back to Search</span>
        </Link>
        <div className={styleClass("appCourseCodePageStyle10")}></div>
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
