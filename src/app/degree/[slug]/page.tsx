import { styleClass } from "@/styles/classes";
import {
  getDegreeData,
  getAllDegrees,
  isElectivePoolTrack,
  ElectivePool,
  ElectivePoolTrack,
  ElectiveSlot,
  Semester,
} from "@/lib/degrees";
import { getCourseMap, SearchResult } from "@/lib/courses";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseLink } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";

// Next.js 15+ Page Props Interface
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all known degrees
export async function generateStaticParams() {
  const degrees = getAllDegrees();
  return degrees.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = getDegreeData(slug);
  if (!data) return { title: "Degree Not Found" };
  return {
    title: `${data.degree_metadata.title} | Structure`,
    description: `Course structure for ${data.degree_metadata.title}`,
  };
}

export default async function DegreePage({ params }: PageProps) {
  const { slug } = await params;
  const data = getDegreeData(slug);

  if (!data) {
    notFound();
  }

  // Shared code -> course index; course codes are already normalised by the loader
  const courseMap = getCourseMap();

  const { degree_metadata, structure, footnotes } = data;

  return (
    <div className={styleClass("appCourseCodePageStyle5")}>
      {/* Header */}
      <header className={styleClass("appDegreeSlugPageStyle2")}>
        <div className={styleClass("appDegreeSlugPageStyle3")}>
          <Link href="/degree" className={styleClass("appDegreeSlugPageStyle4")}>
            <span className={styleClass("appDegreeSlugPageStyle5")}>← Degrees</span>
          </Link>
          <div className={styleClass("appDegreeSlugPageStyle6")}>
            <h1 className={styleClass("appDegreeSlugPageStyle7")}>{degree_metadata.title}</h1>
            <div className={styleClass("appDegreeSlugPageStyle8")}>
              v{degree_metadata.handbook_version} • {degree_metadata.total_credits_required} Credits
            </div>
          </div>
        </div>
      </header>

      <main className={styleClass("appDegreeSlugPageStyle9")}>
        <div className={styleClass("appDegreeSlugPageStyle10")}>
          {/* Header Block */}
          <div className={styleClass("appDegreeSlugPageStyle11")}>
            <h1 className={styleClass("appDegreeSlugPageStyle12")}>{degree_metadata.title}</h1>
            <div className={styleClass("appDegreeSlugPageStyle13")}>
              <p className={styleClass("appDegreeSlugPageStyle14")}>{degree_metadata.department}</p>
              <div className={styleClass("appDegreeSlugPageStyle15")}></div>
              <div className={styleClass("appDegreeSlugPageStyle16")}>
                Total Credits: {degree_metadata.total_credits_required}
              </div>
            </div>
          </div>

          {/* Semesters Grid */}
          <div className={styleClass("appDegreeSlugPageStyle17")}>
            {structure.semesters.map((sem) => (
              <SemesterBlock
                key={sem.sem_index}
                semester={sem}
                courseMap={courseMap}
                pools={structure.elective_pools}
              />
            ))}
          </div>

          {/* Footnotes */}
          {footnotes && footnotes.length > 0 && (
            <div className={styleClass("appDegreeSlugPageStyle18")}>
              <h3 className={styleClass("appDegreeSlugPageStyle19")}>Notes</h3>
              <ul className={styleClass("appCourseCodePageStyle26")}>
                {footnotes.map((note, idx) => (
                  <li key={idx} className={styleClass("appDegreeSlugPageStyle21")}>
                    <span className={styleClass("appDegreeSlugPageStyle22")}>{note.symbol}</span>
                    <span>{note.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Helper functions for consistent display of course data
function getCourseTitle(code: string, courseMap: ReadonlyMap<string, SearchResult>): string {
  const cleanCode = code.trim();
  const course = courseMap.get(cleanCode);
  if (course) return course.title;

  if (cleanCode.endsWith("4191")) return "Mini Project for Minor Specialisation";
  if (cleanCode.endsWith("4293")) return "Project Work / Practice School (Honours)";
  if (cleanCode.endsWith("4292")) return "Project Work";

  return "Course data not found";
}

function getCourseCredits(
  code: string,
  courseMap: ReadonlyMap<string, SearchResult>,
): string | number {
  const cleanCode = code.trim();
  const course = courseMap.get(cleanCode);
  if (course) return course.credits?.c ?? "-";

  if (cleanCode.endsWith("4191")) return 8;
  if (cleanCode.endsWith("4293") || cleanCode.endsWith("4292")) return 12;

  return "-";
}

function SemesterBlock({
  semester,
  courseMap,
  pools,
}: {
  semester: Semester;
  courseMap: ReadonlyMap<string, SearchResult>;
  pools: Record<string, ElectivePool>;
}) {
  return (
    <div className={styleClass("appDegreeSlugPageStyle23")}>
      {/* Header */}
      <div className={styleClass("appDegreeSlugPageStyle24")}>
        <h2 className={styleClass("appDegreeSlugPageStyle25")}>Semester {semester.sem_index}</h2>
        <div className={styleClass("appDegreeSlugPageStyle26")}>
          {semester.total_credits} Credits • {semester.total_contact_hours} Hours
        </div>
      </div>

      <div className={styleClass("appDegreeSlugPageStyle27")}>
        {/* Core Courses Table */}
        <div>
          <div className={styleClass("appDegreeSlugPageStyle28")}>
            <table className={styleClass("appDegreeSlugPageStyle29")}>
              <thead className={styleClass("appDegreeSlugPageStyle30")}>
                <tr>
                  <th className={styleClass("appDegreeSlugPageStyle31")}>Code</th>
                  <th className={styleClass("appDegreeSlugPageStyle32")}>Subject Name</th>
                  <th className={styleClass("appDegreeSlugPageStyle33")}>L</th>
                  <th className={styleClass("appDegreeSlugPageStyle33")}>T</th>
                  <th className={styleClass("appDegreeSlugPageStyle33")}>P</th>
                  <th className={styleClass("appDegreeSlugPageStyle36")}>C</th>
                </tr>
              </thead>
              <tbody className={styleClass("appDegreeSlugPageStyle37")}>
                {semester.core_courses.map((code, idx) => (
                  <CourseRow key={`${code}-${idx}`} code={code} courseMap={courseMap} />
                ))}
                {semester.core_courses.length === 0 && (
                  <tr>
                    <td colSpan={6} className={styleClass("appDegreeSlugPageStyle38")}>
                      No core courses this semester
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Electives */}
        {semester.elective_slots.length > 0 && (
          <div className={styleClass("appCourseCodePageStyle12")}>
            <h3 className={styleClass("appDegreeSlugPageStyle40")}>Electives & Tracks</h3>
            <div className={styleClass("appDegreeSlugPageStyle41")}>
              {semester.elective_slots.map((slot) => (
                <ElectiveItem key={slot.slot_id} slot={slot} pools={pools} courseMap={courseMap} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CourseRow({
  code,
  courseMap,
}: {
  code: string;
  courseMap: ReadonlyMap<string, SearchResult>;
}) {
  const course = courseMap.get(code.trim());
  const isMissing = !course;
  const cleanCode = code.trim();
  const is4191 = cleanCode.endsWith("4191");
  const is4293 = cleanCode.endsWith("4293");
  const is4292 = cleanCode.endsWith("4292");

  // For missing special courses, redirect to their info pages
  if (isMissing && (is4191 || is4293 || is4292)) {
    const link = getCourseLink(code);
    const title = getCourseTitle(code, courseMap);
    const credits = getCourseCredits(code, courseMap);

    return (
      <tr className={styleClass("appDegreeSlugPageStyle42")}>
        <td className={styleClass("appDegreeSlugPageStyle43")}>
          <Link href={link} className={styleClass("appDegreeSlugPageStyle44")}>
            {code}
          </Link>
        </td>
        <td className={styleClass("appDegreeSlugPageStyle45")}>
          <Link href={link} className={styleClass("appDegreeSlugPageStyle46")}>
            {title}
          </Link>
        </td>
        <td className={styleClass("appDegreeSlugPageStyle47")}>-</td>
        <td className={styleClass("appDegreeSlugPageStyle47")}>-</td>
        <td className={styleClass("appDegreeSlugPageStyle47")}>-</td>
        <td className={styleClass("appDegreeSlugPageStyle50")}>{credits}</td>
      </tr>
    );
  }

  if (isMissing) {
    const link = getCourseLink(code);
    return (
      <tr className={styleClass("appDegreeSlugPageStyle42")}>
        <td className={styleClass("appDegreeSlugPageStyle43")}>
          <Link href={link} className={styleClass("appDegreeSlugPageStyle44")}>
            {code}
          </Link>
        </td>
        <td className={styleClass("appDegreeSlugPageStyle54")}>
          <Link href={link} className={styleClass("appDegreeSlugPageStyle46")}>
            Course data not found
          </Link>
        </td>
        <td className={styleClass("appDegreeSlugPageStyle56")}>-</td>
        <td className={styleClass("appDegreeSlugPageStyle56")}>-</td>
        <td className={styleClass("appDegreeSlugPageStyle56")}>-</td>
        <td className={styleClass("appDegreeSlugPageStyle59")}>-</td>
      </tr>
    );
  }

  // For 4191 courses, link to mini-projects page
  const courseLink = is4191 ? "/mini-projects" : `/course/${code}`;

  return (
    <tr className={styleClass("appDegreeSlugPageStyle42")}>
      <td className={styleClass("appDegreeSlugPageStyle43")}>
        <Link href={courseLink} className={styleClass("appDegreeSlugPageStyle44")}>
          {code}
        </Link>
      </td>
      <td className={styleClass("appDegreeSlugPageStyle45")}>
        <Link href={courseLink} className={styleClass("appDegreeSlugPageStyle46")}>
          {course.title}
        </Link>
      </td>
      <td className={styleClass("appDegreeSlugPageStyle47")}>{course.credits?.l ?? "-"}</td>
      <td className={styleClass("appDegreeSlugPageStyle47")}>{course.credits?.t ?? "-"}</td>
      <td className={styleClass("appDegreeSlugPageStyle47")}>{course.credits?.p ?? "-"}</td>
      <td className={styleClass("appDegreeSlugPageStyle50")}>{course.credits?.c ?? "-"}</td>
    </tr>
  );
}

function ElectiveItem({
  slot,
  pools,
  courseMap,
}: {
  slot: ElectiveSlot;
  pools: Record<string, ElectivePool>;
  courseMap: ReadonlyMap<string, SearchResult>;
}) {
  let poolData: ElectivePool | null = slot.pool_ref ? (pools[slot.pool_ref] ?? null) : null;

  // Use direct courses if pool_ref is missing or pool doesn't exist
  if (!poolData) {
    if (slot.courses) {
      poolData = slot.courses;
    } else if (slot.course_code) {
      poolData = [slot.course_code];
    }
  }

  let displayMode: "simple" | "tracks" | "none" = "none";
  let simpleCourses: string[] = [];
  let tracks: ElectivePoolTrack[] = [];

  if (poolData !== null && Array.isArray(poolData)) {
    // Case 1 and 2: a pool array holds either plain course codes or track objects.
    const poolTracks: ElectivePoolTrack[] = [];
    const poolCourses: string[] = [];
    for (const entry of poolData) {
      if (isElectivePoolTrack(entry)) poolTracks.push(entry);
      else poolCourses.push(entry);
    }

    if (poolTracks.length > 0) {
      displayMode = "tracks";
      tracks = poolTracks;
    } else {
      displayMode = "simple";
      simpleCourses = poolCourses;
    }
  } else if (poolData !== null) {
    // Case 3: dictionary of tracks (e.g. Civil Engineering), normalised to an array.
    displayMode = "tracks";
    tracks = Object.entries(poolData).map(([key, value]) => ({
      track_name: key.replace(/_/g, " "),
      courses: value,
    }));
  }

  if (!poolData) {
    return (
      <div className={styleClass("appDegreeSlugPageStyle69")}>
        Pool definition '{slot.pool_ref}' missing.
      </div>
    );
  }

  return (
    <Collapsible.Root className={styleClass("appDegreeSlugPageStyle70")}>
      <Collapsible.Trigger className={styleClass("appDegreeSlugPageStyle71")}>
        <div className={styleClass("appDegreeSlugPageStyle72")}>
          <div className={styleClass("appDegreeSlugPageStyle73")}>
            <span className={styleClass("appDegreeSlugPageStyle74")}>{slot.label}</span>
          </div>
          {displayMode === "tracks" && (
            <span className={styleClass("appDegreeSlugPageStyle75")}>
              Contains {tracks.length} specialization tracks
            </span>
          )}
          {displayMode === "simple" && simpleCourses.length > 0 && (
            <span className={styleClass("appDegreeSlugPageStyle75")}>
              {simpleCourses.length} course options available
            </span>
          )}
        </div>
        <div className={styleClass("appDegreeSlugPageStyle77")}>
          <ChevronDown className={styleClass("appDegreeSlugPageStyle78")} />
        </div>
      </Collapsible.Trigger>

      <Collapsible.Content className={styleClass("appDegreeSlugPageStyle79")}>
        <div className={styleClass("appDegreeSlugPageStyle80")}>
          {/* Simple List */}
          {displayMode === "simple" &&
            simpleCourses.map((c, idx) => (
              <div key={`${c}-${idx}`} className={styleClass("appDegreeSlugPageStyle81")}>
                <div className={styleClass("appDegreeSlugPageStyle82")}>
                  <span className={styleClass("appDegreeSlugPageStyle83")}>{c}</span>
                  <Link href={getCourseLink(c)} className={styleClass("appDegreeSlugPageStyle84")}>
                    {getCourseTitle(c, courseMap)}
                  </Link>
                </div>
                <div className={styleClass("appDegreeSlugPageStyle26")}>
                  {getCourseCredits(c, courseMap)}C
                </div>
              </div>
            ))}

          {/* Tracks Grid */}
          {displayMode === "tracks" && (
            <div className={styleClass("appDegreeSlugPageStyle86")}>
              {tracks.map((track, idx) => (
                <div key={idx} className={styleClass("appCourseCodePageStyle26")}>
                  <h4 className={styleClass("appDegreeSlugPageStyle88")}>{track.track_name}</h4>
                  <div className={styleClass("appDegreeSlugPageStyle89")}>
                    {track.courses.map((c, i) => (
                      <div key={`${c}-${i}`} className={styleClass("appDegreeSlugPageStyle90")}>
                        <div className={styleClass("appDegreeSlugPageStyle82")}>
                          <span className={styleClass("appDegreeSlugPageStyle83")}>{c}</span>
                          <Link
                            href={getCourseLink(c)}
                            className={styleClass("appDegreeSlugPageStyle84")}
                          >
                            {getCourseTitle(c, courseMap)}
                          </Link>
                        </div>
                        <div className={styleClass("appDegreeSlugPageStyle26")}>
                          {getCourseCredits(c, courseMap)}C
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
