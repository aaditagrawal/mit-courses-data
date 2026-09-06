import { styles } from "@/styles/site.stylex";
import { styleClass } from "@/styles/classes";
import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveLeft, BookOpen, Clock, Building2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Project Work | MIT Manipal",
  description: "Information about 4292 courses - Major Project Work for B.Tech students",
};

export default function ProjectWorkPage() {
  return (
    <div className={styleClass("appCourseCodePageStyle5")}>
      {/* Navigation */}
      <nav className={styleClass("appCourseCodePageStyle6")}>
        <Link href="/" className={styleClass("appCourseCodePageStyle7")}>
          <MoveLeft className={styleClass("appCourseCodePageStyle8")} />
          <span className={styleClass("appCourseCodePageStyle9")}>Back to Home</span>
        </Link>
        <ModeToggle />
      </nav>

      {/* Main Content */}
      <main className={styleClass("appCourseCodePageStyle11")}>
        {/* Header */}
        <header className={styleClass("appCourseCodePageStyle12")}>
          <div className={styleClass("appMiniProjectsPageStyle8")}>
            <Badge
              variant="outline"
              xstyle={styles.appMiniProjectsPageStyle9}
              className="sx-appMiniProjectsPageStyle9 ui-text-defined"
            >
              Academic Information
            </Badge>
            <Badge
              variant="secondary"
              xstyle={styles.appCourseCodePageStyle16}
              className="sx-appCourseCodePageStyle16 ui-text-defined"
            >
              Major Project
            </Badge>
          </div>

          <h1 className={styleClass("appCourseCodePageStyle17")}>Project Work</h1>
          <div className={styleClass("appCourseCodePageStyle18")}>
            <span className={styleClass("appCourseCodePageStyle19")}>XXX 4292</span>
          </div>
        </header>

        <div className={styleClass("appCourseCodePageStyle20")}>
          {/* Left Column: Main Content */}
          <div className={styleClass("appCourseCodePageStyle21")}>
            {/* Overview */}
            <section>
              <h2 className={styleClass("appCourseCodePageStyle22")}>
                <BookOpen className={styleClass("appCourseCodePageStyle23")} />
                Overview
              </h2>
              <Card
                xstyle={styles.appCourseCodePageStyle24}
                className="sx-appCourseCodePageStyle24"
              >
                <CardContent
                  xstyle={styles.appMiniProjectsPageStyle19}
                  className="sx-appMiniProjectsPageStyle19"
                >
                  <p className={styleClass("appMiniProjectsPageStyle20")}>
                    The Project Work (
                    <span className={styleClass("appMiniProjectsPageStyle21")}>XXX 4292</span>) is a
                    major academic requirement for B.Tech students. It provides an opportunity to
                    apply theoretical knowledge to solve real-world engineering problems.
                  </p>
                  <p className={styleClass("appProjectWorkPageStyle22")}>
                    Note: This course is for students pursuing the regular B.Tech degree (without
                    Honours).
                  </p>
                  <div className={styleClass("appProjectWorkPageStyle23")}>
                    <Building2 className={styleClass("appProjectWorkPageStyle24")} />
                    <span>
                      The project work may be carried out in the institution, industry, research
                      laboratory, or any other competent institutions.
                    </span>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Schedule & Evaluation */}
            <section>
              <h2 className={styleClass("appCourseCodePageStyle22")}>
                <Clock className={styleClass("appCourseCodePageStyle23")} />
                Duration & Evaluation
              </h2>
              <Card
                xstyle={styles.appCourseCodePageStyle24}
                className="sx-appCourseCodePageStyle24"
              >
                <CardContent
                  xstyle={styles.appCourseCodePageStyle25}
                  className="sx-appCourseCodePageStyle25"
                >
                  <ul className={styleClass("appCourseCodePageStyle12")}>
                    <li className={styleClass("appMiniProjectsPageStyle25")}>
                      <span className={styleClass("appCourseCodePageStyle28")}>01</span>
                      <span>
                        <strong className={styleClass("appMiniProjectsPageStyle22")}>
                          Duration:
                        </strong>{" "}
                        Minimum of 16 weeks, extendable up to 24 weeks.
                      </span>
                    </li>
                    <li className={styleClass("appMiniProjectsPageStyle25")}>
                      <span className={styleClass("appCourseCodePageStyle28")}>02</span>
                      <span>
                        <strong className={styleClass("appMiniProjectsPageStyle22")}>
                          Mid-Semester Evaluation:
                        </strong>{" "}
                        Conducted after approximately 8 weeks. An interim project report must be
                        submitted.
                      </span>
                    </li>
                    <li className={styleClass("appMiniProjectsPageStyle25")}>
                      <span className={styleClass("appCourseCodePageStyle28")}>03</span>
                      <span>
                        <strong className={styleClass("appMiniProjectsPageStyle22")}>
                          Final Evaluation:
                        </strong>{" "}
                        Includes submission of the final project report and a viva-voce.
                      </span>
                    </li>
                    <li className={styleClass("appMiniProjectsPageStyle25")}>
                      <span className={styleClass("appCourseCodePageStyle28")}>04</span>
                      <span>
                        <strong className={styleClass("appMiniProjectsPageStyle22")}>
                          Presentation:
                        </strong>{" "}
                        Students must present their work before the department committee as part of
                        the evaluation.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Column: Quick Info */}
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
                xstyle={styles.appMiniProjectsPageStyle58}
                className="sx-appMiniProjectsPageStyle58 ui-text-defined"
              >
                <div className={styleClass("appMiniProjectsPageStyle59")}>12</div>
                <div className={styleClass("appMiniProjectsPageStyle60")}>Total Credits</div>
                <p className={styleClass("appMiniProjectsPageStyle61")}>
                  Major project-based course with no traditional lecture/tutorial/practical split
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
