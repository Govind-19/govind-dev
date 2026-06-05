import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Govind — Software Engineer at Maahita Technologies, building a school ERP for Indian schools. Full-stack, product, releases.",
};

const FACTS = [
  "Kottavalasa, Andhra Pradesh, IN",
  "1.5 yrs shipping production",
  "full-stack · product · releases",
  "B.Tech AI/ML · gold medalist",
];

const OWNERSHIP: { heading: string; items: string[] }[] = [
  {
    heading: "Full-stack product delivery",
    items: [
      "Build features across frontend (UI, state, components) and backend (APIs, services)",
      "Design and change database schemas as the product evolves",
      "Ship features driven directly by what real schools ask for",
    ],
  },
  {
    heading: "Releases & production",
    items: [
      "Own git workflows, deployments, and release process",
      "Debug live production issues, including incidents during active school usage",
      "Support QA and testing through the release cycle",
    ],
  },
  {
    heading: "Product & operations",
    items: [
      "Write PRDs and contribute to product design decisions",
      "Manage work in Jira; help shape roadmap from customer feedback",
      "Implement feature gating, subscription-driven UX, and SaaS business logic",
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

const SKILLS = [
  "JavaScript / TypeScript",
  "Python",
  "React",
  "React Native",
  "Node.js / Express",
  "Next.js",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "REST APIs",
  "WebRTC",
  "Git",
  "CI / deployments",
  "Jira",
  "Gemini",
  "Claude",
];

export default function ResumePage() {
  return (
    <>
      <header className="border-b border-line pb-9 pt-16">
        <div className="mx-auto max-w-[760px] px-7">
          <p className="kicker mb-[18px]">Resume</p>
          <h1 className="mb-[10px] font-display text-[36px] font-medium leading-[1.05] tracking-[-1.2px] sm:text-[46px]">
            Bammidi Govinda Rao
          </h1>
          <p className="mb-6 text-[21px] text-lede">
            <b className="font-medium text-accent">Full Stack Developer</b> at
            Maahita Technologies · building a school ERP for Indian schools
          </p>
          <div className="mb-7 flex flex-wrap gap-[10px] font-mono text-[12.5px]">
            {FACTS.map((f) => (
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
            className="inline-flex items-center gap-2 rounded-[2px] bg-accent px-5 py-[11px] font-mono text-[13px] text-paper no-underline transition-opacity hover:opacity-[0.88]"
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
                code on the school ERP from day one — engineering, releases,
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
                Own the LinkedIn content strategy — 60% increase in
                engagement — keeping brand messaging consistent across the
                platform.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 border-t border-line py-[18px] sm:flex-row sm:gap-[18px]">
            <div className="pt-[5px] font-mono text-[12px] text-muted sm:min-w-[130px]">
              Jan 2025 — present
            </div>
            <div>
              <h4 className="mb-[3px] font-display text-[20px] font-medium">
                Thumbnail Editor
              </h4>
              <div className="mb-[7px] font-mono text-[12.5px] text-accent">
                YouTube · Freelance
              </div>
              <p className="text-[16.5px] text-muted">
                High-conversion thumbnails for creators with 7K+ and 21K+
                subscribers; +15% average CTR through strategic visual
                design.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-[46px]">
        <div className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="03" className="mb-[26px]">
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
                Srikakulam. <span className="text-accent">Gold medalist.</span>{" "}
                8.0/10 CGPA.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-[46px]">
        <div className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="04" className="mb-[26px]">
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
