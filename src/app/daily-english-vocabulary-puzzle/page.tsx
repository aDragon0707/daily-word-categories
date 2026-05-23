import type { Metadata } from "next";
import { SeoLandingShell } from "@/components/seo-landing-shell";

export const metadata: Metadata = {
  title: "Daily English vocabulary puzzle | Daily Word Categories",
  description:
    "A daily English vocabulary puzzle built around grouping, association, and American everyday language.",
  alternates: {
    canonical: "/daily-english-vocabulary-puzzle",
  },
};

export default function Page() {
  return (
    <SeoLandingShell
      eyebrow="Daily vocabulary"
      title="Daily English vocabulary puzzle"
      intro="Practice useful English words in a compact daily puzzle that rewards category thinking, phrase memory, and cultural awareness."
      angle="The board mixes plain vocabulary with idioms, media language, and everyday American references so players can learn by pattern rather than memorization."
      audience="Useful for self-study, classroom warmups, and anyone who wants a short daily vocabulary habit."
      ctaHref="/"
      ctaLabel="Play today"
      related={[
        { href: "/esl-vocabulary-game", label: "ESL vocabulary game" },
        { href: "/american-culture-word-game", label: "American culture word game" },
      ]}
    >
      <li>Daily practice without long reading</li>
      <li>Vocabulary that feels like real usage</li>
      <li>Fast enough for a coffee break</li>
    </SeoLandingShell>
  );
}
