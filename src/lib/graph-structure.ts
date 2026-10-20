// Shared graph topology for the explore visualization.
//
// Both the build-time layout script (scripts/generate-graph-layout.ts) and the
// client renderer (NetworkGraph) build the graph through this module, so the
// precomputed positions always describe the same node set the client draws.

import { CourseSummary } from "./courses";

export interface DegreeGraphInfo {
  slug: string;
  title: string;
  courses: string[]; // Course codes in this degree
}

export type GraphNodeKind = "course" | "prefix-hub" | "degree-hub";

export interface GraphNodeSpec {
  id: string;
  label: string;
  kind: GraphNodeKind;
  /** Department the node is coloured by (course + prefix-hub nodes). */
  department?: string;
  /** Degree slug the node is coloured by (degree-hub nodes). */
  degreeSlug?: string;
  size: number;
  /** Set on course nodes; clicking navigates to this course. */
  courseCode?: string;
  /** Hover tooltip lines. */
  tooltip: string[];
}

export interface GraphEdgeSpec {
  source: string;
  target: string;
  /** Colour key: department name for prefix edges, degree slug for degree edges. */
  department?: string;
  degreeSlug?: string;
}

export interface GraphStructure {
  nodes: GraphNodeSpec[];
  edges: GraphEdgeSpec[];
  /** Departments in first-appearance order, for stable palette assignment. */
  departments: string[];
  /** Degree slugs in render order, for stable palette assignment. */
  degreeSlugs: string[];
}

/**
 * Stable per-node jitter in [0, 1), from an FNV-1a hash of the node id. Used
 * for size variation and deterministic fallback positions, so the graph
 * renders identically on every load.
 */
export function stableUnit(key: string): number {
  let hash = 2166136261;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 1024) / 1024;
}

export function courseNodeId(code: string): string {
  return `c:${code}`;
}

export function buildGraphStructure(
  courses: CourseSummary[],
  degrees: DegreeGraphInfo[],
): GraphStructure {
  const nodes: GraphNodeSpec[] = [];
  const edges: GraphEdgeSpec[] = [];

  const departments: string[] = [];
  const seenDepartments = new Set<string>();

  for (const course of courses) {
    const department = course.department || "Unknown";
    if (!seenDepartments.has(department)) {
      seenDepartments.add(department);
      departments.push(department);
    }

    nodes.push({
      id: courseNodeId(course.code),
      label: course.code,
      kind: "course",
      department,
      size: 4 + stableUnit(course.code) * 3,
      courseCode: course.code,
      tooltip: [course.title, department],
    });
  }

  // Group courses by code prefix (e.g. "ECE" from "ECE 1234") and give each
  // prefix a hub node so departments cluster together.
  const prefixGroups = new Map<string, { codes: string[]; department: string }>();
  for (const course of courses) {
    const prefix = course.code.split(/\s+/)[0];
    const group = prefixGroups.get(prefix);
    if (group) {
      group.codes.push(course.code);
    } else {
      prefixGroups.set(prefix, {
        codes: [course.code],
        department: course.department || "Unknown",
      });
    }
  }

  for (const [prefix, group] of prefixGroups) {
    const hubId = `hub:${prefix}`;
    nodes.push({
      id: hubId,
      label: prefix,
      kind: "prefix-hub",
      department: group.department,
      size: 12 + Math.min(group.codes.length / 20, 6),
      tooltip: [`${prefix} courses (${group.codes.length})`],
    });

    for (const code of group.codes) {
      edges.push({ source: courseNodeId(code), target: hubId, department: group.department });
    }
  }

  // Degree hub nodes, connected to every course the degree contains.
  const courseCodes = new Set(courses.map((c) => c.code));
  const degreeSlugs: string[] = [];

  for (const degree of degrees) {
    const memberCodes = degree.courses.filter((code) => courseCodes.has(code));
    if (memberCodes.length === 0) continue;

    degreeSlugs.push(degree.slug);
    const hubId = `deg:${degree.slug}`;
    nodes.push({
      id: hubId,
      label: degree.slug.replace("btech-", "").toUpperCase(),
      kind: "degree-hub",
      degreeSlug: degree.slug,
      size: 9 + Math.min(memberCodes.length / 30, 5),
      tooltip: [degree.title, `${memberCodes.length} courses`],
    });

    for (const code of memberCodes) {
      edges.push({ source: courseNodeId(code), target: hubId, degreeSlug: degree.slug });
    }
  }

  return { nodes, edges, departments, degreeSlugs };
}
