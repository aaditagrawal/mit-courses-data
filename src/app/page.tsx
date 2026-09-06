import { styleClass } from "@/styles/classes";
import Link from "next/link";
import { CommandMenuTrigger } from "@/components/CommandMenu";

export default function Home() {
  return (
    <main className={styleClass("appPageStyle1")}>
      <div className={styleClass("appPageStyle2")}>
        <div className={styleClass("appCourseCodePageStyle12")}>
          <h1 className={styleClass("appPageStyle4")}>Course Web</h1>
          <p className={styleClass("appPageStyle5")}>MIT Manipal Academic Year 2025-2026</p>
        </div>

        <div className={styleClass("appPageStyle6")}>
          <CommandMenuTrigger />
          <p className={styleClass("appPageStyle7")}>
            Press <kbd className={styleClass("appPageStyle8")}>Ctrl</kbd> +{" "}
            <kbd className={styleClass("appPageStyle8")}>K</kbd> to search
          </p>
        </div>

        {/* Explore Graph Link */}
        <div className={styleClass("appPageStyle10")}>
          {/* Explore Graph Link */}
          <Link href="/explore" className={styleClass("appPageStyle11")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styleClass("appPageStyle12")}
            >
              <circle cx="12" cy="12" r="2" />
              <circle cx="6" cy="6" r="2" />
              <circle cx="18" cy="6" r="2" />
              <circle cx="6" cy="18" r="2" />
              <circle cx="18" cy="18" r="2" />
              <path d="M12 10V8M12 14v2M10 12H8M14 12h2M7.5 7.5 10 10M14 14l2.5 2.5M7.5 16.5 10 14M14 10l2.5-2.5" />
            </svg>
            <span>Explore Graph</span>
            <span className={styleClass("appPageStyle13")}>→</span>
          </Link>

          {/* Degree Structure Link */}
          <Link href="/degree" className={styleClass("appPageStyle11")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styleClass("appPageStyle12")}
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            <span>Degree Plans</span>
            <span className={styleClass("appPageStyle13")}>→</span>
          </Link>

          <Link href="/api-docs" className={styleClass("appPageStyle11")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styleClass("appPageStyle12")}
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span>Agent API</span>
            <span className={styleClass("appPageStyle13")}>→</span>
          </Link>
        </div>

        <div className={styleClass("appPageStyle20")}>
          <div className={styleClass("appPageStyle21")}>
            <div className={styleClass("appPageStyle22")}>
              <p className={styleClass("appPageStyle23")}>
                Data has been extracted from curriculum published by Manipal Institute of
                Technology, Manipal.
              </p>
              <a
                href="mailto:aadit.mitmpl2023@learner.manipal.edu?subject=COURSE%20WEBSITE%20BUG%20REPORT&body=Hey!%0A%0AFound%20the%20following%20issues%20in%20the%20site%20data%3A%0A%0ACourse%20Code%3A%0AIssue%20found%3A"
                className={styleClass("appPageStyle24")}
              >
                Report Discrepancies (via Email)
              </a>
            </div>
            <p className={styleClass("appPageStyle25")}>
              Made by{" "}
              <a
                href="https://aadit.cc"
                target="_blank"
                rel="noopener noreferrer"
                className={styleClass("appPageStyle26")}
              >
                Aadit
              </a>
              <span className={styleClass("appPageStyle27")}>/</span>
              <a
                href="https://github.com/aaditagrawal/mit-courses-data"
                target="_blank"
                rel="noopener noreferrer"
                className={styleClass("appPageStyle26")}
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
