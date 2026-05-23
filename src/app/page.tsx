"use client";

import { useEffect, useMemo, useState } from "react";
import { getTodaysPuzzle, type Puzzle, type PuzzleGroup } from "@/data/puzzles";

const MAX_MISTAKES = 4;

function shuffle<T>(items: T[]) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function groupForWord(puzzle: Puzzle, word: string) {
  return puzzle.groups.find((group) => group.words.includes(word));
}

export default function Home() {
  const fallbackPuzzle = useMemo(() => getTodaysPuzzle(), []);
  const [puzzle, setPuzzle] = useState(fallbackPuzzle);
  const [source, setSource] = useState<"daily" | "bonus">("daily");
  const [words, setWords] = useState(() => shuffle(fallbackPuzzle.groups.flatMap((group) => group.words)));
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState<PuzzleGroup[]>([]);
  const [mistakes, setMistakes] = useState(0);
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
          setWords(shuffle(bonus.groups.flatMap((group) => group.words)));
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
      setSolved((current) => [...current, matchingGroup]);
      setWords((current) => current.filter((word) => !matchingGroup.words.includes(word)));
      setSelected([]);
      setMessage(`Solved: ${matchingGroup.title}`);
      return;
    }

    const groupsTouched = new Set(selected.map((word) => groupForWord(puzzle, word)?.title));
    setMistakes((current) => current + 1);
    setMessage(groupsTouched.size === 2 ? "One away." : "No match. Try a cleaner connection.");
    setSelected([]);
  }

  function resetPuzzle() {
    setWords(shuffle(puzzle.groups.flatMap((group) => group.words)));
    setSelected([]);
    setSolved([]);
    setMistakes(0);
    setMessage("Board reset. Look for the cleanest four-word set.");
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
                onClick={() => setWords(shuffle(words))}
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
          </section>

          <aside className="rounded-md border border-[#17140f] bg-[#fffdf7] p-5 shadow-[6px_6px_0_#17140f]">
            <h2 className="text-xl font-black">Playbook</h2>
            <p className="mt-3 text-sm leading-6 text-[#4f473b]">
              Four groups. Four words each. Some links are plain English, some are culture,
              media, startup, sports, or phrase traps built for US readers.
            </p>

            <div className="mt-6 grid gap-3">
              {puzzle.groups.map((group) => (
                <div key={group.title} className="flex items-center justify-between border-t border-[#17140f1f] pt-3">
                  <span className="text-sm font-bold">{group.difficulty}</span>
                  <span className="text-xs uppercase tracking-[0.14em] text-[#8d3f2b]">
                    {solved.includes(group) || isGameOver ? group.title : "hidden"}
                  </span>
                </div>
              ))}
            </div>

            {isComplete && (
              <div className="mt-6 rounded-md bg-[#4d8b6f] p-4 font-bold text-white">
                Perfect board. Come back tomorrow for a fresh set.
              </div>
            )}
            {isGameOver && (
              <button
                type="button"
                onClick={revealPuzzle}
                className="mt-6 w-full rounded-md border border-[#17140f] bg-[#d95d45] px-4 py-3 font-black text-white shadow-[3px_3px_0_#17140f]"
              >
                Reveal answers
              </button>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
