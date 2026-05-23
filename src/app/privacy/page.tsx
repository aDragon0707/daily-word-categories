import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Daily Word Categories",
  description: "Privacy policy for Daily Word Categories.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f7f4ec] px-4 py-8 text-[#17140f] sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <header className="border-b border-[#17140f1f] pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d3f2b]">Privacy</p>
          <h1 className="mt-2 text-3xl font-black sm:text-5xl">Privacy Policy</h1>
        </header>
        <div className="space-y-4 text-sm leading-6 text-[#4f473b]">
          <p>Daily Word Categories is a public puzzle site. We keep this policy short and plain.</p>
          <p>
            The site may use standard web server logs and browser storage to keep the game working, remember streaks,
            and understand basic usage. We do not claim any ad, analytics, or payment provider is live unless the site
            says so explicitly.
          </p>
          <p>
            If analytics, ads, or other tracking tools are added later, this page will be updated to match the actual
            setup.
          </p>
        </div>
        <Link href="/" className="text-sm font-bold text-[#8d3f2b] hover:underline">
          Back to the puzzle
        </Link>
      </section>
    </main>
  );
}
