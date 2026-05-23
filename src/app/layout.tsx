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
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="border-t border-[#2d2a221f] bg-[#f7f4ec] px-4 py-6 text-sm text-[#4f473b] sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap gap-4">
            <a href="/privacy" className="font-semibold hover:underline">
              Privacy
            </a>
            <a href="/terms" className="font-semibold hover:underline">
              Terms
            </a>
            <a href="/contact" className="font-semibold hover:underline">
              Contact
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
