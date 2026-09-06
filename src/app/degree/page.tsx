import { styleClass } from "@/styles/classes";
import { getAllDegreeSummaries } from "@/lib/degrees";
import Link from "next/link";
import { GraduationCap, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Degrees | MIT Manipal",
  description: "Explore degree structures and course tracks",
};

export default function DegreesIndexPage() {
  const degrees = getAllDegreeSummaries();

  return (
    <div className={styleClass("appDegreePageStyle1")}>
      <div className={styleClass("appDegreePageStyle2")}>
        <header className={styleClass("appDegreePageStyle3")}>
          <Link href="/" className={styleClass("appDegreePageStyle4")}>
            ← Back to Home
          </Link>
          <div className={styleClass("appCourseCodePageStyle12")}>
            <div className={styleClass("appDegreePageStyle6")}>
              <GraduationCap className={styleClass("appDegreePageStyle7")} />
            </div>
            <h1 className={styleClass("appDegreePageStyle8")}>Degree Programs</h1>
          </div>
        </header>

        <div className={styleClass("appDegreePageStyle9")}>
          {degrees.map((degree) => (
            <Link
              key={degree.slug}
              href={`/degree/${degree.slug}`}
              className={styleClass("appDegreePageStyle10")}
            >
              <div className={styleClass("appDegreePageStyle11")}>
                <div className={styleClass("appDegreePageStyle12")}>
                  <h2 className={styleClass("appDegreePageStyle13")}>{degree.title}</h2>
                  <p className={styleClass("appDegreePageStyle14")}>{degree.department}</p>
                </div>

                <div className={styleClass("appDegreePageStyle15")}>
                  <span className={styleClass("appDegreePageStyle16")}>View Structure</span>
                  <ChevronRight className={styleClass("appDegreePageStyle17")} />
                </div>
              </div>
            </Link>
          ))}

          {degrees.length === 0 && (
            <div className={styleClass("appDegreePageStyle18")}>
              <p>No degree data found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
