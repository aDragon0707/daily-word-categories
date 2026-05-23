export type PuzzleGroup = {
  title: string;
  words: string[];
  difficulty: "easy" | "medium" | "hard" | "tricky";
  hint: string;
  explanation: string;
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
      {
        title: "Coffee orders",
        difficulty: "easy",
        words: ["LATTE", "MOCHA", "CORTADO", "AMERICANO"],
        hint: "These are espresso drinks you could order at a cafe.",
        explanation: "Common American coffeehouse drinks built from espresso and milk.",
      },
      {
        title: "Baseball words",
        difficulty: "medium",
        words: ["DIAMOND", "DUGOUT", "INNING", "PITCH"],
        hint: "You hear these terms all around a ballpark broadcast.",
        explanation: "Classic baseball vocabulary for the field, dugout, innings, and pitching.",
      },
      {
        title: "Startup verbs",
        difficulty: "hard",
        words: ["PIVOT", "SHIP", "SCALE", "RAISE"],
        hint: "These actions show up in pitch decks and founder talk.",
        explanation: "Startup slang for changing direction, launching, growing, and fundraising.",
      },
      {
        title: "Can follow 'cold'",
        difficulty: "tricky",
        words: ["BREW", "CALL", "OPEN", "WAR"],
        hint: "Each word can sit after a temperature word to make a common phrase.",
        explanation: "They complete familiar expressions like cold brew, cold call, and cold war.",
      },
    ],
  },
  {
    id: "2026-05-24",
    date: "2026-05-24",
    edition: "Launch Pack 002",
    theme: "Streaming night",
    groups: [
      {
        title: "TV remote buttons",
        difficulty: "easy",
        words: ["PLAY", "PAUSE", "MUTE", "REWIND"],
        hint: "These are buttons you would expect on a standard remote.",
        explanation: "Everyday TV controls used on remotes and streaming devices.",
      },
      {
        title: "Film genres",
        difficulty: "medium",
        words: ["NOIR", "WESTERN", "HORROR", "ROMCOM"],
        hint: "These are labels you might see in a movie app or guide.",
        explanation: "Well-known film categories that tell you the style of a movie.",
      },
      {
        title: "Subscription tiers",
        difficulty: "hard",
        words: ["BASIC", "PLUS", "PREMIUM", "FAMILY"],
        hint: "These sound like pricing names on a paid app.",
        explanation: "Common plan labels used to separate basic, upgraded, and family tiers.",
      },
      {
        title: "Can follow 'screen'",
        difficulty: "tricky",
        words: ["SHOT", "TIME", "PLAY", "SAVER"],
        hint: "Each word can follow a screen-related word to make a familiar phrase.",
        explanation: "They form compounds such as screenshot, screen time, screen play, and screensaver.",
      },
    ],
  },
  {
    id: "2026-05-25",
    date: "2026-05-25",
    edition: "Launch Pack 003",
    theme: "Office folklore",
    groups: [
      {
        title: "Meeting phrases",
        difficulty: "easy",
        words: ["AGENDA", "MINUTES", "ACTION", "FOLLOWUP"],
        hint: "These belong in an office calendar invite or Slack thread.",
        explanation: "Common workplace language for meetings, notes, tasks, and follow-ups.",
      },
      {
        title: "Keyboard keys",
        difficulty: "medium",
        words: ["SHIFT", "OPTION", "RETURN", "ESCAPE"],
        hint: "You tap these on a laptop keyboard all day.",
        explanation: "Standard keyboard labels found on Mac and PC keyboards.",
      },
      {
        title: "Things in a break room",
        difficulty: "hard",
        words: ["MUG", "KETTLE", "SNACKS", "NAPKINS"],
        hint: "You would spot these near the office coffee machine.",
        explanation: "Objects and snacks that live in a shared break area.",
      },
      {
        title: "Can follow 'paper'",
        difficulty: "tricky",
        words: ["TRAIL", "CLIP", "CUT", "PLANE"],
        hint: "Each word can come after the same office supply word.",
        explanation: "They complete phrases like paper trail, paperclip, paper cut, and paper plane.",
      },
    ],
  },
  {
    id: "2026-05-26",
    date: "2026-05-26",
    edition: "Launch Pack 004",
    theme: "Internet native",
    groups: [
      {
        title: "Social actions",
        difficulty: "easy",
        words: ["LIKE", "SHARE", "POST", "REPLY"],
        hint: "These are the basic moves people make on social platforms.",
        explanation: "Core engagement verbs for posting, reacting, and responding online.",
      },
      {
        title: "Meme formats",
        difficulty: "medium",
        words: ["CAPTION", "TEMPLATE", "REACTION", "REMIX"],
        hint: "These are the building blocks of a meme spreading online.",
        explanation: "Common meme structures used for captions, remixes, and reactions.",
      },
      {
        title: "Browser parts",
        difficulty: "hard",
        words: ["TAB", "CACHE", "COOKIE", "HISTORY"],
        hint: "These show up in browser tabs, memory, and stored site data.",
        explanation: "Terms tied to how browsers organize pages and remember your session.",
      },
      {
        title: "Can follow 'hot'",
        difficulty: "tricky",
        words: ["TAKE", "SAUCE", "DOG", "SPOT"],
        hint: "Each word can complete a familiar phrase after a warm adjective.",
        explanation: "They form familiar phrases such as hot take, hot sauce, hot dog, and hotspot.",
      },
    ],
  },
  {
    id: "2026-05-27",
    date: "2026-05-27",
    edition: "Launch Pack 005",
    theme: "Cross-country road trip",
    groups: [
      {
        title: "Road signs",
        difficulty: "easy",
        words: ["YIELD", "MERGE", "STOP", "DETOUR"],
        hint: "These are the signs you notice first while driving.",
        explanation: "Standard highway directions and warnings.",
      },
      {
        title: "Gas station buys",
        difficulty: "medium",
        words: ["CHIPS", "SODA", "GUM", "JERKY"],
        hint: "These are snacks and drinks people grab on a long drive.",
        explanation: "Typical convenience-store picks from a road trip stop.",
      },
      {
        title: "National parks",
        difficulty: "hard",
        words: ["ZION", "YOSEMITE", "ACADIA", "OLYMPIC"],
        hint: "These are famous U.S. park names.",
        explanation: "Big-name American parks and wilderness destinations.",
      },
      {
        title: "Can follow 'rest'",
        difficulty: "tricky",
        words: ["AREA", "STOP", "ROOM", "EASY"],
        hint: "Each word can come after the same word on a highway sign.",
        explanation: "They finish phrases like rest area, rest stop, rest room, and rest easy.",
      },
    ],
  },
  {
    id: "2026-05-28",
    date: "2026-05-28",
    edition: "Launch Pack 006",
    theme: "Campus energy",
    groups: [
      {
        title: "School supplies",
        difficulty: "easy",
        words: ["PENCIL", "BINDER", "ERASER", "HIGHLIGHTER"],
        hint: "These are the basics you put in a backpack.",
        explanation: "Standard classroom supplies students use every day.",
      },
      {
        title: "College majors",
        difficulty: "medium",
        words: ["ECON", "BIOLOGY", "HISTORY", "DESIGN"],
        hint: "These are common fields of study.",
        explanation: "Broad academic subjects people pick in college.",
      },
      {
        title: "Library zones",
        difficulty: "hard",
        words: ["STACKS", "CARREL", "ARCHIVE", "DESK"],
        hint: "These are places you would navigate inside a university library.",
        explanation: "Common library spaces tied to study, storage, and service desks.",
      },
      {
        title: "Can follow 'class'",
        difficulty: "tricky",
        words: ["MATE", "ROOM", "ACTION", "IC"],
        hint: "Each word can finish a phrase after the same school word.",
        explanation: "They form classmate, classroom, class action, and classic.",
      },
    ],
  },
  {
    id: "2026-05-29",
    date: "2026-05-29",
    edition: "Launch Pack 007",
    theme: "Fitness and wellness",
    groups: [
      {
        title: "Gym equipment",
        difficulty: "easy",
        words: ["TREADMILL", "DUMBBELL", "MAT", "BIKE"],
        hint: "These are items you would see on the gym floor.",
        explanation: "Common workout gear and cardio machines.",
      },
      {
        title: "Workout moves",
        difficulty: "medium",
        words: ["LUNGE", "PLANK", "SQUAT", "BURPEE"],
        hint: "These are standard exercise motions.",
        explanation: "Popular bodyweight and conditioning moves.",
      },
      {
        title: "Wellness app metrics",
        difficulty: "hard",
        words: ["STEPS", "SLEEP", "HEART", "CALORIES"],
        hint: "These are numbers a health app likes to track.",
        explanation: "The basic stats many fitness apps monitor.",
      },
      {
        title: "Can follow 'green'",
        difficulty: "tricky",
        words: ["TEA", "LIGHT", "ROOM", "SCREEN"],
        hint: "Each word can come after the same color word in a common phrase.",
        explanation: "They complete expressions like green tea, green light, green room, and green screen.",
      },
    ],
  },
];

export function getPuzzleByDate(date: string): Puzzle | undefined {
  return puzzles.find((puzzle) => puzzle.date === date);
}

export function getPuzzleDates() {
  return puzzles.map((puzzle) => puzzle.date);
}

export function getHintRows(puzzle: Puzzle) {
  return puzzle.groups.map((group, index) => ({
    id: `${puzzle.date}:${index}`,
    title: group.title,
    hint: group.hint,
  }));
}

export function getAnswerRows(puzzle: Puzzle) {
  return puzzle.groups.map((group) => ({
    title: group.title,
    words: group.words,
    explanation: group.explanation,
    difficulty: group.difficulty,
  }));
}

export function formatPuzzleDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function getTodaysPuzzle(date = new Date()): Puzzle {
  const start = Date.UTC(2026, 4, 23);
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const days = Math.max(0, Math.floor((today - start) / 86_400_000));
  return puzzles[days % puzzles.length];
}
