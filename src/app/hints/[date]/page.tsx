import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HintsPageShell } from "@/components/puzzle-page-shell";
import { buildPageDescription, buildPageTitle, getKnownPuzzleDates, getPuzzleForDateSlug } from "@/lib/puzzle-access";
import { getHintRows } from "@/data/puzzles";

type PageProps = {
  params: Promise<{ date: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getKnownPuzzleDates().map((date) => ({ date }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;
  const puzzle = getPuzzleForDateSlug(date);
  if (!puzzle) return {};

  return {
    title: buildPageTitle("hints", puzzle),
    description: buildPageDescription("hints", puzzle),
    alternates: {
      canonical: `/hints/${puzzle.date}`,
    },
    openGraph: {
      title: buildPageTitle("hints", puzzle),
      description: buildPageDescription("hints", puzzle),
      url: `https://daily.alantern.com/hints/${puzzle.date}`,
      siteName: "Daily Word Categories",
      type: "article",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { date } = await params;
  const puzzle = getPuzzleForDateSlug(date);
  if (!puzzle) notFound();

  return <HintsPageShell puzzle={puzzle} rows={getHintRows(puzzle)} />;
}
