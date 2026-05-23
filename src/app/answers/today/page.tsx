import type { Metadata } from "next";
import { AnswersPageShell } from "@/components/puzzle-page-shell";
import { buildPageDescription, buildPageTitle } from "@/lib/puzzle-access";
import { getAnswerRows, getTodaysPuzzle } from "@/data/puzzles";

export async function generateMetadata(): Promise<Metadata> {
  const puzzle = getTodaysPuzzle();
  return {
    title: buildPageTitle("answers", puzzle),
    description: buildPageDescription("answers", puzzle),
    alternates: {
      canonical: "/answers/today",
    },
    openGraph: {
      title: buildPageTitle("answers", puzzle),
      description: buildPageDescription("answers", puzzle),
      url: "https://daily.alantern.com/answers/today",
      siteName: "Daily Word Categories",
      type: "article",
    },
  };
}

export default function Page() {
  const puzzle = getTodaysPuzzle();
  return <AnswersPageShell puzzle={puzzle} rows={getAnswerRows(puzzle)} />;
}
