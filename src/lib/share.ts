type ShareDifficulty = "easy" | "medium" | "hard" | "tricky";

type ShareGroup = {
  title: string;
  difficulty: ShareDifficulty;
  words: string[];
};

type SharePuzzle = {
  id: string;
  groups: ShareGroup[];
};

type ShareGuess = {
  correct: boolean;
  groupTitle?: string;
  oneAway?: boolean;
};

const difficultyEmoji: Record<ShareDifficulty, string> = {
  easy: "\u{1F7E8}",
  medium: "\u{1F7E9}",
  hard: "\u{1F7E6}",
  tricky: "\u{1F7EA}",
};

const oneAwayRow = "\u{1F7E7}\u2B1C\u2B1C\u2B1C";
const missRow = "\u2B1C\u2B1C\u2B1C\u2B1C";

export function makeShareText(
  puzzle: SharePuzzle,
  guesses: ShareGuess[],
  solved: ShareGroup[],
  mistakes: number,
  streak: number,
  shareUrl = "https://daily.alantern.com",
) {
  const solvedTitles = new Set(solved.map((group) => group.title));
  const rows = guesses.map((guess) => {
    if (!guess.correct || !guess.groupTitle) return guess.oneAway ? oneAwayRow : missRow;
    const group = puzzle.groups.find((item) => item.title === guess.groupTitle);
    return (group ? difficultyEmoji[group.difficulty] : difficultyEmoji.medium).repeat(4);
  });

  if (solved.length === 4) {
    for (const group of puzzle.groups) {
      if (!solvedTitles.has(group.title)) rows.push(difficultyEmoji[group.difficulty].repeat(4));
    }
  }

  return [
    `Daily Word Categories | ${puzzle.id}`,
    `Solved ${solved.length}/4 | ${mistakes} mistake${mistakes === 1 ? "" : "s"} | ${streak} day streak`,
    rows.join("\n"),
    `Play today's puzzle: ${shareUrl}`,
  ].join("\n");
}
