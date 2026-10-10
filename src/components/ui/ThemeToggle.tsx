"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

const cycle: Theme[] = ["light", "dark", "system"];
const icons = { light: Sun, dark: Moon, system: Monitor } as const;
const labels = { light: "浅色", dark: "深色", system: "跟随系统" } as const;

/** compact: 图标按钮循环切换（桌面导航栏用） */
function Compact({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const Icon = icons[theme];
  const next = () => setTheme(cycle[(cycle.indexOf(theme) + 1) % 3]);

  return (
    <button
      onClick={next}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-muted/40 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary",
        className,
      )}
      aria-label={`当前主题：${labels[theme]}，点击切换`}
      title={labels[theme]}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
    </button>
  );
}

/** expanded: 三个选项按钮组（手机端菜单用） */
function Expanded({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn("flex gap-1 rounded-lg bg-muted/50 p-1", className)}>
      {cycle.map((t) => {
        const Icon = icons[t];
        const active = theme === t;
        return (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors min-h-[44px]",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-label={labels[t]}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
            <span>{labels[t]}</span>
          </button>
        );
      })}
    </div>
  );
}

export function ThemeToggle({ variant = "compact", className }: { variant?: "compact" | "expanded"; className?: string }) {
  return variant === "compact" ? <Compact className={className} /> : <Expanded className={className} />;
}
