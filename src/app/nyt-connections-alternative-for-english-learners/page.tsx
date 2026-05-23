import type { Metadata } from "next";
import { SeoLandingShell } from "@/components/seo-landing-shell";

export const metadata: Metadata = {
  title: "NYT Connections alternative for English learners | Daily Word Categories",
  description:
    "An unofficial daily word game for English learners who want culture vocabulary, word association practice, and a cleaner daily puzzle.",
  alternates: {
    canonical: "/nyt-connections-alternative-for-english-learners",
  },
};

export default function Page() {
  return (
    <SeoLandingShell
      eyebrow="English learner puzzle"
      title="NYT Connections alternative for English learners"
      intro="Daily Word Categories is an unofficial word association puzzle for learners who want to practice American vocabulary, phrases, and cultural references in a daily format."
      angle="The game trains category recognition, collocation awareness, and culture reading without pretending to be the official New York Times product."
      audience="Best for English learners, teachers, and curious players who want a more vocabulary-driven daily puzzle."
      ctaHref="/"
      ctaLabel="Play the puzzle"
      related={[
        { href: "/daily-english-vocabulary-puzzle", label: "Daily English vocabulary puzzle" },
        { href: "/word-association-puzzle", label: "Word association puzzle" },
      ]}
    >
      <li>English learners practicing everyday American usage</li>
      <li>Teachers looking for a quick vocabulary warm-up</li>
      <li>Players who like culture clues more than trivia</li>
    </SeoLandingShell>
  );
}
