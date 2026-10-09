import Link from "next/link";
import EntryRow from "@/components/EntryRow";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import WorkRow from "@/components/WorkRow";
import { experienceShort } from "@/lib/experience";
import { getAllPosts, toMeta } from "@/lib/posts";
import { getHomeWork } from "@/lib/projects";
import { site } from "@/lib/site";

// the experience chip is derived from the start date — re-render daily so it
// moves on its own instead of freezing at whatever the last deploy computed.
export const revalidate = 86400;

/** what I work in day to day — the resume page carries the full list */
const STACK = [
  "TypeScript / JavaScript",
  "React",
  "Next.js",
  "React Native",
  "Node.js / Express",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "REST APIs",
  "Docker / Nginx",
  "GitHub Actions",
  "Vitest",
  "Git",
  "Jira",
];

const CONTACT = [
  { label: "email", href: `mailto:${site.email}` },
  { label: "linkedin", href: site.linkedin },
  { label: "github", href: site.github },
];

const quietLink =
  "border-b border-transparent text-accent no-underline transition-colors hover:border-accent";

export default function HomePage() {
  const work = getHomeWork();
  const latest = getAllPosts().slice(0, 3).map(toMeta);
  const served = experienceShort();

  return (
    <>
      <header className="border-b border-line pb-12 pt-[72px]">
        <div className="mx-auto max-w-[760px] px-7">
          <p className="kicker rise mb-[22px]">
            {site.role} · open to roles
          </p>
          <h1 className="rise rise-1 mb-[22px] font-display text-masthead font-medium leading-[1.02] tracking-[-1.5px]">
            I&apos;m Govind. I ship a school ERP SaaS{" "}
            <em className="italic text-accent">end to end</em>.
          </h1>
          <p className="rise rise-2 mb-[26px] max-w-[600px] text-[19px] text-lede sm:text-[20px]">
            At Maahita Technologies since September 2024, building a
            multi-tenant ERP for Indian schools: frontend, backend, database,
            releases, and the production fires in between.{" "}
            <Link
              href="/about"
              className="text-accent underline underline-offset-4"
            >
              More about me →
            </Link>
          </p>
          <div className="rise rise-3 mb-[30px] flex flex-wrap gap-[10px] font-mono text-[12.5px]">
            <span className="rounded-[2px] border border-line bg-paper-2 px-[13px] py-[6px] text-tag">
              <b className="font-medium text-accent">{served}</b> shipping
              production
            </span>
            <span className="rounded-[2px] border border-line bg-paper-2 px-[13px] py-[6px] text-tag">
              mentored by <b className="font-medium text-accent">10–14 yr</b>{" "}
              engineers
            </span>
          </div>
          <div className="rise rise-4 flex flex-wrap items-center gap-x-[22px] gap-y-3 font-mono text-[13px]">
            <a
              href="/Govind_Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-[2px] bg-accent px-5 py-[11px] text-paper no-underline transition-opacity hover:opacity-[0.88]"
            >
              ↓ Resume PDF
            </a>
            {CONTACT.map((c) => {
              // mailto opens the mail client, not a page — a new tab would be blank
              const external = !c.href.startsWith("mailto:");
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={quietLink}
                >
                  {c.label} →
                </a>
              );
            })}
          </div>
        </div>
      </header>

      <section className="border-b border-line py-[54px]" id="work">
        <Reveal className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="01" className="mb-[18px]">
            Work
          </SectionLabel>
          {work.map((row, i) => (
            <WorkRow key={row.title} row={row} last={i === work.length - 1} />
          ))}
          <p className="mt-5 font-mono text-[13px]">
            <Link href="/work" className="text-accent no-underline hover:underline">
              all work, side projects included →
            </Link>
          </p>
        </Reveal>
      </section>

      <section className="border-b border-line py-[54px]" id="stack">
        <Reveal className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="02" className="mb-[26px]">
            Stack
          </SectionLabel>
          <div className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className="rounded-[2px] border border-line bg-paper-2 px-[13px] py-[7px] font-mono text-[13px] text-tag"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-b border-line py-[54px]" id="experience">
        <Reveal className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="03" className="mb-[18px]">
            Experience
          </SectionLabel>

          <div className="flex flex-col gap-1 py-[18px] sm:flex-row sm:gap-[18px]">
            <div className="pt-[5px] font-mono text-[12px] text-muted sm:min-w-[130px]">
              Sep 2024 — present
            </div>
            <div>
              <h3 className="mb-[3px] font-display text-[20px] font-medium">
                Full Stack Developer (Founding Team)
              </h3>
              <div className="mb-[7px] font-mono text-[12.5px] text-accent">
                Maahita Technologies · Remote
              </div>
              <p className="text-[16.5px] text-muted">
                Ship features across 15+ modules of a multi-tenant school ERP,
                own releases and Docker deployments on DigitalOcean, debug live
                incidents, and demo the product to schools in person. Mentored
                through PR reviews by senior engineers since my 4th year of
                BTech.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 border-t border-line py-[18px] sm:flex-row sm:gap-[18px]">
            <div className="pt-[5px] font-mono text-[12px] text-muted sm:min-w-[130px]">
              2021 — 2025
            </div>
            <div>
              <h3 className="mb-[3px] font-display text-[20px] font-medium">
                B.Tech, Artificial Intelligence &amp; Machine Learning
              </h3>
              <p className="text-[16.5px] text-muted">
                Sri Venkateswara College of Engineering and Technology,
                Srikakulam. <span className="text-accent">Gold medalist.</span>{" "}
                8.17/10 CGPA.
              </p>
            </div>
          </div>

          <p className="mt-3 font-mono text-[13px]">
            <Link href="/resume" className="text-accent no-underline hover:underline">
              full resume →
            </Link>
          </p>
        </Reveal>
      </section>

      <section className="border-b border-line py-[54px]" id="journal">
        <Reveal className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="04" className="mb-[18px]">
            Writing — the engineering journal
          </SectionLabel>
          {latest.map((post, i) => (
            <EntryRow
              key={post.slug}
              post={post}
              compact
              last={i === latest.length - 1}
            />
          ))}
          <p className="mt-5 font-mono text-[13px]">
            <Link href="/journal" className="text-accent no-underline hover:underline">
              all entries →
            </Link>
          </p>
        </Reveal>
      </section>

      <Footer who="One product. Every layer. Out in the open." />
    </>
  );
}
