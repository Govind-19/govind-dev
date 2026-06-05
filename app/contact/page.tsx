import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk shop, hire, or compare notes on building in public — I'm easy to reach.",
};

const CHANNELS = [
  { label: "LinkedIn", value: "/in/govind", href: site.linkedin },
  { label: "GitHub", value: "@Govind-19", href: site.github },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
];

export default function ContactPage() {
  return (
    <>
      <main className="flex flex-1 items-center py-[60px]">
        <div className="mx-auto w-full max-w-[700px] px-7">
          <p className="kicker mb-5">Contact</p>
          <h1 className="mb-5 font-display text-[36px] font-medium leading-[1.05] tracking-[-1.2px] sm:text-[48px]">
            Want to see how I <em className="italic text-accent">think</em>?
          </h1>
          <p className="mb-10 max-w-[520px] text-[20px] text-lede">
            The journal is the real answer. But if you want to talk shop,
            hire, or just compare notes on building in public — I&apos;m easy
            to reach.
          </p>

          <div className="grid max-w-[520px] gap-px border border-line bg-line">
            {CHANNELS.map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                className="group flex items-center justify-between bg-paper px-6 py-5 no-underline transition-colors hover:bg-paper-2"
              >
                <span>
                  <span className="block font-mono text-[12px] uppercase tracking-[1px] text-accent">
                    {ch.label}
                  </span>
                  <span className="text-[18px] text-ink">{ch.value}</span>
                </span>
                <span
                  className="font-mono text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-[30px] pb-[50px] text-center">
        <p className="font-mono text-[11px] text-muted">{site.fine}</p>
      </footer>
    </>
  );
}
