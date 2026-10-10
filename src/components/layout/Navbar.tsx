"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { name: "首页", path: "/" },
  { name: "文章", path: "/articles" },
  { name: "论坛", path: "/forum" },
  { name: "活动", path: "/activities" },
  { name: "照片墙", path: "/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="blur-heavy sticky top-0 z-50 w-full border-b border-border/40 bg-background/92 supports-[backdrop-filter]:bg-background/88 hidden md:block">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <span className="font-serif text-2xl font-bold tracking-widest text-primary drop-shadow-sm">
            HUSTERead
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "relative px-1 py-2 text-[15px] font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-[19px] left-0 right-0 h-[2px] bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle variant="compact" />
          <Link
            href="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/40 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary hover:shadow-sm"
            aria-label="个人中心"
          >
            <User className="h-[18px] w-[18px]" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
