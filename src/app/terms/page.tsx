import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms | Daily Word Categories",
  description: "Terms of use for Daily Word Categories.",
  alternates: {
    canonical: "/terms",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f7f4ec] px-4 py-8 text-[#17140f] sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <header className="border-b border-[#17140f1f] pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d3f2b]">Terms</p>
          <h1 className="mt-2 text-3xl font-black sm:text-5xl">Terms of Use</h1>
        </header>
        <div className="space-y-4 text-sm leading-6 text-[#4f473b]">
          <p>Use this site for personal, educational, and entertainment purposes.</p>
          <p>
            The game content, hints, and explanations are provided as-is. We may change puzzles, wording, difficulty,
            or availability at any time.
          </p>
          <p>
            Do not assume payment features are live unless the site explicitly says so. Do not treat test links as
            production checkout.
          </p>
        </div>
        <Link href="/" className="text-sm font-bold text-[#8d3f2b] hover:underline">
          Back to the puzzle
        </Link>
      </section>
    </main>
  );
}
