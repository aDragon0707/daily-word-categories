import type { Puzzle } from "@/data/puzzles";

type HintRow = {
  id: string;
  title: string;
  hint: string;
};

type AnswerRow = {
  title: string;
  words: string[];
  explanation: string;
  difficulty: string;
};

export function HintsPageShell({ puzzle, rows }: { puzzle: Puzzle; rows: HintRow[] }) {
  return (
    <main className="min-h-screen bg-[#f7f4ec] px-4 py-8 text-[#17140f] sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="space-y-3 border-b border-[#17140f1f] pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d3f2b]">Hints</p>
          <h1 className="text-3xl font-black sm:text-5xl">Daily Word Categories hints for {puzzle.date}</h1>
          <p className="max-w-2xl text-sm leading-6 text-[#4f473b]">
            Four spoiler-light clues. Enough to help, not enough to spoil the board up front.
          </p>
        </header>

        <div className="grid gap-3">
          {rows.map((row, index) => (
            <article key={row.id} className="rounded-md border border-[#17140f] bg-white p-4 shadow-[4px_4px_0_#17140f]">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#17140f] bg-[#f0c64d] text-xs font-black">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg font-black">Hint {index + 1}</h2>
                  <p className="mt-1 text-sm leading-6 text-[#4f473b]">{row.hint}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-[#17140f1f] pt-4">
          <a
            href="https://daily.alantern.com"
            className="rounded-md border border-[#17140f] bg-[#17140f] px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0_#8d3f2b]"
          >
            Play today
          </a>
          <a
            href={`/answers/${puzzle.date}`}
            className="rounded-md border border-[#17140f] bg-white px-4 py-2 text-sm font-bold shadow-[3px_3px_0_#17140f]"
          >
            See answers
          </a>
        </div>
      </section>
    </main>
  );
}

export function AnswersPageShell({ puzzle, rows }: { puzzle: Puzzle; rows: AnswerRow[] }) {
  return (
    <main className="min-h-screen bg-[#f7f4ec] px-4 py-8 text-[#17140f] sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="space-y-3 border-b border-[#17140f1f] pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d3f2b]">Answers</p>
          <h1 className="text-3xl font-black sm:text-5xl">Daily Word Categories answers for {puzzle.date}</h1>
          <p className="max-w-2xl text-sm leading-6 text-[#4f473b]">
            Full category names, the four words in each group, and a short explanation of the logic.
          </p>
        </header>

        <div className="grid gap-3">
          {rows.map((row) => (
            <article key={row.title} className="rounded-md border border-[#17140f] bg-white p-4 shadow-[4px_4px_0_#17140f]">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-black">{row.title}</h2>
                  <span className="rounded-full border border-[#17140f] bg-[#b7d4c7] px-3 py-1 text-xs font-bold uppercase">
                    {row.difficulty}
                  </span>
                </div>
                <p className="text-sm font-mono tracking-wide">{row.words.join(" / ")}</p>
                <p className="text-sm leading-6 text-[#4f473b]">{row.explanation}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-[#17140f1f] pt-4">
          <a
            href="https://daily.alantern.com"
            className="rounded-md border border-[#17140f] bg-[#17140f] px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0_#8d3f2b]"
          >
            Play today
          </a>
          <a
            href={`/hints/${puzzle.date}`}
            className="rounded-md border border-[#17140f] bg-white px-4 py-2 text-sm font-bold shadow-[3px_3px_0_#17140f]"
          >
            Back to hints
          </a>
        </div>
      </section>
    </main>
  );
}
