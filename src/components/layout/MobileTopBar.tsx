"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, X, Search, Camera, Info } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function MobileTopBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 md:hidden border-b border-border/40 bg-background/95 backdrop-blur-md">
      <div className="flex h-12 items-center justify-between px-4">
        <Link href="/" className="font-serif text-lg font-bold tracking-widest text-primary">
          HUSTERead
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          aria-label={open ? "关闭菜单" : "更多功能"}
        >
          {open ? <X className="h-5 w-5" /> : <MoreHorizontal className="h-5 w-5" />}
        </button>
      </div>

      {/* 展开面板 */}
      {open && (
        <div className="border-t border-border/40 bg-background px-4 pb-4 pt-3 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {/* 搜索入口 */}
          <Link
            href="#"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors min-h-[44px]"
          >
            <Search className="h-5 w-5" />
            <span>搜索文章与活动</span>
          </Link>

          {/* 照片墙 */}
          <Link
            href="/gallery"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors min-h-[44px]"
          >
            <Camera className="h-5 w-5" />
            <span>照片墙</span>
          </Link>

          {/* 关于 */}
          <Link
            href="/analysis_with_admin"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors min-h-[44px]"
          >
            <Info className="h-5 w-5" />
            <span>管理后台</span>
          </Link>

          {/* 暗黑模式切换 */}
          <div className="pt-2 border-t border-border/40">
            <p className="text-xs text-muted-foreground mb-2 px-1">外观模式</p>
            <ThemeToggle variant="expanded" />
          </div>
        </div>
      )}
    </header>
  );
}
