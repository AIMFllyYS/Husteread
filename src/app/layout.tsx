import type { Metadata } from "next";
import { Noto_Serif_SC, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileTopBar from "@/components/layout/MobileTopBar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { ThemeProvider } from "@/components/ThemeProvider";

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
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

const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){}})();`;

const perfScript = `(function(){try{var tier='perf-tier-1';var lowCpu=(navigator.hardwareConcurrency||8)<=4;var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(lowCpu||reduced){tier='perf-tier-2';}document.documentElement.classList.add(tier);}catch(e){}})();`;

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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: perfScript }} />
        <ThemeProvider>
          {/* 桌面端：顶部导航栏 */}
          <Navbar />
          {/* 手机端：顶部功能栏 */}
          <MobileTopBar />
          <main className="flex-1 w-full flex flex-col pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
          {/* 手机端：底部导航栏 */}
          <MobileBottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
