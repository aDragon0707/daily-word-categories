import Link from "next/link";
import type { ReactNode } from "react";

type SeoLandingShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  angle: string;
  audience: string;
  howToPlay?: string[];
  practiceAreas?: Array<{ title: string; body: string }>;
  exampleGroups?: Array<{ title: string; words: string[]; note: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  ctaHref: string;
  ctaLabel: string;
  related: Array<{ href: string; label: string }>;
  children: ReactNode;
};

export function SeoLandingShell({
  eyebrow,
  title,
  intro,
  angle,
  audience,
  howToPlay = [
    "Read the 16-word board.",
    "Tap four words that seem connected.",
    "Submit your guess and use the feedback to find all four groups.",
  ],
  practiceAreas = [],
  exampleGroups = [],
  faqs = [],
  ctaHref,
  ctaLabel,
  related,
  children,
}: SeoLandingShellProps) {
  return (
    <main className="min-h-screen bg-[#f7f4ec] text-[#17140f]">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="border-b border-[#2d2a221f] pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8d3f2b]">{eyebrow}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#4f473b]">{intro}</p>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-md border border-[#17140f] bg-white p-5 shadow-[6px_6px_0_#17140f]">
            <h2 className="text-lg font-black">Why it works</h2>
            <p className="mt-3 text-sm leading-6 text-[#4f473b]">{angle}</p>
            <p className="mt-4 text-sm leading-6 text-[#4f473b]">{audience}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={ctaHref}
                className="rounded-md border border-[#17140f] bg-[#17140f] px-4 py-2 text-sm font-bold text-white"
              >
                {ctaLabel}
              </Link>
              <Link
                href="/"
                className="rounded-md border border-[#17140f] bg-[#f0c64d] px-4 py-2 text-sm font-bold text-[#17140f]"
              >
                Play puzzle
              </Link>
            </div>
          </article>

          <aside className="rounded-md border border-[#17140f] bg-[#b7d4c7] p-5 shadow-[6px_6px_0_#17140f]">
            <h2 className="text-lg font-black">Who it&apos;s for</h2>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#2f2a23]">{children}</ul>
          </aside>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-md border border-[#17140f] bg-[#f0c64d] p-5 shadow-[6px_6px_0_#17140f]">
            <h2 className="text-lg font-black">How to play</h2>
            <ol className="mt-3 grid gap-3 text-sm leading-6 text-[#2f2a23]">
              {howToPlay.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-[#17140f] bg-[#fffdf7] font-black">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-md border border-[#17140f] bg-white p-5 shadow-[6px_6px_0_#17140f]">
            <h2 className="text-lg font-black">What you practice</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(practiceAreas.length ? practiceAreas : [
                {
                  title: "Category logic",
                  body: "Look for shared usage, not just dictionary definitions.",
                },
                {
                  title: "Phrase patterns",
                  body: "Some answers depend on words that combine into familiar expressions.",
                },
              ]).map((item) => (
                <div key={item.title} className="rounded-md border border-[#17140f1f] bg-[#fffdf7] p-4">
                  <h3 className="font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4f473b]">{item.body}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        {exampleGroups.length > 0 && (
          <section className="rounded-md border border-[#17140f] bg-[#fffdf7] p-5 shadow-[6px_6px_0_#17140f]">
            <h2 className="text-lg font-black">Example clues</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#4f473b]">
              These examples show the kind of American culture and phrase logic the daily boards use.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {exampleGroups.map((group) => (
                <article key={group.title} className="rounded-md border border-[#17140f] bg-white p-4">
                  <h3 className="font-black">{group.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.words.map((word) => (
                      <span
                        key={word}
                        className="rounded-sm border border-[#17140f] bg-[#f7f4ec] px-2 py-1 text-xs font-black"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#4f473b]">{group.note}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="rounded-md border border-[#17140f] bg-white p-5 shadow-[6px_6px_0_#17140f]">
            <h2 className="text-lg font-black">FAQ</h2>
            <div className="mt-3 grid gap-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="border-t border-[#17140f1f] pt-4">
                  <h3 className="font-black">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4f473b]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-md border border-[#17140f] bg-[#fffdf7] p-5 shadow-[6px_6px_0_#17140f]">
          <h2 className="text-lg font-black">Related pages</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md border border-[#17140f] bg-white px-3 py-2 text-sm font-bold"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
