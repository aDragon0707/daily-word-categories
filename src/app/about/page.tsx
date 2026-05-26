import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Daily Word Categories",
  description:
    "Learn what Daily Word Categories is, who it is for, and how the daily word puzzle helps players practice American English associations.",
  alternates: {
    canonical: "/about",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f7f4ec] px-4 py-8 text-[#17140f] sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="border-b border-[#17140f1f] pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d3f2b]">About</p>
          <h1 className="mt-2 text-3xl font-black sm:text-5xl">About Daily Word Categories</h1>
          <p className="mt-4 text-sm leading-6 text-[#4f473b]">
            Daily Word Categories is a small daily word puzzle about grouping English words by shared meaning,
            phrase pattern, or cultural context.
          </p>
        </header>

        <section className="space-y-4 text-sm leading-6 text-[#4f473b]">
          <p>
            The game is built for people who like compact logic puzzles and for English learners who want more than
            definitions. A board may include ordinary vocabulary, American culture, internet language, sports, school,
            media, startup language, or a phrase trap.
          </p>
          <p>
            The goal is simple: tap four words that belong together, submit the group, and use the feedback to solve
            the board. Hints and answer pages explain the logic so each puzzle can also work as vocabulary practice.
          </p>
          <p>
            This is an independent project. It is not affiliated with The New York Times or any other official word
            game publisher.
          </p>
        </section>

        <section className="rounded-md border border-[#17140f] bg-white p-5 shadow-[6px_6px_0_#17140f]">
          <h2 className="text-lg font-black">What the site includes</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#4f473b]">
            <li>Daily playable word grouping boards.</li>
            <li>Spoiler-light hint pages for current and archived puzzles.</li>
            <li>Answer pages that explain the vocabulary, phrase, or culture logic.</li>
            <li>Evergreen guides for English vocabulary, ESL practice, and American culture word games.</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-md border border-[#17140f] bg-[#17140f] px-4 py-2 text-sm font-bold text-white"
          >
            Play today
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-[#17140f] bg-[#f0c64d] px-4 py-2 text-sm font-bold text-[#17140f]"
          >
            Contact
          </Link>
        </div>
      </section>
    </main>
  );
}
