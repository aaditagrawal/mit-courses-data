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
import btechAero from '../../degree-json/btech-aero.json';
import btechAuto from '../../degree-json/btech-auto.json';
import btechBiomed from '../../degree-json/btech-biomed.json';
import btechBiotech from '../../degree-json/btech-biotech.json';
import btechChem from '../../degree-json/btech-chem.json';
import btechCivil from '../../degree-json/btech-civil.json';
import btechCps from '../../degree-json/btech-cps.json';
import btechCse from '../../degree-json/btech-cse.json';
import btechCsft from '../../degree-json/btech-csft.json';
import btechEceVlsi from '../../degree-json/btech-ece-vlsi.json';
import btechEce from '../../degree-json/btech-ece.json';
import btechEee from '../../degree-json/btech-eee.json';
import btechEie from '../../degree-json/btech-eie.json';
import btechIndust from '../../degree-json/btech-indust.json';
import btechMech from '../../degree-json/btech-mech.json';
import btechMechx from '../../degree-json/btech-mechx.json';
import btechMnc from '../../degree-json/btech-mnc.json';

const degreeMap: Record<string, DegreeData> = {
    'btech-aero': btechAero as unknown as DegreeData,
    'btech-auto': btechAuto as unknown as DegreeData,
    'btech-biomed': btechBiomed as unknown as DegreeData,
    'btech-biotech': btechBiotech as unknown as DegreeData,
    'btech-chem': btechChem as unknown as DegreeData,
    'btech-civil': btechCivil as unknown as DegreeData,
    'btech-cps': btechCps as unknown as DegreeData,
    'btech-cse': btechCse as unknown as DegreeData,
    'btech-csft': btechCsft as unknown as DegreeData,
    'btech-ece-vlsi': btechEceVlsi as unknown as DegreeData,
    'btech-ece': btechEce as unknown as DegreeData,
    'btech-eee': btechEee as unknown as DegreeData,
    'btech-eie': btechEie as unknown as DegreeData,
    'btech-indust': btechIndust as unknown as DegreeData,
    'btech-mech': btechMech as unknown as DegreeData,
    'btech-mechx': btechMechx as unknown as DegreeData,
    'btech-mnc': btechMnc as unknown as DegreeData,
};

export function getDegreeData(slug: string): DegreeData | null {
    return degreeMap[slug] || null;
}

export function getAllDegrees(): string[] {
    return Object.keys(degreeMap);
}

export function getAllDegreeSummaries(): DegreeSummary[] {
    return Object.entries(degreeMap).map(([slug, data]) => ({
        slug,
        title: data.degree_metadata.title,
        department: data.degree_metadata.department
    })).sort((a, b) => a.title.localeCompare(b.title));
}

