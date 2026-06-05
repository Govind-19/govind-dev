import type { Metadata } from "next";
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
          <div className="rounded-[3px] border border-line bg-paper-2 px-[30px] py-7">
            <p className="mb-[14px] font-mono text-[12px] uppercase tracking-[1px] text-accent">
              Maahita Technologies · School ERP
            </p>
            <h3 className="mb-3 font-display text-[24px] font-medium">
              A school ERP built for Indian local schools
            </h3>
            <p className="text-[18px] text-lede">
              An early-stage SaaS product run by three founders investing in
              the idea directly. No big roadmap handed down, no perfect
              process. We learn from real schools, evolve the product, and
              ship. I&apos;ve been on it since my 4th year of BTech, across
              every layer above.
            </p>
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

      <Footer />
    </>
  );
}
