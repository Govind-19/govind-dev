import Link from "next/link";
import EntryRow from "@/components/EntryRow";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { getAllPosts, toMeta } from "@/lib/posts";

const ENGINEERING = [
  "frontend & backend",
  "database design",
  "git workflows",
  "deployments & releases",
  "production debugging",
];

const PRODUCT_OPS = [
  "PRDs & product design",
  "Jira management",
  "QA support",
  "customer-driven features",
  "SaaS & branding calls",
];

export default function HomePage() {
  const latest = getAllPosts().slice(0, 3).map(toMeta);

  return (
    <>
      <header className="border-b border-line pb-14 pt-[78px]">
        <div className="mx-auto max-w-[760px] px-7">
          <p className="kicker rise mb-[22px]">
            Engineering journal · build in public
          </p>
          <h1 className="rise rise-1 mb-[26px] font-display text-[38px] font-medium leading-[1.05] tracking-[-1.5px] sm:text-[54px]">
            I&apos;m learning to build software the way it&apos;s{" "}
            <em className="italic text-accent">actually</em> built.
            <span className="caret" aria-hidden="true" />
          </h1>
          <p className="rise rise-2 mb-[34px] max-w-[600px] text-[19px] text-lede sm:text-[21px]">
            Software engineer at Maahita Technologies, shipping a real school
            ERP product end-to-end since my 4th year of BTech. Frontend to
            deployments to production fires. Documenting what I get wrong, and
            what shipping teaches me.
          </p>
          <div className="rise rise-3 flex flex-wrap gap-[10px] font-mono text-[12.5px]">
            <span className="rounded-[2px] border border-line bg-paper-2 px-[13px] py-[6px] text-tag">
              <b className="font-medium text-accent">1.5 yrs</b> shipping
              production
            </span>
            <span className="rounded-[2px] border border-line bg-paper-2 px-[13px] py-[6px] text-tag">
              mentored by <b className="font-medium text-accent">10–14 yr</b>{" "}
              engineers
            </span>
            <span className="rounded-[2px] border border-line bg-paper-2 px-[13px] py-[6px] text-tag">
              full-stack · product · releases
            </span>
            <span className="rounded-[2px] border border-line bg-paper-2 px-[13px] py-[6px] text-tag">
              built with <b className="font-medium text-accent">AI</b>,
              reviewed by humans
            </span>
          </div>
        </div>
      </header>

      <section className="border-b border-line py-[54px]" id="about">
        <Reveal className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="01" className="mb-[30px]">
            About
          </SectionLabel>
          <p className="mb-[18px] text-body">
            I didn&apos;t take the usual path. No years of grinding LeetCode,
            no big MNC onboarding. I joined a 3-founder startup as a 4th-year
            intern and started shipping production code on day one — on a
            product that wasn&apos;t mature, in a company that was still
            figuring itself out.
          </p>
          <p className="mb-[18px] text-body">
            I learned engineering during the AI-coding era — Gemini, Claude,
            all of it. But every line went through senior engineers with a
            decade-plus of experience. They rejected my PRs. They asked why.
            They made me defend my choices. That friction is where I actually
            learned.
          </p>
          <p className="pull">
            Most of my best lessons started as things I thought were pointless
            — until the product got big enough to prove me wrong.
          </p>
          <p className="text-body">
            This site is the public record of that growth. Not polished
            theory. The real version, written down as it happens.{" "}
            <Link
              href="/about"
              className="text-accent underline underline-offset-4"
            >
              The longer story →
            </Link>
          </p>
        </Reveal>
      </section>

      <section className="border-b border-line py-[54px]" id="journal">
        <Reveal className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="02" className="mb-[30px]">
            The journal — latest entries
          </SectionLabel>
          {latest.map((post, i) => (
            <EntryRow key={post.slug} post={post} last={i === latest.length - 1} />
          ))}
          <p className="mt-6 font-mono text-[13px]">
            <Link
              href="/journal"
              className="text-accent no-underline hover:underline"
            >
              all entries →
            </Link>
          </p>
        </Reveal>
      </section>

      <section className="border-b border-line py-[54px]" id="work">
        <Reveal className="mx-auto max-w-[760px] px-7">
          <SectionLabel number="03" className="mb-[30px]">
            What I build, end to end
          </SectionLabel>
          <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            <div className="bg-paper px-[22px] py-5">
              <h4 className="mb-3 font-mono text-[12px] uppercase tracking-[1px] text-accent">
                Engineering
              </h4>
              <ul className="font-mono text-[13.5px] text-lede">
                {ENGINEERING.map((item) => (
                  <li key={item} className="py-[3px]">
                    <span className="text-muted" aria-hidden="true">
                      ›{" "}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-paper px-[22px] py-5">
              <h4 className="mb-3 font-mono text-[12px] uppercase tracking-[1px] text-accent">
                Product & ops
              </h4>
              <ul className="font-mono text-[13.5px] text-lede">
                {PRODUCT_OPS.map((item) => (
                  <li key={item} className="py-[3px]">
                    <span className="text-muted" aria-hidden="true">
                      ›{" "}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 font-mono text-[13px]">
            <Link
              href="/work"
              className="text-accent no-underline hover:underline"
            >
              the full surface area →
            </Link>
          </p>
        </Reveal>
      </section>

      <Footer who="One product. Every layer. Out in the open." />
    </>
  );
}
