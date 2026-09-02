import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/SectionLabel";
import { experienceLong, experienceShort } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Govind — Full Stack Developer at Maahita Technologies, building a multi-tenant school ERP for Indian schools end to end: schema, APIs, UI, releases, production.",
};

// the experience fact is derived from the start date — re-render daily so it
// moves on its own instead of freezing at the last deploy.
export const revalidate = 86400;

// a function, not a const: the experience fact is derived from today's date,
// and a module-level array would be computed once per server process and then
// survive every ISR re-render.
function facts(): string[] {
  return [
    "Srikakulam, Andhra Pradesh, IN",
    `${experienceShort()} shipping production`,
    "full-stack · releases · product",
    "B.Tech AI/ML · gold medalist",
    "12,000+ LinkedIn followers",
  ];
}

// mirrors the PDF at /Govind_Resume.pdf — keep the two in step
const OWNERSHIP: { heading: string; items: string[] }[] = [
  {
    heading: "Full-stack product delivery",
    items: [
      "Ship features end to end across 15+ modules of a multi-tenant school ERP: admissions, attendance, curriculum, timetable, marks, fees, subscriptions, parent communication",
      "Helped move the platform from single-tenant Firebase to schema-per-tenant PostgreSQL, with the tenant search path set per connection so one codebase serves every school with hard data isolation",
      "Designed the fees and receipts model around snapshot-frozen receipts (JSONB + BYTEA), so a reissued receipt still reflects the terms at the time of payment",
      "Moved list endpoints to server-side pagination so lists stay fast as school data grows",
    ],
  },
  {
    heading: "Auth, billing & access",
    items: [
      "Firebase JWT auth and role-based access control across four roles",
      "Subscription-driven feature gating, with Razorpay billing and webhook-driven subscription state",
    ],
  },
  {
    heading: "Releases & production",
    items: [
      "Own the git workflow, releases, and Docker/Nginx deployments on DigitalOcean via GitHub Actions",
      "CI gates for schema drift across 240+ versioned migrations with paired rollbacks",
      "Debug live production issues while schools are mid-session; support QA through the release cycle",
    ],
  },
  {
    heading: "Product & operations",
    items: [
      "Write PRDs and contribute to product design decisions",
      "Manage work in Jira; help shape the roadmap from customer feedback",
      "Revamped the official company website (40% better performance scores) and integrated WebRTC for real-time classroom sessions",
      "Contribute to branding and product naming decisions",
    ],
  },
  {
    heading: "Engineering discipline",
    items: [
      "Work through rigorous PR reviews with engineers of 10–14 years experience",
      "Apply architecture thinking, tradeoffs, and maintainability to real systems",
      "Build with AI tools (Gemini, Claude) in the loop, always under senior review",
    ],
  },
];

const PROJECTS: {
  title: string;
  stack: string;
  when: string;
  items: string[];
  link: { label: string; href: string };
}[] = [
  {
    title: "Maahita School ERP",
    stack: "React · TypeScript · Node.js/Express · PostgreSQL · Firebase · Docker",
    when: "2025 — present",
    items: [
      "The platform Maahita sells: one product serving many Indian schools, each with fully isolated data, covering the academic year from enrolment through timetables, exams, fees, and reporting",
      "Every school runs in its own PostgreSQL schema, resolved per request; 240+ versioned migrations with paired rollbacks and a CI drift check keep every schema in step",
      "570 REST endpoints and 680+ test files across two repositories; Razorpay billing, PDF fee receipts, and WhatsApp Business broadcasts on one backend",
    ],
    link: { label: "more on the work page", href: "/work" },
  },
  {
    title: "Vinodam — live quiz platform",
    stack: "React · Firebase · real-time sync",
    when: "2026",
    items: [
      "Real-time quiz platform for school events: an admin control panel, a projector display, and every participant's phone stay in sync",
      "Built solo as a prototype in weeks, adopted as an official Maahita product, and ran its first live event for 300 students with zero downtime",
    ],
    link: {
      label: "the full story",
      href: "/journal/building-vinodam-what-shipping-really-means",
    },
  },
];

const SKILLS = [
  "JavaScript / TypeScript",
  "Python",
  "C++",
  "SQL",
  "React",
  "Next.js",
  "React Native",
  "Node.js / Express",
  "Tailwind CSS",
  "Material UI",
  "WebRTC",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "REST APIs",
  "JWT",
  "Docker",
  "Nginx",
  "DigitalOcean",
  "GitHub Actions (CI/CD)",
  "Vitest",
  "Git",
  "Jira",
  "Vercel",
];

