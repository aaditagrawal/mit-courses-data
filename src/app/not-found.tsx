"use client";

import { styleClass } from "@/styles/classes";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileX2, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const pathname = usePathname();
  const isCoursePath = pathname?.startsWith("/course/");

  return (
    <div className={styleClass("appNotFoundStyle1")}>
      <div className={styleClass("appNotFoundStyle2")}>
        <div className={styleClass("appNotFoundStyle3")}>
          <div className={styleClass("appNotFoundStyle4")}>
            <FileX2 className={styleClass("appNotFoundStyle5")} />
          </div>
        </div>

        <div className={styleClass("appCourseCodePageStyle26")}>
          <h1 className={styleClass("appNotFoundStyle7")}>
            {isCoursePath
              ? "Subject Data Not Properly Published in the Handbook"
              : "Page Not Found"}
          </h1>
          <p className={styleClass("appMiniProjectsPageStyle20")}>
            {isCoursePath
              ? "The course you're looking for hasn't been published yet or the data may be incomplete. Please check back later or search for another course."
              : "The page you are looking for doesn't exist or has been moved."}
          </p>
        </div>

        <div className={styleClass("appNotFoundStyle9")}>
          <Button asChild variant="default">
            <Link href="/" className={styleClass("appDegreeSlugPageStyle73")}>
              <Home className={styleClass("appNotFoundStyle11")} />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/explore" className={styleClass("appDegreeSlugPageStyle73")}>
              <Search className={styleClass("appNotFoundStyle11")} />
              Explore Courses
            </Link>
          </Button>
        </div>

        {isCoursePath && (
          <div className={styleClass("appNotFoundStyle14")}>
            <p className={styleClass("appNotFoundStyle15")}>
              If you think this is a mistake, kindly reach out
            </p>
            <a
              href="mailto:aadit.mitmpl2023@learner.manipal.edu?subject=COURSE%20WEBSITE%20BUG%20REPORT&body=Hey!%0A%0AFound%20the%20following%20issues%20in%20the%20site%20data%3A%0A%0ACourse%20Code%3A%0AIssue%20found%3A"
              className={styleClass("appNotFoundStyle16")}
            >
              Report Discrepancies (via Email)
            </a>
          </div>
        )}

        <p className={styleClass("appNotFoundStyle17")}>
          Error 404 • {isCoursePath ? "Course not found" : "Null route"}
        </p>
      </div>
    </div>
  );
}
