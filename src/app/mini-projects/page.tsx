import { styles } from "@/styles/site.stylex";
import { styleClass } from "@/styles/classes";
import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveLeft, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Mini Projects for Minor Specialisation | MIT Manipal",
  description:
    "Information about 4191 courses - 8 credit mini projects for students pursuing a minor specialisation",
};

export default function MiniProjectsPage() {
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
              Minor Specialisation
            </Badge>
          </div>

          <h1 className={styleClass("appCourseCodePageStyle17")}>
            Mini Projects for Minor Specialisation
          </h1>
          <div className={styleClass("appCourseCodePageStyle18")}>
            <span className={styleClass("appCourseCodePageStyle19")}>XXX 4191</span>
          </div>
        </header>

        <div className={styleClass("appCourseCodePageStyle20")}>
          {/* Left Column: Main Content */}
          <div className={styleClass("appCourseCodePageStyle21")}>
            {/* Overview */}
            <section>
              <h2 className={styleClass("appCourseCodePageStyle22")}>
                <BookOpen className={styleClass("appCourseCodePageStyle23")} />
                What are 4191 Courses?
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
                    Courses with the code{" "}
                    <span className={styleClass("appMiniProjectsPageStyle21")}>XXX 4191</span> are{" "}
                    <strong className={styleClass("appMiniProjectsPageStyle22")}>
                      Mini Projects for Minor Specialisation
                    </strong>
                    . These are specialized project-based courses designed for students pursuing a
                    minor in a specific discipline.
                  </p>
                  <p className={styleClass("appMiniProjectsPageStyle20")}>
                    The "XXX" prefix varies based on the department offering the minor. For example:
                  </p>
                  <ul className={styleClass("appMiniProjectsPageStyle24")}>
                    <li className={styleClass("appMiniProjectsPageStyle25")}>
                      <span className={styleClass("appMiniProjectsPageStyle26")}>•</span>
                      <span>
                        <span className={styleClass("appMiniProjectsPageStyle21")}>AAE 4191</span> -
                        Aerospace Engineering Mini Project
                      </span>
                    </li>
                    <li className={styleClass("appMiniProjectsPageStyle25")}>
                      <span className={styleClass("appMiniProjectsPageStyle26")}>•</span>
                      <span>
                        <span className={styleClass("appMiniProjectsPageStyle21")}>BIO 4191</span> -
                        Biotechnology Mini Project
                      </span>
                    </li>
                    <li className={styleClass("appMiniProjectsPageStyle25")}>
                      <span className={styleClass("appMiniProjectsPageStyle26")}>•</span>
                      <span>
                        <span className={styleClass("appMiniProjectsPageStyle21")}>CIE 4191</span> -
                        Civil Engineering Mini Project
                      </span>
                    </li>
                    <li className={styleClass("appMiniProjectsPageStyle25")}>
                      <span className={styleClass("appMiniProjectsPageStyle26")}>•</span>
                      <span className={styleClass("appMiniProjectsPageStyle36")}>
                        and similarly for other departments...
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Key Features */}
            <section>
              <h2 className={styleClass("appCourseCodePageStyle22")}>
                <GraduationCap className={styleClass("appCourseCodePageStyle23")} />
                Key Features
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
                    <li className={styleClass("appCourseCodePageStyle27")}>
                      <span className={styleClass("appCourseCodePageStyle28")}>01</span>
                      <span>
                        <strong className={styleClass("appMiniProjectsPageStyle22")}>
                          8 Credits:
                        </strong>{" "}
                        These courses carry 8 credits, reflecting the substantial project work
                        involved.
                      </span>
                    </li>
                    <li className={styleClass("appCourseCodePageStyle27")}>
                      <span className={styleClass("appCourseCodePageStyle28")}>02</span>
                      <span>
                        <strong className={styleClass("appMiniProjectsPageStyle22")}>
                          Project-Based Learning:
                        </strong>{" "}
                        Focus on hands-on, practical application of knowledge in the minor
                        discipline.
                      </span>
                    </li>
                    <li className={styleClass("appCourseCodePageStyle27")}>
                      <span className={styleClass("appCourseCodePageStyle28")}>03</span>
                      <span>
                        <strong className={styleClass("appMiniProjectsPageStyle22")}>
                          Minor Requirements:
                        </strong>{" "}
                        These courses are specifically for students who have declared and are
                        completing a minor specialisation.
                      </span>
                    </li>
                    <li className={styleClass("appCourseCodePageStyle27")}>
                      <span className={styleClass("appCourseCodePageStyle28")}>04</span>
                      <span>
                        <strong className={styleClass("appMiniProjectsPageStyle22")}>
                          Department-Specific:
                        </strong>{" "}
                        The project work is supervised by faculty from the respective department and
                        aligns with that discipline's focus areas.
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
                  Credit Structure
                </CardTitle>
              </CardHeader>
              <CardContent
                xstyle={styles.appMiniProjectsPageStyle58}
                className="sx-appMiniProjectsPageStyle58 ui-text-defined"
              >
                <div className={styleClass("appMiniProjectsPageStyle59")}>8</div>
                <div className={styleClass("appMiniProjectsPageStyle60")}>Total Credits</div>
                <p className={styleClass("appMiniProjectsPageStyle61")}>
                  Project-based course with no traditional lecture/tutorial/practical split
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
