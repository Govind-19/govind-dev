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
          className="font-mono text-[14px] font-medium tracking-[-0.3px] text-ink no-underline"
        >
          govind<b className="text-accent">.</b>dev
        </Link>

        <div className="flex items-center gap-[22px]">
          <div className="hidden gap-[26px] font-mono text-[13px] sm:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`no-underline transition-colors hover:text-accent ${
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
        <div className="border-t border-line sm:hidden">
          <div className="mx-auto flex max-w-[760px] flex-col gap-3 px-7 py-4 font-mono text-[13px]">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`no-underline ${
                  isActive(l.href) ? "text-accent" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
