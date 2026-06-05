import type { Metadata } from "next";
import Footer from "@/components/Footer";
import JournalList from "@/components/JournalList";
import { getAllPosts, toMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Everything I'm learning, written down as it happens. Honest notes from shipping a real product.",
};

export default function JournalPage() {
  const posts = getAllPosts().map(toMeta);

  return (
    <>
      <header className="border-b border-line pb-9 pt-[70px]">
        <div className="mx-auto max-w-[760px] px-7">
          <p className="kicker mb-5">The journal</p>
          <h1 className="mb-[18px] font-display text-[34px] font-medium leading-[1.05] tracking-[-1.2px] sm:text-[46px]">
            Everything I&apos;m learning, written down as it happens.
          </h1>
          <p className="max-w-[580px] text-[20px] text-lede">
            Honest notes from shipping a real product. The practices I fought,
            the incidents I survived, the lessons that only made sense months
            later.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[760px] px-7">
        <JournalList posts={posts} />
      </div>

      <Footer />
    </>
  );
}
