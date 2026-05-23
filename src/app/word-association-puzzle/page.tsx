import type { Metadata } from "next";
import { SeoLandingShell } from "@/components/seo-landing-shell";

export const metadata: Metadata = {
  title: "Word association puzzle | Daily Word Categories",
  description:
    "A daily word association puzzle built for fast category solving, cultural clues, and replayable vocabulary practice.",
  alternates: {
    canonical: "/word-association-puzzle",
  },
};

export default function Page() {
  return (
    <SeoLandingShell
      eyebrow="Association game"
      title="Word association puzzle"
      intro="Think in groups, not single words. Daily Word Categories turns association into a compact daily puzzle with visible learning value."
      angle="It teaches how words cluster around usage, culture, and category logic while staying friendly to short daily play."
      audience="Great for players who like logic, teachers who want a vocabulary activity, and learners who want pattern practice."
      ctaHref="/"
      ctaLabel="Play the board"
      related={[
        { href: "/nyt-connections-alternative-for-english-learners", label: "English learner alternative" },
        { href: "/daily-english-vocabulary-puzzle", label: "Daily vocabulary puzzle" },
      ]}
    >
      <li>Word group thinking instead of trivia recall</li>
      <li>Useful for vocabulary, idioms, and culture clues</li>
      <li>Replayable daily structure with a clean result loop</li>
    </SeoLandingShell>
  );
}
