import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "What I build",
  description:
    "One product, every layer. The end-to-end surface area: engineering, product & ops, and the Maahita school ERP.",
};

const ENGINEERING = [
  "frontend (UI, state, components)",
  "backend (APIs, services)",
  "database design & changes",
  "git workflows & branching",
  "deployments & releases",
  "production debugging",
  "writing tests",
];

const PRODUCT_OPS = [
  "PRDs & product design",
  "Jira management",
  "QA support & testing",
  "customer-driven features",
  "feature gating & subscriptions",
  "SaaS business decisions",
  "branding decisions",
];

interface SideProject {
  kicker: string;
  title: string;
  story: string[];
  stack: string[];
  links: { label: string; href: string }[];
}

const SIDE_PROJECTS: SideProject[] = [
  {
    kicker: "Built for my father",
    title: "Site Bill Automator",
    story: [
      "My father is a paint contractor. Every time he finished painting a bank branch, someone had to make the bill for the owner — material lists, work measurements, totals. That someone was me: typing every line into MS Word, colouring fonts, adjusting sizes, running each calculation on a phone calculator, exporting a PDF. I made calculation mistakes more than once, and my father let me know about it.",
      "So I built the proper fix: an Android app (Kotlin, Jetpack Compose) and a web app (Next.js) sharing one Firestore database in real time — multi-section bills, work measurements, per-day rates, advances, and a one-tap PDF whose maths is never wrong. A bill that used to eat an evening now takes minutes.",
    ],
    stack: ["Kotlin · Jetpack Compose", "Next.js", "Firebase Firestore", "PDF generation", "PWA"],
    links: [{ label: "live app", href: "https://web-sable-rho-20.vercel.app" }],
  },
  {
    kicker: "Built for myself — now my friends use it",
    title: "Roots",
    story: [
      "I was spending a lot, lending money to friends and forgetting about it. My system was a notepad app on my phone and redoing the maths by hand — who owes me, what I owe, constant confusion.",
      "Roots is the fix: a simple expense tracker that also tracks lent and borrowed money per person, with repayments, budgets, recurring expenses, and charts — offline-first, installable on Android. I kept it simple enough that my friends now use it daily too.",
    ],
    stack: ["React", "Capacitor (Android)", "Firebase", "offline-first", "Recharts"],
    links: [
      { label: "live app", href: "https://expensetracker-seven-zeta.vercel.app" },
      { label: "github", href: "https://github.com/Govind-19/Roots" },
    ],
  },
];

