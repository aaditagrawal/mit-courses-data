export function parseLimit(value: string | null, defaultValue = 50, max = 100): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return defaultValue;
  return Math.min(Math.floor(parsed), max);
}

export function parseOffset(value: string | null): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.floor(parsed);
}

export function parseSearchType(value: string | null): "all" | "courses" | "degrees" {
  if (value === "courses" || value === "degrees") return value;
  return "all";
}

/** One page of results plus the size of the unpaginated result set. */
export interface Page<T> {
  data: T[];
  total: number;
}
