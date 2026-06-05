import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center py-[100px]">
      <div className="mx-auto w-full max-w-[700px] px-7">
        <p className="kicker mb-5">404</p>
        <h1 className="mb-5 font-display text-[36px] font-medium leading-[1.05] tracking-[-1.2px] sm:text-[48px]">
          This page didn&apos;t <em className="italic text-accent">ship</em>.
        </h1>
        <p className="mb-9 max-w-[520px] text-[20px] text-lede">
          Maybe it got rejected in review. Maybe it never existed. Either way,
          the journal is back this way.
        </p>
        <Link
          href="/"
          className="inline-block rounded-[2px] border border-line bg-paper-2 px-[15px] py-2 font-mono text-[12.5px] text-tag no-underline transition-colors hover:border-accent hover:text-accent"
        >
          ← back home
        </Link>
      </div>
    </main>
  );
}
