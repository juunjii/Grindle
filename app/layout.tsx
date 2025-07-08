import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grindle",
  description:
    "An intelligent platform that helps users manage, optimize, and personalize their job search, from progress tracking to actionable insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body className={`${dmSans.className} "antialiased bg-[#EAEEFE]`}>
        {children}
      </body>
    </html>
  );
}