export default function WorkPage() {
  return (
    <>
      <header className="border-b border-line pb-[50px] pt-[70px]">
        <div className="mx-auto max-w-[760px] px-7">
          <p className="kicker mb-5">What I build, end to end</p>
          <h1 className="mb-[18px] font-display text-[34px] font-medium leading-[1.05] tracking-[-1.2px] sm:text-[46px]">
            One product. <em className="italic text-accent">Every</em> layer.
          </h1>
          <p className="max-w-[600px] text-[20px] text-lede">
            Most engineers at 1.5 years have touched one slice of one
            codebase. I&apos;ve shipped a whole product — from the database to
            the deploy to the customer call that changed it.
          </p>
        </div>
      </header>

      <section className="border-b border-line py-[50px]">
        <div className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="01" className="mb-7">
            The surface area
          </SectionLabel>
          <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            <div className="bg-paper px-6 py-[22px]">
              <h4 className="mb-[14px] font-mono text-[12px] uppercase tracking-[1px] text-accent">
                Engineering
              </h4>
              <ul className="font-mono text-[13.5px] text-lede">
                {ENGINEERING.map((item) => (
                  <li key={item} className="py-1">
                    <span className="text-muted" aria-hidden="true">
                      ›{" "}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-paper px-6 py-[22px]">
              <h4 className="mb-[14px] font-mono text-[12px] uppercase tracking-[1px] text-accent">
                Product & ops
              </h4>
              <ul className="font-mono text-[13.5px] text-lede">
                {PRODUCT_OPS.map((item) => (
                  <li key={item} className="py-1">
                    <span className="text-muted" aria-hidden="true">
                      ›{" "}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-[50px]">
        <div className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="02" className="mb-7">
            The product I work on
          </SectionLabel>
          <div className="flex flex-col gap-6">
            <div className="rounded-[3px] border border-line bg-paper-2 px-[30px] py-7">
              <p className="mb-[14px] font-mono text-[12px] uppercase tracking-[1px] text-accent">
                Maahita Technologies · School ERP
              </p>
              <h3 className="mb-3 font-display text-[24px] font-medium">
                A school ERP built for Indian local schools
              </h3>
              <p className="mb-5 text-[18px] text-lede">
                An early-stage SaaS product run by three founders investing in
                the idea directly. No big roadmap handed down, no perfect
                process. We learn from real schools, evolve the product, and
                ship. I&apos;ve been on it since my 4th year of BTech, across
                every layer above.
              </p>
              <div className="flex gap-[22px] font-mono text-[13px]">
                <a
                  href="https://school.maahita.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-transparent text-accent no-underline transition-colors hover:border-accent"
                >
                  live product →
                </a>
              </div>
            </div>

            <div className="rounded-[3px] border border-line bg-paper-2 px-[30px] py-7">
              <p className="mb-[14px] font-mono text-[12px] uppercase tracking-[1px] text-accent">
                Maahita Technologies · Vinodam
              </p>
              <h3 className="mb-3 font-display text-[24px] font-medium">
                A live quiz platform for school events
              </h3>
              <p className="mb-5 text-[18px] text-lede">
                Born from a principal&apos;s challenge: TV-show-style quizzes
                for school events. I built the prototype in secret — three
                synchronized screens (admin control, projector display,
                participant phones) with real-time scoring, timers, and
                leaderboards. The team adopted it as an official product, and
                it ran its first live event with 300 students without
                breaking.
              </p>
              <div className="flex gap-[22px] font-mono text-[13px]">
                <a
                  href="https://vinodam-maahita.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-transparent text-accent no-underline transition-colors hover:border-accent"
                >
                  live app →
                </a>
                <Link
                  href="/journal/building-vinodam-what-shipping-really-means"
                  className="border-b border-transparent text-accent no-underline transition-colors hover:border-accent"
                >
                  the full story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-[50px]">
        <div className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="03" className="mb-7">
            How I learned it
          </SectionLabel>
          <p className="mb-4 max-w-[620px] text-body">
            I came in with basic programming and almost no production
            experience. I learned by shipping — and by getting my PRs rejected
            by engineers with 10 to 14 years in the industry.
          </p>
          <p className="mb-4 max-w-[620px] text-body">
            I build with AI in the loop (Gemini, Claude) but never blindly.
            Every line goes through senior review. The AI gets me moving fast.
            The reviews are where I actually understand what I built.
          </p>
          <p className="pull text-[24px]">
            They taught me code reviews, architecture thinking, tradeoffs,
            maintainability, and product thinking. The kind of thing you only
            learn standing next to someone who&apos;s seen it break before.
          </p>
        </div>
      </section>

      <section className="border-b border-line py-[50px]">
        <div className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="04" className="mb-7">
            Side projects — built because real life demanded it
          </SectionLabel>
          <div className="flex flex-col gap-6">
            {SIDE_PROJECTS.map((project) => (
              <div
                key={project.title}
                className="rounded-[3px] border border-line bg-paper-2 px-[30px] py-7"
              >
                <p className="mb-[14px] font-mono text-[12px] uppercase tracking-[1px] text-accent">
                  {project.kicker}
                </p>
                <h3 className="mb-3 font-display text-[24px] font-medium">
                  {project.title}
                </h3>
                {project.story.map((para) => (
                  <p key={para.slice(0, 40)} className="mb-4 text-[18px] text-lede">
                    {para}
                  </p>
                ))}
                <div className="mb-5 flex flex-wrap gap-2 font-mono text-[12px]">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-[2px] border border-line bg-paper px-[10px] py-[5px] text-tag"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex gap-[22px] font-mono text-[13px]">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-transparent text-accent no-underline transition-colors hover:border-accent"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
