"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
  /** 当前实际生效的主题 */
  resolved: "light" | "dark";
}

const Ctx = createContext<ThemeCtx>({
  theme: "system",
  setTheme: () => {},
  resolved: "light",
});

export function useTheme() {
  return useContext(Ctx);
}

function getSystemDark() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(t: Theme) {
  const dark = t === "dark" || (t === "system" && getSystemDark());
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  return dark ? "dark" as const : "light" as const;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // 初始化：从 localStorage 读取
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const t = stored && ["light", "dark", "system"].includes(stored) ? stored : "system";
    queueMicrotask(() => {
      setThemeState(t);
      setResolved(applyTheme(t));
      setMounted(true);
    });
  }, []);

  // theme 变化时应用
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme", theme);
    queueMicrotask(() => setResolved(applyTheme(theme)));
  }, [theme, mounted]);

  // system 模式下监听系统变化
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setResolved(applyTheme("system"));
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  return <Ctx.Provider value={{ theme, setTheme, resolved }}>{children}</Ctx.Provider>;
}
