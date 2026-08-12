"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const LINKS = [
  { href: "/journal", label: "journal" },
  { href: "/work", label: "what i build" },
  { href: "/resume", label: "resume" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-[color-mix(in_srgb,var(--color-paper)_85%,transparent)] backdrop-blur-[8px]">
      <div className="mx-auto flex h-[60px] max-w-[760px] items-center justify-between px-7">
        <Link
          href="/"
          className="group font-mono text-[14px] font-medium tracking-[-0.3px] text-ink no-underline"
        >
          govind
          <b className="inline-block text-accent transition-transform duration-300 ease-settle group-hover:-translate-y-[3px]">
            .
          </b>
          dev
        </Link>

        <div className="flex items-center gap-[22px]">
          <div className="hidden gap-[26px] font-mono text-[13px] sm:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`nav-link no-underline transition-colors hover:text-accent ${
                  isActive(l.href) ? "text-accent" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <ThemeToggle />

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="font-mono text-[13px] text-muted sm:hidden"
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </div>

      {open && (
        <div className="rise border-t border-line bg-paper [animation-duration:0.3s] sm:hidden">
          {/* full-width rows: a comfortable tap target each, ruled like an index */}
          <div className="mx-auto max-w-[760px] px-7 py-1">
            {LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between border-b border-line/60 py-[14px] font-mono text-[14px] no-underline last:border-0 ${
                    active ? "text-accent" : "text-tag"
                  }`}
                >
                  <span className="flex items-center gap-[11px]">
                    <span
                      aria-hidden="true"
                      className={`h-[5px] w-[5px] rounded-full ${
                        active ? "bg-accent" : "bg-line"
                      }`}
                    />
                    {l.label}
                  </span>
                  <span aria-hidden="true" className="text-muted">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
