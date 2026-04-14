"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { HrUser } from "@/types";

const NAV_ITEMS = [
  { href: "/", label: "首页", icon: "🏠" },
  { href: "/activities", label: "活动", icon: "📅" },
  { href: "/articles", label: "文章", icon: "📝" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<HrUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.data?.user ?? null))
      .catch(() => null);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-sm"
      style={{
        backgroundColor: "rgba(253,250,245,0.9)",
        borderColor: "var(--border)",
      }}
    >
      <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg shrink-0"
          style={{ color: "var(--color-primary)" }}
        >
          <span className="text-xl">📖</span>
          <span className="hidden sm:inline">HUSTERead</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-[var(--color-accent-soft)] text-[var(--color-primary-dark)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--color-accent-soft)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium hidden sm:inline">
                {user.nickname}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs px-2.5 py-1 rounded-md border transition-colors hover:bg-[var(--color-accent-soft)]"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                登出
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#fff",
              }}
            >
              登录
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="菜单"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              {menuOpen ? (
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              ) : (
                <path d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-2" style={{ borderColor: "var(--border)" }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                pathname === item.href
                  ? "bg-[var(--color-accent-soft)] font-medium"
                  : "text-[var(--muted)]"
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
