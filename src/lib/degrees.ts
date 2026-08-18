// Edge-compatible degree data loader
// Imports JSON directly instead of using fs module

export interface DegreeMetadata {
  title: string;
  department: string;
  handbook_version: string;
  total_credits_required: number;
}

export interface ElectiveSlot {
  slot_id: string;
  label: string;
  pool_ref?: string;
  course_code?: string;
  courses?: string[];
}

export interface Semester {
  sem_index: number;
  year: string;
  total_contact_hours: number | string | null;
  total_credits: number | string;
  core_courses: string[];
  elective_slots: ElectiveSlot[];
}

export interface ElectivePoolTrack {
  track_name: string;
  courses: string[];
}

export type ElectivePool = string[] | ElectivePoolTrack[] | Record<string, string[]>;

/**
 * Tells a track object apart from a bare course code inside a pool array.
 *
 * The degree JSON stores an elective pool either as course codes or as named
 * tracks, and the two never mix within one pool.
 */
export function isElectivePoolTrack(entry: string | ElectivePoolTrack): entry is ElectivePoolTrack {
  // SAFETY: `entry` is a course code or a track object. Reading `courses` off a
  // string primitive yields undefined instead of throwing, so this probe is
  // total and only a track answers with an array.
  return Array.isArray((entry as Partial<ElectivePoolTrack>).courses);
}

/** Every course code an elective pool contributes, flattened across its three shapes. */
export function electivePoolCourseCodes(pool: ElectivePool): string[] {
  if (!Array.isArray(pool)) return Object.values(pool).flat();

  const codes: string[] = [];
  for (const entry of pool) {
    if (isElectivePoolTrack(entry)) codes.push(...entry.courses);
    else codes.push(entry);
  }
  return codes;
}

export interface DegreeStructure {
  semesters: Semester[];
  elective_pools: Record<string, ElectivePool>;
}

export interface DegreeData {
  degree_metadata: DegreeMetadata;
  structure: DegreeStructure;
  footnotes: { symbol: string; text: string }[];
}

export interface DegreeSummary {
  slug: string;
  title: string;
  department: string;
}

// Static imports for Edge compatibility
import btechAero from "../../degree-json/btech-aero.json";
import btechAuto from "../../degree-json/btech-auto.json";
import btechBiomed from "../../degree-json/btech-biomed.json";
import btechBiotech from "../../degree-json/btech-biotech.json";
import btechChem from "../../degree-json/btech-chem.json";
import btechCivil from "../../degree-json/btech-civil.json";
import btechCps from "../../degree-json/btech-cps.json";
import btechCse from "../../degree-json/btech-cse.json";
import btechCsft from "../../degree-json/btech-csft.json";
import btechEceVlsi from "../../degree-json/btech-ece-vlsi.json";
import btechEce from "../../degree-json/btech-ece.json";
import btechEee from "../../degree-json/btech-eee.json";
import btechEie from "../../degree-json/btech-eie.json";
import btechIndust from "../../degree-json/btech-indust.json";
import btechMech from "../../degree-json/btech-mech.json";
import btechMechx from "../../degree-json/btech-mechx.json";
import btechMnc from "../../degree-json/btech-mnc.json";

// Slug -> degree, keyed by a Map so lookups by an arbitrary request slug stay a
// plain string key without needing an open `Record<string, ...>` annotation.
const degreeMap = new Map<string, DegreeData>([
  ["btech-aero", btechAero],
  ["btech-auto", btechAuto],
  ["btech-biomed", btechBiomed],
  ["btech-biotech", btechBiotech],
  ["btech-chem", btechChem],
  ["btech-civil", btechCivil],
  ["btech-cps", btechCps],
  ["btech-cse", btechCse],
  ["btech-csft", btechCsft],
  ["btech-ece-vlsi", btechEceVlsi],
  ["btech-ece", btechEce],
  ["btech-eee", btechEee],
  ["btech-eie", btechEie],
  ["btech-indust", btechIndust],
  ["btech-mech", btechMech],
  ["btech-mechx", btechMechx],
  ["btech-mnc", btechMnc],
]);

export function getDegreeData(slug: string): DegreeData | null {
  return degreeMap.get(slug) ?? null;
}

export function getAllDegrees(): string[] {
  return [...degreeMap.keys()];
}

export function getAllDegreeSummaries(): DegreeSummary[] {
  return [...degreeMap]
    .map(([slug, data]) => ({
      slug,
      title: data.degree_metadata.title,
      department: data.degree_metadata.department,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}
