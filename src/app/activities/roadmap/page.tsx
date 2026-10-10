"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Film, BookOpen, Sparkles, Palette, TreePine, MessageSquare, GraduationCap, Check, Clock, CalendarDays,
} from "lucide-react";

const STATUS = { done: "已完成", ongoing: "进行中", upcoming: "即将开始", planned: "筹备中" } as const;
type Status = keyof typeof STATUS;

type Milestone = {
  month: string;
  date: string;
  title: string;
  status: Status;
  icon: React.ElementType;
  emoji: string;
  description: string;
  requirements: string[];
};

const milestones: Milestone[] = [
  {
    month: "3月", date: "3月中旬", title: "Tonight 观影会", status: "done",
    icon: Film, emoji: "🎬",
    description: "2026 春季首场活动。在东图书馆 301 放映厅集中观影，观影前后由主持人组织讨论，线上评论打卡。",
    requirements: ["群内投票选片，经指导老师审核", "准备片源确保全程无卡顿", "阅读推广平台建立观影评论专题", "制作宣传海报，提前 2 天通知"],
  },
  {
    month: "3月", date: "3月末启动", title: "每日阅读分享", status: "ongoing",
    icon: BookOpen, emoji: "📖",
    description: "按报名顺序，每日由一位同学在社团活动群中发布自己的近期阅读或最想推荐的书籍及相关介绍。持续至所有报名同学轮完。",
    requirements: ["群内发布报名接龙", "每日一位同学分享", "分享内容：书名 + 推荐理由 + 简要介绍"],
  },
  {
    month: "4月", date: "4月18—19日", title: "社团文化节 · 春招游园会", status: "upcoming",
    icon: Sparkles, emoji: "🌸",
    description: "第二十二届学生社团文化节嘉年华，东操主操场。读书会摊位进行社团风采展示、春季招新和互动游戏。",
    requirements: [
      "游戏 2-3 个：书海寻踪（猜书名积分）、你画我猜（古诗词肢体演绎）、接龙（成语/诗句）、墨香存韵（分享卡写推荐语）",
      "奖品：手绘明信片六套、华科大书签 20 枚、书籍 8 本、桌面小摆件",
      "每天 8:00-18:00 分 5 个时段轮班，每时段 4-5 人",
      "宣传部制作海报和传单，拍照记录",
    ],
  },
  {
    month: "4月", date: "4月下旬", title: "世界读书日 · Tonight 阅读会", status: "planned",
    icon: MessageSquare, emoji: "📚",
    description: "结合世界读书日，举办主题阅读会。不只做「坐着听」的阅读会，更强调表达和参与感——让参与者有输入，也有输出。",
    requirements: [
      "选定主题（备选：恋爱主题阅读会）",
      "参与形式：书写、口头分享、绘画表达",
      "模仿心理小组开展书写与表达的小组工作",
      "备选方案 A：经典情景演绎诵读（投票选经典片段 → 分组排练 → 展示）",
      "备选方案 B：图书与艺术（丙烯画/剪纸创作 → 介绍作品）",
    ],
  },
  {
    month: "5月", date: "5月上中旬", title: "Tonight 观影会（春季第二期）", status: "planned",
    icon: Film, emoji: "🎞️",
    description: "春季学期第二场观影会。延续秋季观影会模式，群内投票选片，图书馆放映厅集中观看，观后组织讨论。",
    requirements: ["群内投票选片 + 指导老师审核", "阅读推广平台建立评论专题", "观影后线上打卡评论（150-200 字）"],
  },
  {
    month: "5月", date: "5月下旬", title: "童心拾梦 · 六一主题活动", status: "planned",
    icon: TreePine, emoji: "🌟",
    description: "接近六一时举办。比起传统征文，更倾向「分享自己的故事」。在读书会群内开展，一天发一到两条，一周内完成。",
    requirements: [
      "征集形式：童年阅读记忆、童年片段、给童年的自己写话、照片故事",
      "字数不少于 300 字",
      "先内部投票确定形式",
      "面向全华科宣传：QQ 空间转发 + 问图书馆能否协助宣传",
      "优秀作品选入推文，并获得小礼品",
    ],
  },
  {
    month: "5-6月", date: "备选", title: "图书与郊游（团建）", status: "planned",
    icon: Palette, emoji: "🏕️",
    description: "备选活动。大群投票决定是否举办。可选瑜家湖或东湖，自助烧烤 + 游戏（狼人杀等纸牌类、松鼠大树等身体类）。",
    requirements: ["大群投票决定是否举办", "小红书找攻略确定地点", "提前说明费用（尽量低）", "费用自负不可报销", "注意安全"],
  },
  {
    month: "6月", date: "6月中下旬", title: "考试周 · 休整期", status: "planned",
    icon: GraduationCap, emoji: "📝",
    description: "第 15-16 周为考试周，不开展活动，保障大家的学习时间。",
    requirements: ["无活动安排", "保障学习时间"],
  },
];

