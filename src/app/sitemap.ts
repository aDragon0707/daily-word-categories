import type { MetadataRoute } from "next";
import { getPuzzleDates } from "@/data/puzzles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://daily.alantern.com";
  const puzzleDates = getPuzzleDates();

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/nyt-connections-alternative-for-english-learners`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/daily-english-vocabulary-puzzle`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/american-culture-word-game`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/esl-vocabulary-game`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/word-association-puzzle`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/hints/today`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/answers/today`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...puzzleDates.flatMap((date) => [
      {
        url: `${base}/hints/${date}`,
        lastModified: new Date(`${date}T00:00:00Z`),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      {
        url: `${base}/answers/${date}`,
        lastModified: new Date(`${date}T00:00:00Z`),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ]),
  ];
}
