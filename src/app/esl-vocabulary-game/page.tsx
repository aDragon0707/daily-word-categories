import type { Metadata } from "next";
import { SeoLandingShell } from "@/components/seo-landing-shell";

export const metadata: Metadata = {
  title: "ESL vocabulary game | Daily Word Categories",
  description:
    "An ESL vocabulary game that helps learners practice grouping, categories, and real-world English words.",
  alternates: {
    canonical: "/esl-vocabulary-game",
  },
};

export default function Page() {
  return (
    <SeoLandingShell
      eyebrow="ESL practice"
      title="ESL vocabulary game"
      intro="Give learners a short, repeatable puzzle that turns vocabulary study into a clear category game."
      angle="The format is simple enough for classroom use but rich enough to expose learners to collocations, context, and everyday U.S. English."
      audience="Ideal for ESL teachers, tutors, and self-directed learners who want a daily practice game."
      ctaHref="/"
      ctaLabel="Play now"
      related={[
        { href: "/daily-english-vocabulary-puzzle", label: "Daily English puzzle" },
        { href: "/american-culture-word-game", label: "American culture game" },
      ]}
    >
      <li>Short sessions with a clear win condition</li>
      <li>Vocabulary practice without heavy grammar load</li>
      <li>Good for learners and classroom warmups</li>
    </SeoLandingShell>
  );
}