function statusBadge(status: Status) {
  const styles: Record<Status, string> = {
    done: "bg-foreground text-background",
    ongoing: "bg-primary text-primary-foreground",
    upcoming: "border border-primary text-primary",
    planned: "border border-border text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-sans tracking-widest uppercase ${styles[status]}`}>
      {status === "done" && <Check className="w-3 h-3" />}
      {status === "ongoing" && <Clock className="w-3 h-3 animate-pulse" />}
      {STATUS[status]}
    </span>
  );
}

export default function RoadmapPage() {
  return (
    <div className="bg-background min-h-screen font-sans selection:bg-foreground selection:text-background pb-32">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full px-6 md:px-16 pt-24 md:pt-32 pb-12 border-b-[3px] border-foreground"
      >
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" /> 返回活动纪实
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <p className="font-sans text-xs tracking-[0.4em] text-muted-foreground mb-4 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-primary" /> 2026 ROADMAP
            </p>
            <h1 className="flex flex-col font-serif font-bold text-foreground tracking-tighter">
              <span className="text-[12vw] sm:text-[8vw] leading-[0.85]">活动线路图</span>
              <div className="flex items-center gap-4 md:gap-8 pl-[3vw]">
                <span className="w-16 md:w-24 h-[2px] bg-foreground/80 block" />
                <span className="text-[10vw] sm:text-[6vw] leading-[0.85] text-muted-foreground/50 italic font-light">2026 春夏</span>
              </div>
            </h1>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            2026 年 3 月 — 6 月
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="w-full px-6 md:px-16 pt-16 max-w-5xl mx-auto">

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-16 font-sans text-xs">
          {(Object.keys(STATUS) as Status[]).map((s) => (
            <div key={s}>{statusBadge(s)}</div>
          ))}
        </div>

        {/* Milestones */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="relative pl-14 md:pl-16 pb-16 last:pb-0 group"
                >
                  {/* Node */}
                  <div className={`absolute left-0 top-1 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 z-10 bg-background transition-colors ${
                    m.status === "done" ? "border-foreground" :
                    m.status === "ongoing" ? "border-primary" :
                    "border-border group-hover:border-foreground"
                  }`}>
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-foreground/70" />
                  </div>

                  {/* Content */}
                  <div className="border border-border p-6 md:p-8 hover:bg-muted/20 transition-colors">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="font-mono text-xs tracking-widest text-muted-foreground">{m.date}</span>
                      {statusBadge(m.status)}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
                      <span>{m.emoji}</span> {m.title}
                    </h3>

                    <p className="font-serif text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                      {m.description}
                    </p>

                    {/* Requirements */}
                    <div className="border-t border-dashed border-border/60 pt-4">
                      <p className="font-sans text-[10px] tracking-widest text-muted-foreground uppercase mb-3">
                        核心要求 / REQUIREMENTS
                      </p>
                      <ul className="space-y-2">
                        {m.requirements.map((req, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-foreground/80 font-sans">
                            <span className="w-1.5 h-1.5 bg-primary mt-1.5 shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 border-t-2 border-foreground pt-8 flex flex-col md:flex-row justify-between gap-8"
        >
          <div className="max-w-lg">
            <p className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-2">备注</p>
            <p className="font-serif text-sm text-muted-foreground leading-relaxed">
              考试前两周不开展活动，保障大家的学习时间。具体活动时间和形式可能根据实际情况调整，以群内通知为准。
            </p>
          </div>
          <div>
            <p className="font-sans text-xs tracking-widest text-muted-foreground uppercase mb-2">Tonight 读书会备选方案</p>
            <ul className="font-serif text-sm text-muted-foreground space-y-1">
              <li>A. 经典情景演绎诵读</li>
              <li>B. 图书与艺术（丙烯画 / 剪纸）</li>
              <li>C. 图书与郊游</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
