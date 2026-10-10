"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3, Users, BookOpen, Database, LogOut,
  FileText, Settings, TrendingUp, Eye, Activity,
  Calendar, MessageSquare, Image, ChevronRight,
  ShieldCheck, Search
} from "lucide-react";
import { logoutAdmin } from "./actions";
import { useRouter } from "next/navigation";

const navSections = [
  {
    label: "核心",
    items: [
      { icon: BarChart3, label: "总览仪表盘", id: "overview" },
      { icon: TrendingUp, label: "数据趋势", id: "trends" },
    ]
  },
  {
    label: "内容管理",
    items: [
      { icon: FileText, label: "文章审核", id: "articles" },
      { icon: MessageSquare, label: "论坛管理", id: "forum" },
      { icon: Calendar, label: "活动管理", id: "activities" },
      { icon: Image, label: "照片墙管理", id: "gallery" },
    ]
  },
  {
    label: "系统",
    items: [
      { icon: Users, label: "会员管理", id: "members" },
      { icon: Database, label: "审计日志", id: "logs" },
      { icon: Settings, label: "系统配置", id: "settings" },
    ]
  }
];

// Mock stats
const stats = [
  { label: "注册读者", value: "2,845", change: "+128", icon: Users, accent: false },
  { label: "收录文章", value: "1,032", change: "+47", icon: BookOpen, accent: false },
  { label: "活跃沙龙", value: "5", change: "+1", icon: Activity, accent: true },
  { label: "本月浏览", value: "18.6K", change: "+3.2K", icon: Eye, accent: false },
];

const recentArticles = [
  { title: "论《红楼梦》中的\"镜像\"叙事", author: "林夕", status: "待审核", time: "10 分钟前" },
  { title: "存在主义文学在当代的意义", author: "青空", status: "已通过", time: "2 小时前" },
  { title: "《百年孤独》精读会活动回顾", author: "管理员", status: "已通过", time: "昨天" },
  { title: "关于下学期读书会选题投票", author: "Sunlighter", status: "待审核", time: "昨天" },
];

