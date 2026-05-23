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
      intro="Explore the vocabulary, references, and shortcuts that show up in American speech, media, and everyday life."
      angle="Each board teaches association through sports terms, startup language, phrase patterns, and common cultural clues."
      audience="Strong fit for English learners who want to sound more natural and for teachers who want a culture vocabulary activity."
      ctaHref="/"
      ctaLabel="Start playing"
      related={[
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
