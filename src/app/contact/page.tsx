import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Daily Word Categories",
  description: "Contact Daily Word Categories.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f7f4ec] px-4 py-8 text-[#17140f] sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <header className="border-b border-[#17140f1f] pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d3f2b]">Contact</p>
          <h1 className="mt-2 text-3xl font-black sm:text-5xl">Contact</h1>
        </header>
        <div className="space-y-4 text-sm leading-6 text-[#4f473b]">
          <p>
            For feedback, bugs, or partnership questions, use GitHub issues on the project repo or reach out through
            the project owner account.
          </p>
          <p>
            GitHub:{" "}
            <a
              className="font-bold text-[#8d3f2b] hover:underline"
              href="https://github.com/aDragon0707/daily-word-categories"
            >
              aDragon0707/daily-word-categories
            </a>
          </p>
        </div>
        <Link href="/" className="text-sm font-bold text-[#8d3f2b] hover:underline">
          Back to the puzzle
        </Link>
      </section>
    </main>
  );
}