const recentActivities = [
  { title: "《百年孤独》精读分享会", date: "03.28", enrolled: 15, capacity: 20 },
  { title: "Sunlight 存在主义文学", date: "04.05", enrolled: 30, capacity: 50 },
  { title: "午后草坪读诗", date: "04.12", enrolled: 0, capacity: 12 },
];

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("overview");
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.refresh();
  };

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F4EFE8 100%)" }}
    >
      {/* ──────── FIXED SIDEBAR ──────── */}
      <aside className="fixed left-0 top-0 bottom-0 w-[260px] flex flex-col border-r border-[#D4C8B5]/60 bg-[#F0EBE3] z-10 shadow-[2px_0_20px_rgba(0,0,0,0.03)]">
        {/* Paper texture on sidebar */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}
        />

        {/* Brand Header */}
        <div className="relative px-7 pt-8 pb-7 border-b border-[#D4C8B5]/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#7E1518] flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-[15px] font-serif font-bold text-[#2A2218] tracking-wider">典藏阁</h1>
              <p className="text-[10px] font-mono text-[#8B7355] tracking-[0.15em] mt-0.5">ADMIN CONSOLE</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-5 px-4 space-y-6 relative">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="text-[10px] font-mono font-semibold text-[#8B7355]/70 uppercase tracking-[0.2em] px-3 mb-2">
                {section.label}
              </p>
              <div className="space-y-[2px]">
                {section.items.map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveNav(item.id)}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 text-[13px] font-medium transition-all duration-200 relative group ${
                        isActive
                          ? "text-[#7E1518] bg-[#7E1518]/[0.06]"
                          : "text-[#5A5045] hover:text-[#2A2218] hover:bg-[#2A2218]/[0.03]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#7E1518]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <item.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                      <span className="tracking-wide">{item.label}</span>
                      {isActive && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer / Logout */}
        <div className="relative px-4 py-5 border-t border-[#D4C8B5]/50 bg-[#EDE7DD]/50">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-[13px] font-medium text-[#9B2226] border border-[#9B2226]/15 hover:bg-[#9B2226] hover:text-white transition-all duration-300 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" /> 退出登录
          </button>
        </div>
      </aside>

      {/* ──────── MAIN CONTENT (offset by sidebar width) ──────── */}
      <main className="ml-[260px] flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 backdrop-blur-md bg-[#FAF7F2]/80 border-b border-[#D4C8B5]/40 px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7355]/60" />
              <input
                type="text"
                placeholder="搜索文章、会员、活动..."
                className="w-72 bg-[#EDE7DD]/50 border border-[#D4C8B5]/40 pl-10 pr-4 py-2 text-sm text-[#2A2218] placeholder:text-[#8B7355]/40 focus:outline-none focus:border-[#7E1518]/30 transition-colors font-serif"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-[#8B7355] tracking-wider">
              {new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <div className="w-8 h-8 bg-[#7E1518] flex items-center justify-center text-white text-xs font-serif font-bold shadow-sm">
              管
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-10 max-w-[1200px]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-[#2A2218] tracking-wide mb-3">数据统计总览</h2>
            <p className="text-[#8B7355] font-serif text-[15px]">洞悉「HUSTer-Reads」读书沙龙生态的方方面面</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className={`group relative p-7 border bg-white/70 transition-all duration-300 overflow-hidden cursor-default ${
                  stat.accent
                    ? "border-[#7E1518]/20 hover:border-[#7E1518]/40 shadow-sm"
                    : "border-[#D4C8B5]/50 hover:border-[#D4C8B5] shadow-sm"
                }`}
              >
                {/* Hover accent stripe */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ${
                  stat.accent ? "bg-[#7E1518]" : "bg-[#2A2218]/20"
                }`} />
                
                <div className="flex items-start justify-between mb-5">
                  <stat.icon className={`w-5 h-5 ${stat.accent ? "text-[#7E1518]" : "text-[#8B7355]/60"}`} strokeWidth={1.5} />
                  <span className="text-xs font-mono font-semibold text-green-700/70 bg-green-50 px-2 py-0.5">
                    {stat.change}
                  </span>
                </div>
                <p className={`text-4xl font-serif font-bold mb-2 ${stat.accent ? "text-[#7E1518]" : "text-[#2A2218]"}`}>
                  {stat.value}
                </p>
                <p className="text-[12px] font-mono text-[#8B7355] tracking-wider uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Two Column Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Recent Articles - 3/5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="lg:col-span-3 border border-[#D4C8B5]/50 bg-white/60 shadow-sm overflow-hidden"
            >
              <div className="flex items-center justify-between px-7 py-5 border-b border-[#D4C8B5]/40">
                <h3 className="text-[15px] font-serif font-bold text-[#2A2218] tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#7E1518]" strokeWidth={1.5} />
                  最近投稿
                </h3>
                <button className="text-[11px] font-mono text-[#7E1518] hover:underline underline-offset-4 tracking-wider">
                  查看全部 →
                </button>
              </div>
              <div className="divide-y divide-[#D4C8B5]/30">
                {recentArticles.map((art, i) => (
                  <div key={i} className="flex items-center justify-between px-7 py-4 hover:bg-[#F6F1EA]/50 transition-colors cursor-pointer group">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-[14px] font-serif font-medium text-[#2A2218] truncate group-hover:text-[#7E1518] transition-colors">
                        {art.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[11px] font-mono text-[#8B7355]">✍ {art.author}</span>
                        <span className="text-[11px] font-mono text-[#8B7355]/60">{art.time}</span>
                      </div>
                    </div>
                    <span className={`shrink-0 text-[11px] font-mono font-semibold px-3 py-1 ${
                      art.status === "待审核"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-green-50 text-green-700 border border-green-200"
                    }`}>
                      {art.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Activities - 2/5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="lg:col-span-2 border border-[#D4C8B5]/50 bg-white/60 shadow-sm overflow-hidden"
            >
              <div className="flex items-center justify-between px-7 py-5 border-b border-[#D4C8B5]/40">
                <h3 className="text-[15px] font-serif font-bold text-[#2A2218] tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#7E1518]" strokeWidth={1.5} />
                  活动一览
                </h3>
              </div>
              <div className="divide-y divide-[#D4C8B5]/30">
                {recentActivities.map((act, i) => (
                  <div key={i} className="px-7 py-5 hover:bg-[#F6F1EA]/50 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-[14px] font-serif font-medium text-[#2A2218] group-hover:text-[#7E1518] transition-colors">
                          {act.title}
                        </p>
                        <p className="text-[11px] font-mono text-[#8B7355] mt-1.5">
                          📅 {act.date}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-serif font-bold text-[#2A2218]">
                          {act.enrolled}<span className="text-[#8B7355]/50 text-sm">/{act.capacity}</span>
                        </p>
                        {/* Progress bar */}
                        <div className="w-16 h-1.5 bg-[#EDE7DD] mt-2 overflow-hidden">
                          <div
                            className="h-full bg-[#7E1518] transition-all duration-500"
                            style={{ width: `${(act.enrolled / act.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 h-[320px] border border-[#D4C8B5]/50 bg-white/40 flex items-center justify-center relative shadow-sm overflow-hidden"
          >
            {/* Geometric decoration */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 40px, #2A2218 40px, #2A2218 41px)" }}
            />
            <div className="text-center z-10">
              <BarChart3 className="w-12 h-12 text-[#D4C8B5] mx-auto mb-5" strokeWidth={1} />
              <p className="font-serif text-[#8B7355] italic text-lg tracking-wider mb-2">
                图表引擎待接入
              </p>
              <p className="text-[11px] font-mono text-[#8B7355]/50 tracking-wider">
                CHART ENGINE · PENDING INTEGRATION
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
