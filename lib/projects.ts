/**
 * Structured project records — the source of truth for the work listing,
 * the per-project detail pages (/work/[slug]), their OG cards, and the
 * homepage featured section. Prose lives here as plain strings so the
 * pages stay free of JSX-escaping noise.
 */

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  body: string;
}

export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface Project {
  slug: string;
  /** full title — detail page heading + metadata */
  title: string;
  /** compact title for cards */
  cardTitle: string;
  /** mono uppercase label, e.g. "Client pilot · Operations platform" */
  kicker: string;
  /** one-line positioning — card body + hero subhead */
  tagline: string;
  /** SEO / meta description */
  summary: string;
  year: string;
  /** short lifecycle note, e.g. "Pilot prototype — under evaluation" */
  status: string;
  /** hero/intro paragraphs */
  overview: string[];
  objectives: string[];
  features: Feature[];
  stack: string[];
  challenges: ChallengeSolution[];
  impact: string[];
  role: string[];
  /** external links; empty for private/pilot work */
  links: ProjectLink[];
  /** when no public link exists, the line shown in its place */
  access?: string;
  /** surfaced on the homepage and pinned to the top of the work list */
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "metro-operations-shift-handover",
    title: "Metro Manufacturing Operations & Shift Handover System",
    cardTitle: "Metro Operations & Shift Handover",
    kicker: "Client pilot · Operations platform",
    tagline:
      "A centralized operations platform that turns shift handovers, testing, and production updates into one structured, auditable system.",
    summary:
      "A web platform that digitizes shift handovers, testing workflows, production updates, and team communication for metro manufacturing teams — replacing paper logs and scattered chat threads with a single source of truth. Built with React, TypeScript, and Firebase.",
    year: "2026",
    status: "Pilot prototype — under evaluation by a metro manufacturing company",
    overview: [
      "Manufacturing a metro train runs on continuous, multi-shift work — and for a long time the most important information moved on paper and across scattered chat threads. When one shift ended, the next began with a verbal recap and a hunt through messages: what had been tested, what failed, what was still pending. Any detail that didn't get written down was simply lost.",
      "This platform replaces that with a single operations system. Technicians, supervisors, and managers record shift handovers, track testing progress train by train, log pending activities, and post production updates in a consistent, structured format — so nothing falls through the gap between shifts, and management can read the state of the floor without asking anyone for a report.",
    ],
    objectives: [
      "Digitize the shift handover process end to end.",
      "Improve communication between technicians, supervisors, and managers.",
      "Track testing activities and the work still pending.",
      "Capture production updates in a consistent, structured format.",
      "Reduce information loss during shift transitions.",
      "Give management real-time visibility into daily operations.",
    ],
    features: [
      {
        title: "Shift handover management",
        body: "Outgoing shifts record what was done and what's outstanding; the incoming shift starts from a complete, structured handover instead of a verbal recap.",
      },
      {
        title: "Train selection & tracking",
        body: "Work is organized per train, so every entry, test, and update is tied to the unit it belongs to and stays easy to trace.",
      },
      {
        title: "Test chapter & sub-chapter selection",
        body: "A hierarchical test structure lets teams drill from chapter to sub-chapter, capturing exactly which procedure an entry refers to.",
      },
      {
        title: "Test status monitoring",
        body: "Each test carries a live status, making it clear at a glance what has passed, what's pending, and what needs attention.",
      },
      {
        title: "Pending activities tracking",
        body: "Unfinished work is carried forward automatically, so open items follow the train across shifts instead of being forgotten.",
      },
      {
        title: "Production updates",
        body: "Daily production progress is logged in a consistent format, building a reliable timeline of how each unit advanced.",
      },
      {
        title: "Team communication logs",
        body: "Coordination happens inside the system and stays attached to the relevant work, replacing fragmented messaging threads.",
      },
      {
        title: "Dashboard & reporting",
        body: "Aggregated views summarize testing status, pending activities, and production progress for supervisors and management.",
      },
      {
        title: "Mobile-friendly interface",
        body: "A responsive layout lets technicians capture updates from the shop floor on a phone, not only from a desk.",
      },
      {
        title: "Role-based access",
        body: "Technicians, supervisors, and managers each see and act on what is relevant to their role.",
      },
    ],
    stack: ["React", "TypeScript", "Firebase", "Material UI", "Node.js", "REST APIs"],
    challenges: [
      {
        challenge:
          "Replacing an entrenched mix of paper logs and chat threads — without slowing the floor down or asking people to learn a foreign process.",
        solution:
          "I modeled the system on the team's real handover flow rather than imposing a new one, and kept data entry fast enough to complete mid-shift. Adoption didn't cost time on the floor; it gave time back.",
      },
      {
        challenge:
          "Capturing testing work that spans many trains and a deep procedure hierarchy, without rigid forms that break the moment reality differs from the template.",
        solution:
          "A train → test chapter → sub-chapter model with per-item status keeps every entry precise and consistent, while staying flexible across units and stages of work.",
      },
      {
        challenge:
          "Information was being lost at the single hardest point to cover — the boundary between two shifts.",
        solution:
          "Pending activities carry forward into the next shift's handover automatically, so open work is never re-typed or dropped, and every change leaves an auditable trail.",
      },
      {
        challenge:
          "Management needed visibility into daily operations without adding yet another manual reporting burden on the floor.",
        solution:
          "Dashboards aggregate testing status, pending work, and production updates straight from the records the floor already maintains — visibility becomes a by-product of normal work, not a separate task.",
      },
      {
        challenge:
          "The same data had to serve technicians on phones at the line and managers reviewing at a desk.",
        solution:
          "A mobile-first responsive interface built on Material UI, with role-based access scoping each view, so one system fits both contexts without compromise.",
      },
    ],
    impact: [
      "Replaces paper handovers and scattered chat threads with one source of truth for shift-to-shift operations.",
      "Reduces information loss at shift transitions by carrying pending work forward automatically.",
      "Gives supervisors and management a real-time view of testing and production without manual reporting.",
      "Builds an auditable record of testing progress and production updates, organized per train.",
      "Currently in pilot evaluation with a metro manufacturing company as a production-oriented prototype.",
    ],
    role: [
      "Product planning",
      "Requirements analysis",
      "UI/UX design",
      "Full-stack development",
      "Database design",
      "Workflow automation",
      "Deployment planning",
    ],
    links: [],
    access: "Private pilot — not publicly accessible.",
    featured: true,
  },
];

/** Featured first, then most recent year first. */
export function getAllProjects(): Project[] {
  return [...PROJECTS].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.year.localeCompare(a.year);
  });
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}
