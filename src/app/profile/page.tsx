"use client";

import { motion } from "framer-motion";
import { BookOpen, Edit3, Calendar, Settings, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock data
const user = {
  name: "林夕",
  role: "阅读推广人 · 第十二期会员",
  bio: "「我们在书籍中寻找的，其实是自己灵魂的倒影。」",
  stats: [
    { label: "发表文章", value: "24", icon: Edit3 },
    { label: "参与活动", value: "12", icon: Calendar },
    { label: "被点赞", value: "356", icon: BookOpen },
  ],
  articles: [
    { id: 1, title: "《悉达多》：在河流中寻找自我的旅程", date: "2026.03.12", category: "书评" },
    { id: 2, title: "关于存在主义的一点读书随笔", date: "2026.02.28", category: "读书笔记" },
    { id: 3, title: "冬日围炉夜话：卡夫卡专题回顾", date: "2026.01.15", category: "活动回顾" },
  ]
};

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 md:px-8">
      {/* Header Section (Library Card Vibe) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-sm border-[1.5px] border-border bg-card p-8 md:p-12 mb-12 shadow-[4px_4px_0_0_var(--color-border)]"
      >
        {/* Subtle decorative stamp/line */}
        <div className="absolute top-0 right-12 w-[1px] h-24 bg-border" />
        <div className="absolute top-12 right-0 w-24 h-[1px] bg-border" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="shrink-0 relative">
            <div className="absolute -inset-2 rounded-full border border-dashed border-border/60 animate-[spin_60s_linear_infinite]" />
            <div className="h-28 w-28 rounded-full bg-muted border-4 border-background overflow-hidden shadow-sm flex items-center justify-center text-4xl font-serif text-muted-foreground">
              林
            </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="text-4xl font-serif font-bold text-foreground tracking-widest">{user.name}</h1>
            <p className="text-sm font-medium tracking-widest text-primary uppercase">{user.role}</p>
            <p className="font-serif text-lg text-muted-foreground italic max-w-xl mx-auto md:mx-0">
              {user.bio}
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-full hover:bg-muted/30 transition-colors bg-background">
              <Settings className="w-4 h-4" /> 账号设定
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-destructive border border-transparent hover:bg-destructive/10 rounded-full transition-colors">
              <LogOut className="w-4 h-4" /> 退出登录
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-dashed border-border/70">
          {user.stats.map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="flex items-center justify-center mb-3">
                <stat.icon className="w-5 h-5 text-muted-foreground/60" strokeWidth={1.5} />
              </div>
              <p className="text-3xl font-serif font-bold text-foreground">{stat.value}</p>
              <p className="text-xs tracking-wider text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-3 gap-12">
        {/* Left Col (My Articles) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="md:col-span-2 space-y-8"
        >
          <div className="flex items-center justify-between border-b-[1.5px] border-foreground pb-4">
            <h2 className="text-2xl font-serif font-bold text-foreground tracking-wider">创作与志录</h2>
            <Link href="/articles" className="text-sm font-medium text-primary hover:underline underline-offset-4">
              前往文章馆
            </Link>
          </div>
          
          <div className="space-y-6">
            {user.articles.map((art) => (
              <div key={art.id} className="group relative pl-4 border-l-[3px] border-transparent hover:border-primary transition-all cursor-pointer">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-lg font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {art.title}
                  </h3>
                  <span className="shrink-0 text-[11px] font-mono text-muted-foreground bg-muted/30 px-2 py-1 rounded-sm">
                    {art.date}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[11px] px-2 py-0.5 border border-border/80 text-muted-foreground rounded-full bg-card">
                    {art.category}
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                    回顾长文 <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Col */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between border-b-[1.5px] border-foreground pb-4">
            <h2 className="text-2xl font-serif font-bold text-foreground tracking-wider">近期印记</h2>
          </div>
          <div className="relative pl-6 border-l-[1.5px] border-border/60 space-y-8 ml-2">
            <div className="relative">
              <div className="absolute -left-[32px] top-1 h-3 w-3 rounded-full bg-primary ring-[5px] ring-background" />
              <p className="text-xs font-mono text-muted-foreground mb-1">本周六 14:00</p>
              <p className="text-sm font-medium text-foreground tracking-wide">《百年孤独》精读会</p>
              <p className="text-xs font-semibold text-primary mt-1.5 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> 已报名
              </p>
            </div>
            <div className="relative opacity-60 hover:opacity-100 transition-opacity cursor-default">
              <div className="absolute -left-[32px] top-1 h-3 w-3 rounded-full bg-muted-foreground/30 ring-[5px] ring-background" />
              <p className="text-xs font-mono text-muted-foreground mb-1">上星期</p>
              <p className="text-sm font-medium text-foreground tracking-wide">光谷咖啡馆分享夜</p>
              <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> 已签到
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
