import type { Metadata } from "next";
import { SeoLandingShell } from "@/components/seo-landing-shell";

export const metadata: Metadata = {
  title: "American culture word game | Daily Word Categories",
  description:
    "A daily American culture word game about sports, media, idioms, and everyday associations for English learners.",
  alternates: {
    canonical: "/american-culture-word-game",
  },
};

export default function Page() {
  return (
    <SeoLandingShell
      eyebrow="American culture"
      title="American culture word game"
      intro="Practice the words, references, and phrase shortcuts that show up in American speech, media, sports, school, work, and internet life."
      angle="Each board teaches association through culture clues: a baseball term might sit beside a coffee order, a startup verb, or a phrase trap that only works when you know the expression."
      audience="Strong fit for English learners who want to sound more natural, word game fans who like category logic, and teachers who want a quick culture vocabulary warmup."
      howToPlay={[
        "Scan the board for words that belong to the same real-world setting.",
        "Tap four words and submit the group.",
        "Use correct groups and wrong-guess feedback to uncover the culture pattern.",
      ]}
      practiceAreas={[
        {
          title: "American references",
          body: "Boards include everyday cues from coffee shops, baseball, road trips, streaming apps, school, and office language.",
        },
        {
          title: "Phrase traps",
          body: "Some groups are not definitions. They depend on compounds and expressions such as cold call, hot take, or rest stop.",
        },
        {
          title: "Context reading",
          body: "The useful skill is spotting where a word lives: sports broadcast, startup meeting, meme thread, classroom, or highway sign.",
        },
        {
          title: "Daily recall",
          body: "A short board makes the practice repeatable, so learners can build cultural vocabulary without a long lesson.",
        },
      ]}
      exampleGroups={[
        {
          title: "Baseball words",
          words: ["DIAMOND", "DUGOUT", "INNING", "PITCH"],
          note: "A player who knows baseball can group these faster than someone reading only dictionary meanings.",
        },
        {
          title: "Startup verbs",
          words: ["PIVOT", "SHIP", "SCALE", "RAISE"],
          note: "These words have special force in founder and tech culture, even though they are common English words.",
        },
        {
          title: "Can follow hot",
          words: ["TAKE", "SAUCE", "DOG", "SPOT"],
          note: "The link is a phrase pattern: hot take, hot sauce, hot dog, and hotspot.",
        },
      ]}
      faqs={[
        {
          question: "Is this an American culture quiz?",
          answer:
            "Not exactly. It is a word grouping game that uses American culture as one source of clues. You still solve by association, not by memorizing trivia.",
        },
        {
          question: "Can English learners use it?",
          answer:
            "Yes. The game is designed to make learners notice collocations, phrase patterns, and context. Hints and answer pages explain the category logic.",
        },
        {
          question: "How often is the puzzle updated?",
          answer:
            "The site is built around a daily puzzle habit. New boards can focus on culture, media, school, work, sports, internet language, and phrase traps.",
        },
      ]}
      ctaHref="/"
      ctaLabel="Start playing"
      related={[
        { href: "/hints/today", label: "Today's hints" },
        { href: "/answers/today", label: "Today's answers" },
        { href: "/nyt-connections-alternative-for-english-learners", label: "NYT alternative" },
        { href: "/word-association-puzzle", label: "Word association puzzle" },
      ]}
    >
      <li>American idioms and phrase patterns</li>
      <li>Sports, media, and internet vocabulary</li>
      <li>Culture clues that reward careful reading</li>
    </SeoLandingShell>
  );
}
