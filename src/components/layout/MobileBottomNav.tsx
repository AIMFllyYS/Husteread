"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, CalendarRange, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "首页", icon: Home },
  { href: "/articles", label: "文章", icon: BookOpen },
  { href: "/activities", label: "活动", icon: CalendarRange },
  { href: "/forum", label: "论坛", icon: MessageSquare },
  { href: "/profile", label: "我的", icon: User },
] as const;

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md safe-area-bottom">
      <div className="flex items-stretch justify-around h-16">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 min-h-[48px] transition-colors",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 1.8} />
              <span className={cn("text-[10px] leading-tight", active && "font-semibold")}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
