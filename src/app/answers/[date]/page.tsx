import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnswersPageShell } from "@/components/puzzle-page-shell";
import { buildPageDescription, buildPageTitle, getKnownPuzzleDates, getPuzzleForDateSlug } from "@/lib/puzzle-access";
import { getAnswerRows } from "@/data/puzzles";

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
    title: buildPageTitle("answers", puzzle),
    description: buildPageDescription("answers", puzzle),
    alternates: {
      canonical: `/answers/${puzzle.date}`,
    },
    openGraph: {
      title: buildPageTitle("answers", puzzle),
      description: buildPageDescription("answers", puzzle),
      url: `https://daily.alantern.com/answers/${puzzle.date}`,
      siteName: "Daily Word Categories",
      type: "article",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { date } = await params;
  const puzzle = getPuzzleForDateSlug(date);
  if (!puzzle) notFound();

  return <AnswersPageShell puzzle={puzzle} rows={getAnswerRows(puzzle)} />;
}
