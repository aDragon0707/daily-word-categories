import { formatPuzzleDate, getPuzzleByDate, getPuzzleDates, getTodaysPuzzle, type Puzzle } from "@/data/puzzles";

export function getPuzzleForDateSlug(dateSlug: string) {
  if (dateSlug === "today") return getTodaysPuzzle();
  return getPuzzleByDate(dateSlug);
}

export function getKnownPuzzleDates() {
  return getPuzzleDates();
}

export function buildPageTitle(mode: "hints" | "answers", puzzle: Puzzle) {
  return `Daily Word Categories ${mode === "hints" ? "Hints" : "Answers"} for ${formatPuzzleDate(puzzle.date)}`;
}

export function buildPageDescription(mode: "hints" | "answers", puzzle: Puzzle) {
  return mode === "hints"
    ? `Four spoiler-light hints for the Daily Word Categories puzzle on ${formatPuzzleDate(puzzle.date)}.`
    : `The full answer key for the Daily Word Categories puzzle on ${formatPuzzleDate(puzzle.date)}.`;
}
