export type PuzzleGroup = {
  title: string;
  words: string[];
  difficulty: "easy" | "medium" | "hard" | "tricky";
};

export type Puzzle = {
  id: string;
  date: string;
  edition: string;
  theme: string;
  groups: PuzzleGroup[];
};

export const puzzles: Puzzle[] = [
  {
    id: "2026-05-23",
    date: "2026-05-23",
    edition: "Launch Pack 001",
    theme: "Coffee, code, and American weekends",
    groups: [
      { title: "Coffee orders", difficulty: "easy", words: ["LATTE", "MOCHA", "CORTADO", "AMERICANO"] },
      { title: "Baseball words", difficulty: "medium", words: ["DIAMOND", "DUGOUT", "INNING", "PITCH"] },
      { title: "Startup verbs", difficulty: "hard", words: ["PIVOT", "SHIP", "SCALE", "RAISE"] },
      { title: "Can follow 'cold'", difficulty: "tricky", words: ["BREW", "CALL", "OPEN", "WAR"] },
    ],
  },
  {
    id: "2026-05-24",
    date: "2026-05-24",
    edition: "Launch Pack 002",
    theme: "Streaming night",
    groups: [
      { title: "TV remote buttons", difficulty: "easy", words: ["PLAY", "PAUSE", "MUTE", "REWIND"] },
      { title: "Film genres", difficulty: "medium", words: ["NOIR", "WESTERN", "HORROR", "ROMCOM"] },
      { title: "Subscription tiers", difficulty: "hard", words: ["BASIC", "PLUS", "PREMIUM", "FAMILY"] },
      { title: "Can follow 'screen'", difficulty: "tricky", words: ["SHOT", "TIME", "PLAY", "SAVER"] },
    ],
  },
  {
    id: "2026-05-25",
    date: "2026-05-25",
    edition: "Launch Pack 003",
    theme: "Office folklore",
    groups: [
      { title: "Meeting phrases", difficulty: "easy", words: ["AGENDA", "MINUTES", "ACTION", "FOLLOWUP"] },
      { title: "Keyboard keys", difficulty: "medium", words: ["SHIFT", "OPTION", "RETURN", "ESCAPE"] },
      { title: "Things in a break room", difficulty: "hard", words: ["MUG", "KETTLE", "SNACKS", "NAPKINS"] },
      { title: "Can follow 'paper'", difficulty: "tricky", words: ["TRAIL", "CLIP", "CUT", "PLANE"] },
    ],
  },
  {
    id: "2026-05-26",
    date: "2026-05-26",
    edition: "Launch Pack 004",
    theme: "Internet native",
    groups: [
      { title: "Social actions", difficulty: "easy", words: ["LIKE", "SHARE", "POST", "REPLY"] },
      { title: "Meme formats", difficulty: "medium", words: ["CAPTION", "TEMPLATE", "REACTION", "REMIX"] },
      { title: "Browser parts", difficulty: "hard", words: ["TAB", "CACHE", "COOKIE", "HISTORY"] },
      { title: "Can follow 'hot'", difficulty: "tricky", words: ["TAKE", "SAUCE", "DOG", "SPOT"] },
    ],
  },
  {
    id: "2026-05-27",
    date: "2026-05-27",
    edition: "Launch Pack 005",
    theme: "Cross-country road trip",
    groups: [
      { title: "Road signs", difficulty: "easy", words: ["YIELD", "MERGE", "STOP", "DETOUR"] },
      { title: "Gas station buys", difficulty: "medium", words: ["CHIPS", "SODA", "GUM", "JERKY"] },
      { title: "National parks", difficulty: "hard", words: ["ZION", "YOSEMITE", "ACADIA", "OLYMPIC"] },
      { title: "Can follow 'rest'", difficulty: "tricky", words: ["AREA", "STOP", "ROOM", "EASY"] },
    ],
  },
  {
    id: "2026-05-28",
    date: "2026-05-28",
    edition: "Launch Pack 006",
    theme: "Campus energy",
    groups: [
      { title: "School supplies", difficulty: "easy", words: ["PENCIL", "BINDER", "ERASER", "HIGHLIGHTER"] },
      { title: "College majors", difficulty: "medium", words: ["ECON", "BIOLOGY", "HISTORY", "DESIGN"] },
      { title: "Library zones", difficulty: "hard", words: ["STACKS", "CARREL", "ARCHIVE", "DESK"] },
      { title: "Can follow 'class'", difficulty: "tricky", words: ["MATE", "ROOM", "ACTION", "IC"] },
    ],
  },
  {
    id: "2026-05-29",
    date: "2026-05-29",
    edition: "Launch Pack 007",
    theme: "Fitness and wellness",
    groups: [
      { title: "Gym equipment", difficulty: "easy", words: ["TREADMILL", "DUMBBELL", "MAT", "BIKE"] },
      { title: "Workout moves", difficulty: "medium", words: ["LUNGE", "PLANK", "SQUAT", "BURPEE"] },
      { title: "Wellness app metrics", difficulty: "hard", words: ["STEPS", "SLEEP", "HEART", "CALORIES"] },
      { title: "Can follow 'green'", difficulty: "tricky", words: ["TEA", "LIGHT", "ROOM", "SCREEN"] },
    ],
  },
];

export function getTodaysPuzzle(date = new Date()): Puzzle {
  const start = Date.UTC(2026, 4, 23);
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const days = Math.max(0, Math.floor((today - start) / 86_400_000));
  return puzzles[days % puzzles.length];
}
