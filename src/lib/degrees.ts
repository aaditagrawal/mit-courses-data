import fs from 'fs';
import path from 'path';

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


const DEGREE_DIR = path.join(process.cwd(), 'degree-json');

export function getDegreeData(slug: string): DegreeData | null {
    try {
        const filePath = path.join(DEGREE_DIR, `${slug}.json`);
        // Security check to prevent directory traversal
        if (!filePath.startsWith(DEGREE_DIR)) return null;

        if (!fs.existsSync(filePath)) return null;

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent) as DegreeData;
    } catch (error) {
        console.error(`Error loading degree ${slug}:`, error);
        return null;
    }
}

export function getAllDegrees(): string[] {
    try {
        if (!fs.existsSync(DEGREE_DIR)) return [];
        return fs.readdirSync(DEGREE_DIR)
            .filter(file => file.endsWith('.json'))
            .map(file => file.replace('.json', ''));
    } catch (error) {
        console.error('Error listing degrees:', error);
        return [];
    }
}

export function getAllDegreeSummaries(): DegreeSummary[] {
    const slugs = getAllDegrees();
    return slugs.map(slug => {
        const data = getDegreeData(slug);
        return {
            slug,
            title: data?.degree_metadata.title || slug.replace('btech-', 'B.Tech '),
            department: data?.degree_metadata.department || 'Unknown Department'
        };
    }).sort((a, b) => a.title.localeCompare(b.title));
}

