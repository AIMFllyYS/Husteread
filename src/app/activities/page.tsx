"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  MapPin, Users, BookOpen, Feather, Music, Star, Sparkles, CornerDownRight, CalendarRange
} from "lucide-react";
import { ShrinkHero } from "@/components/ui/ShrinkHero";

const EtheralShadow = dynamic(
  () => import("@/components/ui/etheral-shadow").then((m) => m.EtheralShadow),
  { ssr: false }
);

// ─────────────────────────────────────────────
// Data — strictly from docs/source
// ─────────────────────────────────────────────
const TABS = [
  { id: "all", label: "INDEX" },
  { id: "tonight", label: "TONIGHT" },
  { id: "childhood", label: "CHILDHOOD" },
  { id: "festival", label: "FESTIVAL" },
  { id: "upcoming", label: "2026+" },
];

const events = [
  // ──────── 往期 ────────
  {
    id: "t1", category: "tonight", year: 2025, era: "past", date: "2025.10", season: "立冬", title: "Tonight读书会「立冬时节」", emoji: "❄️",
    organizer: "华科读书会 学习部", location: "西华园文化餐吧", mode: "线下",
    quote: "立，建始也；冬，终也，万物收藏也。",
    description: "立冬时节，众人小聚西华园，共话立冬习俗。5分钟破冰演讲，围绕主题自由分享一首诗、一首歌或一个故事，以「书籍漂流」收束。",
    activities: [ "5分钟破冰分享", "诗歌与故事巡游", "书籍漂流：留下一本，带走一本" ],
    icon: BookOpen, color: "#9ca3af" // zinc-400 for brutalist monochrome
  },
  {
    id: "c1", category: "childhood", year: 2021, era: "past", date: "2021.05", season: "六一儿童节", title: "童心拾梦 · 线上征文", emoji: "🌟",
    organizer: "华科读书会 活动部", location: "线上阅读推广平台", mode: "线上",
    quote: "每个人的心里都装着一片星空，那里有童年时的质朴纯真。",
    description: "用互联网收集对童年的记忆、寄语与纯真坚守。不论是选书、回忆细节，还是给过去的自己写信。",
    activities: [ "选取书籍片段附理由", "穿越时光的信", "照片故事编写" ],
    icon: Feather, color: "#a1a1aa" 
  },
  {
    id: "f1", category: "festival", year: 2025, era: "past", date: "2025.04", season: "世界读书日", title: "2025 读书节", emoji: "📚",
    organizer: "华中科技大学图书馆", location: "主图书馆 + 医学分馆", mode: "线下",
    quote: "科技赋能阅读，人文照亮未来。",
    description: "图书馆主办规模最大年度阅读活动，4大类28项子活动，参与人数超2000人。涵盖「马语者」阅读会、AI主题展、非遗体验等。",
    activities: [ "红色经典思享会", "图壤元宇宙(VR/MR)展", "非遗竹编手作体验", "数据库推广集市" ],
    icon: Star, color: "#d4d4d8"
  },
  {
    id: "f2", category: "festival", year: 2025, era: "past", date: "2025.03", season: "春季百团大战", title: "社团文化节招募", emoji: "🌸",
    organizer: "华科读书会 组织部", location: "百明体育馆周边", mode: "线下",
    quote: "迎着春日，找到下一个爱书的你。",
    description: "百团大战上，读书会在此招募新成员。展台摆放过往回忆与书单，路过者可驻足交流，即刻参与。",
    activities: [ "历史与书单微展", "现场成员面对面", "小书签派送" ],
    icon: Music, color: "#a1a1aa"
  },
  // ──────── 2026 即将举办 ────────
  {
    id: "u1", category: "upcoming", year: 2026, era: "upcoming", date: "2026.04", season: "世界读书日", title: "大咖共读：华为阅读百城", emoji: "🌐",
    organizer: "华科读书会 × 华为阅读", location: "主图书馆报告厅", mode: "线下",
    quote: "百城共读，一城一故事。",
    description: "围绕年度书目展开分享，并特邀嘉宾解读「AI时代的阅读」。名额极其有限，思想深度极高。",
    activities: [ "年度共读与导读", "AI时代阅读方式研讨", "现场互动赠礼" ],
    icon: Sparkles, color: "#e4e4e7"
  },
  {
    id: "u2", category: "upcoming", year: 2026, era: "upcoming", date: "2026.05", season: "五月阅读季", title: "Tonight 2026 春夏首辑", emoji: "☀️",
    organizer: "华科读书会", location: "青年园（晴天）", mode: "线下",
    quote: "天气好的话，请来找我们，共度佳日。",
    description: "2026首场户外相聚，带上一本书、留下心里话，一起在春夏交替的草地上聊阅读、聊生活。",
    activities: [ "户外开场&主题揭晓", "草坪圆桌自由谈", "书信与书籍双重漂流" ],
    icon: BookOpen, color: "#fafafa" 
  },
];

