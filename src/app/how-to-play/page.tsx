import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Play | Daily Word Categories",
  description:
    "Learn how to play Daily Word Categories, including selecting words, submitting groups, using mistakes, and reading hints.",
  alternates: {
    canonical: "/how-to-play",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f7f4ec] px-4 py-8 text-[#17140f] sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="border-b border-[#17140f1f] pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d3f2b]">Rules</p>
          <h1 className="mt-2 text-3xl font-black sm:text-5xl">How to play Daily Word Categories</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[#4f473b]">
            Group 16 words into 4 hidden categories. Each category has exactly 4 words, and some connections depend
            on American culture, phrases, media, sports, school, work, or internet language.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "1. Pick four words",
              body: "Tap words that seem to share a setting, phrase pattern, topic, or cultural reference.",
            },
            {
              title: "2. Submit the group",
              body: "A correct guess locks in. A wrong guess costs one mistake and sends you back to the board.",
            },
            {
              title: "3. Solve all groups",
              body: "Use the solved groups and remaining words to find the hidden structure of the puzzle.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-md border border-[#17140f] bg-white p-5 shadow-[6px_6px_0_#17140f]">
              <h2 className="font-black">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#4f473b]">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="rounded-md border border-[#17140f] bg-[#f0c64d] p-5 shadow-[6px_6px_0_#17140f]">
          <h2 className="text-lg font-black">What counts as a connection?</h2>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-[#2f2a23] md:grid-cols-2">
            <p>Some groups are direct categories, such as coffee orders, road signs, keyboard keys, or film genres.</p>
            <p>
              Other groups are phrase traps. For example, words like TAKE, SAUCE, DOG, and SPOT can all follow
              &quot;hot&quot;.
            </p>
          </div>
        </section>

        <section className="rounded-md border border-[#17140f] bg-white p-5 shadow-[6px_6px_0_#17140f]">
          <h2 className="text-lg font-black">Tips for better guesses</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#4f473b]">
            <li>Look for words from the same place: a cafe, classroom, browser, ballpark, or streaming app.</li>
            <li>Check whether a shared word can come before every answer, such as cold, hot, paper, rest, or class.</li>
            <li>Do not force a group just because two words match. You need all four words to fit cleanly.</li>
            <li>If you get stuck, use the hint page before opening the full answer page.</li>
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
            href="/hints/today"
            className="rounded-md border border-[#17140f] bg-white px-4 py-2 text-sm font-bold text-[#17140f]"
          >
            Get a hint
          </Link>
          <Link
            href="/answers/today"
            className="rounded-md border border-[#17140f] bg-[#b7d4c7] px-4 py-2 text-sm font-bold text-[#17140f]"
          >
            See answers
          </Link>
        </div>
      </section>
    </main>
  );
}
