import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Intelligently abbreviates department names for mobile display
 * Examples:
 * - "Computer Science and Engineering" -> "CSE"
 * - "Mechanical and Industrial Engineering" -> "MIE"
 * - "Mathematics" -> "Math"
 */
export function abbreviateDepartment(department: string): string {
  if (!department) return "";

  // Keyed by a Map so an arbitrary department string stays a plain lookup key
  // instead of an open `Record<string, string>` annotation over known entries.
  const commonAbbreviations = new Map<string, string>([
    ["Computer Science and Engineering", "CSE"],
    ["Electronics and Communication Engineering", "ECE"],
    ["Electrical and Electronics Engineering", "EEE"],
    ["Mechanical and Industrial Engineering", "MIE"],
    ["Mechanical Engineering", "ME"],
    ["Civil Engineering", "CE"],
    ["Chemical Engineering", "ChE"],
    ["Biotechnology", "BT"],
    ["Information Technology", "IT"],
    ["Aeronautical Engineering", "AE"],
    ["Automobile Engineering", "Auto"],
    ["Biomedical Engineering", "BME"],
    ["Industrial and Production Engineering", "IPE"],
    ["Instrumentation and Control Engineering", "ICE"],
    ["Mathematics", "Math"],
    ["Physics", "Phy"],
    ["Chemistry", "Chem"],
    ["Humanities", "Hum"],
    ["Management", "Mgmt"],
    ["Sciences", "Sci"],
  ]);

  // Check if we have a direct match
  const directMatch = commonAbbreviations.get(department);
  if (directMatch) {
    return directMatch;
  }

  // If not, create abbreviation from capital letters or first letters of words
  const words = department.split(" ").filter((w) => w.length > 0);

  // If single word, take first 3-4 characters
  if (words.length === 1) {
    return department.length > 4 ? department.substring(0, 4) : department;
  }

  // Multi-word: take first letter of each significant word (skip 'and', 'of', 'the')
  const skipWords = new Set(["and", "of", "the", "in", "for"]);
  const abbreviation = words
    .filter((word) => !skipWords.has(word.toLowerCase()))
    .map((word) => word[0].toUpperCase())
    .join("");

  return abbreviation || department.substring(0, 3);
}

/**
 * Centralized logic for generating course links.
 * Handles special redirects for project work and mini projects.
 */
export function getCourseLink(code: string): string {
  const cleanCode = code.trim();
  if (cleanCode.endsWith("4191")) return "/mini-projects";
  if (cleanCode.endsWith("4293")) return "/project-work-honours";
  if (cleanCode.endsWith("4292")) return "/project-work";
  return `/course/${encodeURIComponent(cleanCode)}`;
}