export default function ResumePage() {
  return (
    <>
      <header className="border-b border-line pb-9 pt-16">
        <div className="mx-auto max-w-[760px] px-7">
          <p className="kicker rise mb-[18px]">Resume</p>
          <h1 className="rise rise-1 mb-[10px] font-display text-display font-medium leading-[1.03] tracking-[-1.2px]">
            Bammidi Govinda Rao
          </h1>
          <p className="rise rise-2 mb-4 text-[21px] text-lede">
            <b className="font-medium text-accent">Full Stack Developer</b> at
            Maahita Technologies · building a multi-tenant school ERP for
            Indian schools
          </p>
          <p className="rise rise-2 mb-6 max-w-[640px] text-[17.5px] text-body">
            Full-stack developer with {experienceLong()} shipping production
            software used daily by Indian schools. I build the ERP end to end,
            schema-per-tenant PostgreSQL, Node.js/Express APIs, React/TypeScript
            interfaces, and own what comes after the code: migrations,
            releases, deployments, and debugging live incidents while schools
            are mid-session.
          </p>
          <div className="rise rise-3 mb-7 flex flex-wrap gap-[10px] font-mono text-[12.5px]">
            {facts().map((f) => (
              <span
                key={f}
                className="rounded-[2px] border border-line bg-paper-2 px-[13px] py-[6px] text-tag"
              >
                <i className="not-italic text-accent" aria-hidden="true">
                  ◆{" "}
                </i>
                {f}
              </span>
            ))}
          </div>
          <a
            href="/Govind_Resume.pdf"
            download
            className="rise rise-4 inline-flex items-center gap-2 rounded-[2px] bg-accent px-5 py-[11px] font-mono text-[13px] text-paper no-underline transition-opacity hover:opacity-[0.88]"
          >
            ↓ Download PDF resume
          </a>
        </div>
      </header>

      <section className="border-b border-line py-[46px]">
        <div className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="01" className="mb-[26px]">
            What I own &amp; ship
          </SectionLabel>
          {OWNERSHIP.map((block) => (
            <div key={block.heading} className="mb-[26px] last:mb-0">
              <h3 className="mb-[10px] font-display text-[23px] font-medium tracking-[-0.4px]">
                {block.heading}
              </h3>
              <ul>
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="relative mb-[7px] pl-5 text-[17.5px] text-body"
                  >
                    <span
                      className="absolute left-0 text-accent"
                      aria-hidden="true"
                    >
                      ›
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-line py-[46px]">
        <div className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="02" className="mb-[26px]">
            Experience
          </SectionLabel>

          <div className="flex flex-col gap-1 py-[18px] sm:flex-row sm:gap-[18px]">
            <div className="pt-[5px] font-mono text-[12px] text-muted sm:min-w-[130px]">
              Jan 2025 — present
            </div>
            <div>
              <h4 className="mb-[3px] font-display text-[20px] font-medium">
                Full Stack Developer
              </h4>
              <div className="mb-[7px] font-mono text-[12.5px] text-accent">
                Maahita Technologies · Remote
              </div>
              <p className="text-[16.5px] text-muted">
                Joined in my 4th year of BTech and started shipping production
                code on the school ERP from day one: engineering, releases,
                product, and production support, mentored through PR reviews
                by senior engineers.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 border-t border-line py-[18px] sm:flex-row sm:gap-[18px]">
            <div className="pt-[5px] font-mono text-[12px] text-muted sm:min-w-[130px]">
              May 2025 — present
            </div>
            <div>
              <h4 className="mb-[3px] font-display text-[20px] font-medium">
                Content Administrator
              </h4>
              <div className="mb-[7px] font-mono text-[12.5px] text-accent">
                Maahita Technologies · Remote
              </div>
              <p className="text-[16.5px] text-muted">
                Own the company&apos;s LinkedIn content strategy: technical and
                product storytelling that grew engagement by 60%.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-[46px]">
        <div className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="03" className="mb-[26px]">
            Projects
          </SectionLabel>
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              className={`flex flex-col gap-1 py-[18px] sm:flex-row sm:gap-[18px] ${
                i === 0 ? "" : "border-t border-line"
              }`}
            >
              <div className="pt-[5px] font-mono text-[12px] text-muted sm:min-w-[130px]">
                {p.when}
              </div>
              <div>
                <h4 className="mb-[3px] font-display text-[20px] font-medium">
                  {p.title}
                </h4>
                <div className="mb-[9px] font-mono text-[12.5px] text-accent">
                  {p.stack}
                </div>
                <ul className="mb-3">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="relative mb-[6px] pl-5 text-[16.5px] text-muted"
                    >
                      <span
                        className="absolute left-0 text-accent"
                        aria-hidden="true"
                      >
                        ›
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.link.href}
                  className="font-mono text-[13px] text-accent no-underline hover:underline"
                >
                  {p.link.label} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-line py-[46px]">
        <div className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="04" className="mb-[26px]">
            Education
          </SectionLabel>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-[18px]">
            <div className="font-mono text-[12px] text-muted sm:min-w-[130px]">
              2021 — 2025
            </div>
            <div>
              <h4 className="mb-[3px] font-display text-[20px] font-medium">
                B.Tech, Artificial Intelligence &amp; Machine Learning
              </h4>
              <p className="text-[16.5px] text-muted">
                Sri Venkateswara College of Engineering and Technology,
                Srikakulam.{" "}
                <span className="text-accent">
                  Gold medalist, 2025 graduating batch.
                </span>{" "}
                8.17/10 CGPA.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-[46px]">
        <div className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="05" className="mb-[26px]">
            Stack &amp; tools
          </SectionLabel>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="rounded-[2px] border border-line bg-paper-2 px-[13px] py-[7px] font-mono text-[13px] text-tag"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
