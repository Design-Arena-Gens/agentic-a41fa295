import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechSpace AI | Daily Tech & Space Shorts",
  description:
    "Autonomous AI news curator crafting YouTube Shorts about the latest in technology and space."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