// ─────────────────────────────────────────────
// API integration: try fetching from backend, merge with local data
// ─────────────────────────────────────────────
function useActivities() {
  const [apiEvents, setApiEvents] = useState<typeof events>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchActivities() {
      try {
        const res = await fetch("/api/activities?limit=20");
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        if (!cancelled && json.success && json.data?.items?.length > 0) {
          const mapped = json.data.items.map((item: Record<string, unknown>, i: number) => ({
            id: `api-${item.id}`,
            category: "upcoming",
            year: new Date(item.start_time as string || item.date as string || Date.now()).getFullYear(),
            era: (item.status === "COMPLETED" ? "past" : "upcoming") as string,
            date: new Date(item.start_time as string || item.date as string || Date.now()).toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit" }).replace("/", "."),
            season: "",
            title: item.title as string || "活动",
            emoji: "📖",
            organizer: "华科读书会",
            location: (item.location as string) || "待定",
            mode: "线下",
            quote: (item.description as string)?.slice(0, 40) || "",
            description: (item.description as string) || "",
            activities: [] as string[],
            icon: BookOpen,
            color: i % 2 === 0 ? "#9ca3af" : "#a1a1aa",
          }));
          setApiEvents(mapped);
        }
      } catch {
        // fallback to local data only
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchActivities();
    return () => { cancelled = true; };
  }, []);

  // Merge: local events first, then any API events not already present
  const allEvents = [...events, ...apiEvents.filter(ae => !events.some(e => e.title === ae.title))];
  return { events: allEvents, loading };
}

// ─────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────

function HeroSection() {
  return (
    <ShrinkHero
      stickyTitle="Literary Fragments · 活动纪实"
      className="relative h-[85vh] min-h-[600px] w-full bg-background overflow-hidden flex flex-col justify-end"
    >
      {({ titleScale, titleOpacity, subOpacity, subY }) => (
        <>
          <div className="blend-heavy absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply dark:mix-blend-screen">
            <EtheralShadow
              color="var(--background)"
              animation={{ scale: 75, speed: 65 }}
              noise={{ opacity: 0.6, scale: 1.5 }}
              performanceMode="low"
            />
          </div>

          <div className="relative z-10 w-full px-6 md:px-16 pb-16 md:pb-24 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p style={{ opacity: subOpacity, y: subY }} className="font-mono text-muted-foreground text-xs md:text-sm tracking-[0.3em] font-medium mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary block" /> ARCHIVE & CHRONICLES
              </motion.p>
              <motion.h1
                style={{ scale: titleScale, opacity: titleOpacity, transformOrigin: "left bottom" }}
                className="text-[12vw] leading-[0.85] font-serif font-bold text-foreground tracking-tighter selection:bg-primary selection:text-primary-foreground will-change-transform"
              >
                LITERARY <br />
                <span className="text-secondary italic font-light ml-[10vw]">FRAGMENTS.</span>
              </motion.h1>
              <motion.div style={{ opacity: subOpacity, y: subY }} className="mt-12 md:mt-20 flex flex-col md:flex-row gap-8 md:gap-24">
                <p className="font-mono text-xs md:text-sm text-muted-foreground max-w-sm leading-relaxed border-l border-border pl-4 uppercase tracking-widest">
                  HUSTeread Activity Log.<br />
                  Reflections, gatherings,<br/>
                  and moments in text.
                </p>
                <p className="font-serif text-lg md:text-xl text-foreground max-w-md italic leading-relaxed">
                  {'"每一次聚合，都是思想与文字共振的瞬间。记录那些发生在这个校园里的阅读轨迹。"'}
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Extreme gradient bottom fade */}
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </>
      )}
    </ShrinkHero>
  );
}

