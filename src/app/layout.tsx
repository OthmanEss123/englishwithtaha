import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "English with Taha | Don't Just Learn English. Start Speaking It.",
  description: "A practical program with Taha to help you speak confidently, communicate naturally and actually use your English. 2026/2027 Registration Open!",
  keywords: ["English with Taha", "Learn English Morocco", "English speaking practice", "English fluency coaching"],
  authors: [{ name: "Taha" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${caveat.variable}`}>
      <body className={jakarta.className}>{children}</body>
    </html>
  );
}
