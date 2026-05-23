import type { Metadata } from "next";
import { HintsPageShell } from "@/components/puzzle-page-shell";
import { buildPageDescription, buildPageTitle } from "@/lib/puzzle-access";
import { getHintRows, getTodaysPuzzle } from "@/data/puzzles";

export async function generateMetadata(): Promise<Metadata> {
  const puzzle = getTodaysPuzzle();
  return {
    title: buildPageTitle("hints", puzzle),
    description: buildPageDescription("hints", puzzle),
    alternates: {
      canonical: "/hints/today",
    },
    openGraph: {
      title: buildPageTitle("hints", puzzle),
      description: buildPageDescription("hints", puzzle),
      url: "https://daily.alantern.com/hints/today",
      siteName: "Daily Word Categories",
      type: "article",
    },
  };
}

export default function Page() {
  const puzzle = getTodaysPuzzle();
  return <HintsPageShell puzzle={puzzle} rows={getHintRows(puzzle)} />;
}
