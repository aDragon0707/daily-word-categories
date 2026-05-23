import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Word Categories",
  description:
    "A daily English word grouping puzzle with culture, phrase, tech, sports, and media categories.",
  metadataBase: new URL("https://daily.alantern.com"),
  verification: {
    google: "p62Qh3vZl2fUMf1JVBC18MBUBf2ZAELoGf6K9yEjpYM",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Daily Word Categories",
    description: "Group 16 words into 4 hidden categories every day.",
    url: "https://daily.alantern.com",
    siteName: "Daily Word Categories",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
