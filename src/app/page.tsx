"use client";

import { useEffect, useMemo, useState } from "react";
import { getTodaysPuzzle, type Puzzle, type PuzzleGroup } from "@/data/puzzles";

const MAX_MISTAKES = 4;
const REVIVE_CHECKOUT_URL = process.env.NEXT_PUBLIC_REVIVE_CHECKOUT_URL;
const SHARE_URL = "https://daily.alantern.com";
const STREAK_KEY = "daily-word-categories:streak";

type Guess = {
  words: string[];
  correct: boolean;
  groupTitle?: string;
  oneAway?: boolean;
};

type StreakState = {
  lastSolvedDate: string;
  streak: number;
  best: number;
};

const difficultyEmoji: Record<PuzzleGroup["difficulty"], string> = {
  easy: "🟨",
  medium: "🟩",
  hard: "🟦",
  tricky: "🟪",
};

function seededShuffle<T>(items: T[], seedText: string) {
  let seed = 0;
  for (const char of seedText) seed = (seed * 31 + char.charCodeAt(0)) >>> 0;

  return [...items]
    .map((item, index) => {
      seed = (seed * 1664525 + 1013904223 + index) >>> 0;
      return { item, sort: seed };
    })
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function daysBetween(a: string, b: string) {
  const one = Date.parse(`${a}T00:00:00Z`);
  const two = Date.parse(`${b}T00:00:00Z`);
  return Math.round((two - one) / 86_400_000);
}

function isOneAway(puzzle: Puzzle, selected: string[]) {
  return puzzle.groups.some(
    (group) => selected.filter((word) => group.words.includes(word)).length === 3,
  );
}

function makeShareText(puzzle: Puzzle, guesses: Guess[], solved: PuzzleGroup[], mistakes: number, streak: number) {
  const solvedTitles = new Set(solved.map((group) => group.title));
  const rows = guesses.map((guess) => {
    if (!guess.correct || !guess.groupTitle) return guess.oneAway ? "🟧⬜⬜⬜" : "⬜⬜⬜⬜";
    const group = puzzle.groups.find((item) => item.title === guess.groupTitle);
    return (group ? difficultyEmoji[group.difficulty] : "🟩").repeat(4);
  });

  if (solved.length === 4) {
    for (const group of puzzle.groups) {
      if (!solvedTitles.has(group.title)) rows.push(difficultyEmoji[group.difficulty].repeat(4));
    }
  }

  return [
    `Daily Word Categories ${puzzle.id}`,
    `${solved.length}/4 groups · ${mistakes} mistake${mistakes === 1 ? "" : "s"} · ${streak} day streak`,
    rows.join("\n"),
    SHARE_URL,
  ].join("\n");
}

export default function Home() {
  const fallbackPuzzle = useMemo(() => getTodaysPuzzle(), []);
  const [puzzle, setPuzzle] = useState(fallbackPuzzle);
  const [source, setSource] = useState<"daily" | "bonus">("daily");
  const [words, setWords] = useState(() =>
    seededShuffle(fallbackPuzzle.groups.flatMap((group) => group.words), fallbackPuzzle.id),
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState<PuzzleGroup[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [revivesUsed, setRevivesUsed] = useState(0);
  const [streak, setStreak] = useState<StreakState>(() => {
    if (typeof window === "undefined") return { lastSolvedDate: "", streak: 0, best: 0 };

    const stored = window.localStorage.getItem(STREAK_KEY);
    if (!stored) return { lastSolvedDate: "", streak: 0, best: 0 };

    try {
      return JSON.parse(stored) as StreakState;
    } catch {
      window.localStorage.removeItem(STREAK_KEY);
      return { lastSolvedDate: "", streak: 0, best: 0 };
    }
  });
  const [message, setMessage] = useState("Find four words that share a hidden link.");

  useEffect(() => {
    async function loadBonusPuzzle() {
      try {
        const response = await fetch("/api/bonus", { cache: "no-store" });
        if (!response.ok) return;
        const bonus = (await response.json()) as Puzzle;
        if (bonus?.groups?.length === 4) {
          setPuzzle(bonus);
          setSource("bonus");
          setWords(seededShuffle(bonus.groups.flatMap((group) => group.words), bonus.id));
        }
      } catch {
        setSource("daily");
      }
    }

    loadBonusPuzzle();
  }, []);

  const isComplete = solved.length === puzzle.groups.length;
  const isGameOver = mistakes >= MAX_MISTAKES && !isComplete;
  const remainingMistakes = Math.max(0, MAX_MISTAKES - mistakes);
  const shareText = makeShareText(puzzle, guesses, solved, mistakes, streak.streak);

  function recordCompletion() {
    setStreak((current) => {
      if (current.lastSolvedDate === puzzle.date) return current;

      const gap = current.lastSolvedDate ? daysBetween(current.lastSolvedDate, puzzle.date) : 0;
      const nextStreak = gap === 1 ? current.streak + 1 : 1;
      const next = {
        lastSolvedDate: puzzle.date,
        streak: nextStreak,
        best: Math.max(current.best, nextStreak),
      };
      window.localStorage.setItem(STREAK_KEY, JSON.stringify(next));
      return next;
    });
  }

  function toggleWord(word: string) {
    if (isComplete || isGameOver || solved.some((group) => group.words.includes(word))) return;
    setSelected((current) => {
      if (current.includes(word)) return current.filter((item) => item !== word);
      if (current.length === 4) return current;
      return [...current, word];
    });
  }

  function submitGuess() {
    if (selected.length !== 4) {
      setMessage("Select exactly four words.");
      return;
    }

    const matchingGroup = puzzle.groups.find((group) =>
      group.words.every((word) => selected.includes(word)),
    );

    if (matchingGroup) {
      const willComplete = solved.length === puzzle.groups.length - 1;
      setSolved((current) => [...current, matchingGroup]);
      setGuesses((current) => [
        ...current,
        { words: selected, correct: true, groupTitle: matchingGroup.title },
      ]);
      setWords((current) => current.filter((word) => !matchingGroup.words.includes(word)));
      setSelected([]);
      setMessage(`Solved: ${matchingGroup.title}`);
      if (willComplete) recordCompletion();
      return;
    }

    const oneAway = isOneAway(puzzle, selected);
    setGuesses((current) => [...current, { words: selected, correct: false, oneAway }]);
    setMistakes((current) => current + 1);
    setMessage(oneAway ? "One away." : "No match. Try a cleaner connection.");
    setSelected([]);
  }

  function resetPuzzle() {
    setWords(seededShuffle(puzzle.groups.flatMap((group) => group.words), `${puzzle.id}:${Date.now()}`));
    setSelected([]);
    setSolved([]);
    setGuesses([]);
    setMistakes(0);
    setRevivesUsed(0);
    setMessage("Board reset. Look for the cleanest four-word set.");
  }

  function revive() {
    if (REVIVE_CHECKOUT_URL) {
      window.location.href = `${REVIVE_CHECKOUT_URL}?puzzle=${encodeURIComponent(puzzle.id)}`;
      return;
    }

    if (revivesUsed > 0) {
      setMessage("Paid revive checkout is not connected yet.");
      return;
    }

    setRevivesUsed(1);
    setMistakes(MAX_MISTAKES - 1);
    setMessage("Launch promo revive used. Paid $1 revive plugs in here next.");
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(shareText);
      setMessage("Result copied. Drop it on X, Reddit, or your group chat.");
    } catch {
      setMessage("Copy failed. Select the result text manually.");
    }
  }

  function revealPuzzle() {
    setSolved(puzzle.groups);
    setWords([]);
    setSelected([]);
    setMessage("Full answer revealed.");
  }

  return (
    <main className="min-h-screen bg-[#f7f4ec] text-[#17140f]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d2a221f] pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8d3f2b]">
              Daily Word Categories
            </p>
            <h1 className="mt-1 text-3xl font-black tracking-normal sm:text-5xl">
              Group the hidden American links.
            </h1>
          </div>
          <div className="rounded-md border border-[#17140f] bg-[#f0c64d] px-4 py-3 text-sm font-bold shadow-[4px_4px_0_#17140f]">
            {source === "bonus" ? "Hot Bonus" : "Static Daily"}
            <span className="ml-3 font-mono text-xs">{puzzle.edition}</span>
          </div>
        </header>

        <div className="grid flex-1 gap-6 py-6 lg:grid-cols-[1fr_320px]">
          <section className="flex flex-col gap-4">
            <div className="rounded-md border border-[#17140f] bg-white p-4 shadow-[6px_6px_0_#17140f]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#6c6254]">{puzzle.theme}</p>
                  <p className="mt-1 text-sm">{message}</p>
                </div>
                <div className="flex gap-1" aria-label={`${remainingMistakes} mistakes remaining`}>
                  {Array.from({ length: MAX_MISTAKES }).map((_, index) => (
                    <span
                      key={index}
                      className={`h-3 w-7 rounded-sm border border-[#17140f] ${
                        index < remainingMistakes ? "bg-[#4d8b6f]" : "bg-[#d95d45]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {solved.map((group) => (
                <article
                  key={group.title}
                  className="rounded-md border border-[#17140f] bg-[#b7d4c7] p-4 text-center shadow-[4px_4px_0_#17140f]"
                >
                  <h2 className="text-lg font-black uppercase">{group.title}</h2>
                  <p className="mt-1 font-mono text-sm">{group.words.join(" / ")}</p>
                </article>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {words.map((word) => {
                const active = selected.includes(word);
                return (
                  <button
                    key={word}
                    type="button"
                    onClick={() => toggleWord(word)}
                    className={`aspect-[1.55] rounded-md border border-[#17140f] px-2 text-sm font-black transition sm:text-base ${
                      active
                        ? "translate-x-1 translate-y-1 bg-[#17140f] text-white shadow-none"
                        : "bg-[#fffdf7] shadow-[3px_3px_0_#17140f] hover:-translate-y-0.5 hover:bg-[#f0c64d]"
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setWords(seededShuffle(words, `${puzzle.id}:${guesses.length}:${selected.join("")}`))}
                className="rounded-md border border-[#17140f] bg-white px-4 py-2 font-bold shadow-[3px_3px_0_#17140f]"
              >
                Shuffle
              </button>
              <button
                type="button"
                onClick={submitGuess}
                disabled={selected.length !== 4 || isComplete || isGameOver}
                className="rounded-md border border-[#17140f] bg-[#17140f] px-5 py-2 font-bold text-white shadow-[3px_3px_0_#8d3f2b] disabled:cursor-not-allowed disabled:bg-[#9c978d]"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={resetPuzzle}
                className="rounded-md border border-[#17140f] bg-white px-4 py-2 font-bold shadow-[3px_3px_0_#17140f]"
              >
                Reset
              </button>
            </div>

            {(isComplete || isGameOver) && (
              <div className="rounded-md border border-[#17140f] bg-[#17140f] p-4 text-white shadow-[6px_6px_0_#8d3f2b]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black">
                      {isComplete ? "Share your board" : "Almost had it?"}
                    </h2>
                    <p className="mt-1 text-sm text-[#efe5d1]">
                      {isComplete
                        ? "Copy the spoiler-free grid and make people ask what it means."
                        : "Buy one more guess or reveal the board."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={copyResult}
                    className="rounded-md border border-white bg-[#f0c64d] px-4 py-2 font-black text-[#17140f]"
                  >
                    Copy result
                  </button>
                </div>
                <pre className="mt-4 overflow-auto whitespace-pre-wrap rounded-md bg-black/30 p-3 font-mono text-xs leading-5">
                  {shareText}
                </pre>
              </div>
            )}
          </section>

          <aside className="rounded-md border border-[#17140f] bg-[#fffdf7] p-5 shadow-[6px_6px_0_#17140f]">
            <h2 className="text-xl font-black">Playbook</h2>
            <p className="mt-3 text-sm leading-6 text-[#4f473b]">
              Four groups. Four words each. Some links are plain English, some are culture,
              media, startup, sports, or phrase traps built for US readers.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-md border border-[#17140f] bg-[#f0c64d] p-3">
                <p className="text-xs font-bold uppercase">Streak</p>
                <p className="text-3xl font-black">{streak.streak}</p>
              </div>
              <div className="rounded-md border border-[#17140f] bg-[#b7d4c7] p-3">
                <p className="text-xs font-bold uppercase">Best</p>
                <p className="text-3xl font-black">{streak.best}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {puzzle.groups.map((group) => (
                <div key={group.title} className="flex items-center justify-between border-t border-[#17140f1f] pt-3">
                  <span className="text-sm font-bold">{difficultyEmoji[group.difficulty]} {group.difficulty}</span>
                  <span className="text-xs uppercase tracking-[0.14em] text-[#8d3f2b]">
                    {solved.includes(group) || isGameOver ? group.title : "hidden"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-md border border-dashed border-[#17140f] bg-[#f7f4ec] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8d3f2b]">Sponsor slot</p>
              <p className="mt-2 text-sm font-bold">Your app, newsletter, or vocabulary course here.</p>
              <p className="mt-1 text-xs text-[#6c6254]">Launch ad inventory reserved for the first traffic test.</p>
            </div>

            {isComplete && (
              <div className="mt-6 rounded-md bg-[#4d8b6f] p-4 font-bold text-white">
                Perfect board. Come back tomorrow to protect your streak.
              </div>
            )}
            {isGameOver && (
              <div className="mt-6 grid gap-3">
                <button
                  type="button"
                  onClick={revive}
                  className="w-full rounded-md border border-[#17140f] bg-[#f0c64d] px-4 py-3 font-black text-[#17140f] shadow-[3px_3px_0_#17140f]"
                >
                  $1 Revive
                </button>
                <button
                  type="button"
                  onClick={revealPuzzle}
                  className="w-full rounded-md border border-[#17140f] bg-[#d95d45] px-4 py-3 font-black text-white shadow-[3px_3px_0_#17140f]"
                >
                  Reveal answers
                </button>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
