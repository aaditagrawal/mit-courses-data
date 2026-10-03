import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
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
