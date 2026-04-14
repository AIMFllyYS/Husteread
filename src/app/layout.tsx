import type { Metadata } from "next";
import { Noto_Serif_SC, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HUSTERead — 华科读书会",
    template: "%s | HUSTERead",
  },
  description:
    "华中科技大学读书会展示平台 — 记录和分享读书会的活动成果、会员文章与日常读书心得",
  keywords: ["华中科技大学", "读书会", "书评", "阅读", "HUST"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSerifSC.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-serif selection:bg-primary selection:text-primary-foreground bg-background text-foreground">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
