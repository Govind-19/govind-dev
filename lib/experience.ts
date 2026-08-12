/**
 * Experience length, derived from the start date instead of hardcoded, so the
 * numbers on the site never go stale.
 *
 * Call these inside a component, never at module scope — a module-level value
 * is computed once when the server loads the file and would survive an ISR
 * re-render. Pages using these set `revalidate` so the value refreshes without
 * a deploy.
 */

/** Joined Maahita Technologies — January 2025. */
const START = { year: 2025, month: 1 } as const;

/** Whole months elapsed since the start date. */
function monthsSince(now: Date): number {
  const months =
    (now.getUTCFullYear() - START.year) * 12 +
    (now.getUTCMonth() + 1 - START.month);
  return Math.max(0, months);
}

/**
 * Years rounded *down* to the nearest half. An experience claim should never
 * round up, so 19 months reads as 1.5 years and only becomes 2 at 24 months.
 */
function years(now: Date): number {
  return Math.floor(monthsSince(now) / 6) / 2;
}

/** "1.5", "2" — no trailing ".0". */
function trim(value: number): string {
  return value % 1 === 0 ? String(value) : value.toFixed(1);
}

/** Compact form for the stat chips: "1.5 yrs". */
export function experienceShort(now: Date = new Date()): string {
  const months = monthsSince(now);
  if (months < 12) return `${months} mos`;
  const value = years(now);
  return `${trim(value)} ${value === 1 ? "yr" : "yrs"}`;
}

/** Prose form for body copy: "1.5 years". */
export function experienceLong(now: Date = new Date()): string {
  const months = monthsSince(now);
  if (months < 12) return `${months} months`;
  const value = years(now);
  return `${trim(value)} ${value === 1 ? "year" : "years"}`;
}
