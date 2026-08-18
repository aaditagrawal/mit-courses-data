/**
 * Lecture / tutorial / practical / total credit hours.
 *
 * Every member is nullable: 27 of the 1339 courses that carry a credits block
 * have all four values set to null in the source JSON.
 */
export interface CreditStructure {
  l: number | null;
  t: number | null;
  p: number | null;
  c: number | null;
}

/**
 * A course exactly as it appears in `branch-json/*.json`.
 *
 * The optional and nullable members are not defensive padding: `scripts/check-data.ts`
 * reports them, and across the 18 branch files 50 courses omit `sem`, 126 have a null
 * `credits`, and a handful have a null `tags`/`flags` or omit `syllabus`/`references`.
 * Callers must handle those cases rather than assume the field is populated.
 */
export interface Course {
  sem?: number | null;
  code: string;
  title: string;
  credits?: CreditStructure | null;
  tags: string[] | null;
  syllabus?: string[];
  references?: string[];
  flags: string[] | null;
}

export interface Department {
  name: string;
  courses: Course[];
}