function StatsBar() {
  const stats = [
    { value: "05", label: "YEARS CONSECUTIVE" },
    { value: "28", label: "FESTIVAL SECTIONS" },
    { value: "2k+", label: "PEAK ATTENDANCE" },
    { value: "∞", label: "IDEAS SHARED" },
  ];

  return (
    <div className="w-full border-y border-border/40 py-8 px-6 md:px-16 bg-background flex flex-wrap gap-12 md:gap-24 justify-between md:justify-start overflow-hidden">
      {stats.map((s, i) => (
        <motion.div 
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="flex flex-col"
        >
          <span className="text-4xl md:text-6xl font-serif font-bold text-foreground tabular-nums tracking-tighter">
            {s.value}
          </span>
          <span className="text-[10px] md:text-xs font-mono text-muted-foreground uppercase tracking-widest mt-2">{s.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ListRow({ event, index }: { event: (typeof events)[0], index: number }) {
  const isPast = event.era === "past";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative border-b border-border/40 pb-12 pt-12 flex flex-col md:flex-row gap-6 md:gap-16 items-start"
    >
      {/* Brutalist Metabar */}
      <div className="w-full md:w-1/4 shrink-0 flex flex-col gap-4 relative z-10">
        <div className="flex items-center gap-3">
           <span className="font-mono text-sm tracking-widest text-foreground bg-foreground/5 px-2 py-1 uppercase">{event.date}</span>
           {!isPast && (
             <span className="w-2 h-2 rounded-none bg-foreground animate-pulse" />
           )}
        </div>
        <div className="font-mono text-xs text-muted-foreground uppercase flex flex-col gap-1.5 opacity-60">
           <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {event.location}</span>
           <span className="flex items-center gap-2"><Users className="w-3 h-3" /> {event.organizer}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10">
        <div className="flex items-center gap-3 mb-4">
           <span className="text-2xl">{event.emoji}</span>
           <span className="font-mono text-[10px] tracking-widest uppercase border border-border/60 px-2 py-0.5 text-muted-foreground">{event.mode}</span>
           <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">• {event.season}</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground leading-[1.1] mb-6 group-hover:italic transition-[font-style,color] duration-500">
           {event.title}
        </h2>
        
        <blockquote className="font-serif italic text-lg text-muted-foreground border-l border-foreground/20 pl-4 mb-6 leading-relaxed max-w-2xl">
           {`"${event.quote}"`}
        </blockquote>

        <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl font-sans mb-8">
           {event.description}
        </p>

        {/* Collapsed/Hover Detail area using CSS height transition instead of layout for brutalist snap */}
        <div className="overflow-hidden max-h-0 opacity-0 translate-y-2 transition-[max-height,opacity,transform] duration-700 ease-[0.16,1,0.3,1] group-hover:max-h-[500px] group-hover:opacity-100 group-hover:translate-y-0 flex flex-col gap-4">
           <div className="h-px w-full bg-border/40 my-2" />
           <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 mb-1 flex items-center gap-2">
             <CornerDownRight className="w-3 h-3" /> Agenda Elements
           </div>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs text-foreground/60 w-full max-w-3xl">
             {event.activities.map((act, i) => (
               <li key={i} className="flex items-start gap-3">
                 <span className="text-foreground shrink-0 mt-0.5">[{i + 1}]</span>
                 <span className="leading-relaxed">{act}</span>
               </li>
             ))}
           </ul>
           
           {!isPast && (
             <div className="mt-8">
                <button className="bg-foreground text-background font-mono text-xs uppercase px-8 py-3 tracking-widest hover:bg-foreground/80 transition-colors">
                  Submit Interest
                </button>
             </div>
           )}
        </div>
      </div>
      
      {/* Absolute massive background watermark on hover */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-end pr-10 md:pr-24 opacity-0 group-hover:opacity-5 transition-opacity duration-1000">
         <event.icon className="w-64 h-64 md:w-96 md:h-96" />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function ActivitiesPage() {
  const { events: allEvents } = useActivities();
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? allEvents
    : allEvents.filter((e) => e.category === activeTab);

  // Group by year for asymmetric layout
  const byYear = filtered.reduce<Record<number, typeof events>>((acc, ev) => {
    if (!acc[ev.year]) acc[ev.year] = [];
    acc[ev.year].push(ev);
    return acc;
  }, {});
  const sortedYears = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-foreground selection:text-background">
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <StatsBar />

      <main className="px-6 md:px-16 pt-24 pb-32">
        {/* Typographic Filter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 border-b border-border/40 pb-8">
           <div className="flex items-center gap-6">
             <h2 className="text-xl font-mono uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-4">
               <span className="w-2 h-2 rounded-none bg-foreground block"/> CHRONICLES
             </h2>
             <Link
               href="/activities/roadmap"
               className="inline-flex items-center gap-2 px-4 py-3 min-h-[44px] border border-primary text-primary font-sans text-xs tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
             >
               <CalendarRange className="w-3.5 h-3.5" />
               2026 线路图
             </Link>
           </div>
           <div className="flex flex-wrap gap-2 md:gap-8 font-mono text-xs uppercase tracking-widest">
             {TABS.map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`px-3 py-2 min-h-[44px] transition-colors duration-300 relative ${activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"}`}
               >
                 {tab.label}
                 {activeTab === tab.id && (
                   <motion.div layoutId="activeTabUnderline" className="absolute -bottom-2 left-0 right-0 h-px bg-foreground" />
                 )}
               </button>
             ))}
           </div>
        </div>

        {/* 90/10 Extreme Asymmetric Timeline */}
        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-16">
           {sortedYears.length === 0 ? (
              <div className="w-full h-64 flex items-center justify-center font-mono text-muted-foreground uppercase tracking-widest">NO RECORDS FOUND.</div>
           ) : (
             <div className="w-full space-y-32">
               {sortedYears.map((year) => (
                 <section key={year} className="relative flex flex-col md:flex-row gap-8 md:gap-16 group/year">
                   {/* Giant Sticky Year on the left - Typographic Brutalism */}
                   <div className="w-full md:w-1/5 shrink-0 relative">
                     <div className="md:sticky md:top-32 font-serif text-6xl md:text-8xl lg:text-[10rem] font-bold text-foreground/5 tracking-tighter leading-none select-none transition-colors duration-500 group-hover/year:text-foreground/10">
                       {year}
                     </div>
                   </div>

                   {/* Event Logs on the right */}
                   <div className="flex-1 w-full border-t border-border/40 mt-6 md:mt-16">
                     {byYear[year].map((ev, i) => (
                       <ListRow key={ev.id} event={ev} index={i} />
                     ))}
                   </div>
                 </section>
               ))}
             </div>
           )}
        </div>
      </main>

      {/* Massive Brutal Footer CTA */}
      <div className="w-full border-t border-border bg-foreground text-background flex flex-col items-center justify-center py-32 px-6 md:px-16 text-center overflow-hidden relative">
         <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
         <p className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground/80 mb-8 z-10">ENGAGE WITH THE NARRATIVE</p>
         <h2 className="text-5xl md:text-8xl font-serif font-bold tracking-tighter max-w-4xl leading-[0.9] z-10 mb-12">
            THE NEXT PAGE IS <br/><span className="italic font-light opacity-60">YOURS TO WRITE.</span>
         </h2>
         <div className="flex flex-col sm:flex-row gap-6 z-10">
            <button className="bg-background text-foreground font-mono text-sm uppercase px-10 py-4 tracking-widest hover:bg-muted transition-colors">
              VIEW 2026 AGENDA
            </button>
            <button className="border border-background/20 font-mono text-sm uppercase px-10 py-4 tracking-widest hover:bg-background/10 transition-colors">
              SUBSCRIBE TO MANIFESTO
            </button>
         </div>
      </div>
    </div>
  );
}

