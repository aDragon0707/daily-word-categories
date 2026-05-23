import Link from "next/link";
import type { ReactNode } from "react";

type SeoLandingShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  angle: string;
  audience: string;
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
