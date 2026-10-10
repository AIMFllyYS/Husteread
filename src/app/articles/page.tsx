"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, BookMarked, Eye } from "lucide-react";
import { ShrinkHero } from "@/components/ui/ShrinkHero";

const categories = ["全部分类", "读书笔记", "随笔日记", "深度书评"];

const CATEGORY_MAP: Record<string, string> = {
  BOOK_REVIEW: "深度书评",
  READING_NOTE: "读书笔记",
  DAILY_SHARE: "随笔日记",
  SUNLIGHT: "随笔日记",
  OTHER: "随笔日记",
};

type Article = {
  id: number | string;
  title: string;
  summary: string;
  author: string;
  date: string;
  category: string;
  featured: boolean;
  words: string;
  time: string;
  views: string;
};

const fallbackArticles: Article[] = [
  { id: 1, title: "从阅读到表达：读书会的下一站", summary: "不只做坐着听的阅读会，更强调表达和参与感。写信、写片段、口头分享、绘画表达——让参与者有输入，也有输出。", author: "汪欣悦", date: "2026.03.29", category: "随笔日记", featured: true, words: "6,900", time: "25 MIN", views: "320" },
  { id: 2, title: "童心拾梦：那些关于童年的碎片与回响", summary: "每个人的心里都装着一片星空，那里有童年时的质朴纯真。六一征文活动中，16位同学用文字重拾童年记忆。", author: "覃星智", date: "2021.06.01", category: "读书笔记", featured: false, words: "3,200", time: "12 MIN", views: "160" },
  { id: 3, title: "游戏与文学结合的可能", summary: "游戏本身可以作为一种文学形式。从严肃文学到历史文学再到现代文学，游戏与文学的配合度以及实际案例探讨。", author: "Tonight 读书会", date: "2022.11.19", category: "深度书评", featured: false, words: "5,800", time: "20 MIN", views: "89" },
  { id: 4, title: "文学中的意难平", summary: "一起探讨文学中那些无力的瞬间——涉及严肃文学、历史文学、现代文学中让人意难平的段落与角色命运。", author: "Tonight 读书会", date: "2022.10.30", category: "深度书评", featured: false, words: "4,500", time: "15 MIN", views: "130" },
  { id: 5, title: "生活中重要的小事儿", summary: "今夜，我们将与生活琐事中的趣事再会，记载我们专属的回忆，有我们专属的语境。", author: "Tonight 读书会", date: "2023.04.01", category: "随笔日记", featured: false, words: "3,900", time: "14 MIN", views: "87" },
  { id: 6, title: "《窗边的小豆豆》：童年的质朴与纯真", summary: "黑柳彻子笔下的小豆豆，是令童年时期的我印象最深刻的故事之一。无忧无虑，充斥梦幻气息的巴学园。", author: "Galina", date: "2021.06.01", category: "读书笔记", featured: false, words: "2,800", time: "10 MIN", views: "50" },
];

function useArticles() {
  const [articles, setArticles] = useState<Article[]>(fallbackArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles?limit=20");
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        if (!cancelled && json.success && json.data?.items?.length > 0) {
          const mapped: Article[] = json.data.items.map((item: Record<string, unknown>, i: number) => ({
            id: item.id,
            title: item.title || "无标题",
            summary: item.summary || "",
            author: "读书会成员",
            date: new Date(item.created_at as string).toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, "."),
            category: CATEGORY_MAP[(item.category as string) || "OTHER"] || "随笔日记",
            featured: i === 0,
            words: "—",
            time: "—",
            views: String(item.view_count ?? 0),
          }));
          setArticles(mapped);
        }
      } catch {
        // fallback to mock data — already set
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchArticles();
    return () => { cancelled = true; };
  }, []);

  return { articles, loading };
}

function FeaturedSection({ featured }: { featured: Article }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end start"],
  });
  const featScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.55]);
  const featOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  return (
    <div ref={ref} className="relative w-full px-6 md:px-16 pt-16 flex flex-col xl:flex-row gap-16 xl:gap-24 border-b border-border pb-24">
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 group relative flex flex-col"
      >
        <div className="font-sans text-xs tracking-widest text-foreground uppercase mb-8 flex flex-wrap items-center gap-4 border-b border-dashed border-border/80 pb-4">
          <span className="bg-foreground text-background px-3 py-1 flex items-center gap-2">
            <BookMarked className="w-3 h-3" /> 卷首志 FEATURED
          </span>
          <span className="text-muted-foreground">{featured.date}</span>
          <span className="text-muted-foreground border-l border-border pl-4">{featured.category}</span>
          <span className="text-muted-foreground border-l border-border pl-4">{featured.words} 字</span>
        </div>

        <Link href={`/articles/${featured.id}`} className="block mb-12">
          <motion.h2
            style={{ scale: featScale, opacity: featOpacity, transformOrigin: "left top" }}
            className="text-3xl md:text-7xl lg:text-[5.5rem] font-serif font-bold text-foreground leading-[1.1] group-hover:text-primary transition-colors max-w-4xl tracking-tight will-change-transform"
          >
            {featured.title}
          </motion.h2>
        </Link>

        <div className="flex flex-col md:flex-row gap-12 xl:gap-24 mt-auto">
          <motion.p
            style={{ scale: featScale, opacity: featOpacity, transformOrigin: "left top" }}
            className="font-serif italic text-xl md:text-3xl leading-relaxed text-muted-foreground flex-1 m-0 will-change-transform"
          >
            「{featured.summary}」
          </motion.p>
          <div className="flex flex-col justify-end w-full md:w-48 shrink-0 pb-2">
            <div className="font-sans text-sm tracking-widest border-t border-border pt-4 mt-auto space-y-2">
              <div>记录者：<span className="font-bold">{featured.author}</span></div>
              <div className="text-muted-foreground text-xs">预计阅读：{featured.time}</div>
            </div>
            <Link href={`/articles/${featured.id}`} className="mt-8 flex items-center justify-between gap-3 bg-background text-foreground border border-foreground font-sans text-xs uppercase px-6 py-4 min-h-[48px] tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors">
              翻阅全文 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ArticlesPage() {
  const { articles, loading } = useArticles();
  const [activeTab, setActiveTab] = useState("全部分类");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 180);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (a.featured) return false;
      const matchesTab = activeTab === "全部分类" || a.category === activeTab;
      const matchesSearch =
        !debouncedQuery ||
        a.title.includes(debouncedQuery) ||
        a.author.includes(debouncedQuery);
      return matchesTab && matchesSearch;
    });
  }, [activeTab, debouncedQuery, articles]);

  const featured = articles.find(a => a.featured) || articles[0];

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-foreground selection:text-background w-full pb-32">
      
      {/* 1. Header (Macro typography bleed) */}
      <ShrinkHero
        stickyTitle="浩瀚书卷与沉淀"
        className="w-full px-6 md:px-16 pt-24 md:pt-32 pb-12 flex flex-col justify-between items-start border-b-[3px] border-foreground gap-8"
      >
        {({ titleScale, titleOpacity, subOpacity, subY }) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
          >
            <div className="w-full">
              <motion.p style={{ opacity: subOpacity, y: subY }} className="font-sans text-xs tracking-[0.4em] text-muted-foreground mb-4 flex items-center gap-4">
                <span className="w-12 h-[2px] bg-primary" /> LITERARY ARCHIVE
              </motion.p>
              <motion.h1
                style={{ scale: titleScale, opacity: titleOpacity, transformOrigin: "left bottom" }}
                className="blend-heavy flex flex-col font-serif font-bold text-foreground tracking-tighter mix-blend-multiply dark:mix-blend-screen w-full will-change-transform"
              >
                <span className="text-[12vw] sm:text-[10vw] leading-[0.8] mb-4 text-foreground">浩瀚书卷</span>
                <div className="flex items-center gap-4 md:gap-8 justify-end w-full pr-[5vw]">
                  <motion.span style={{ opacity: subOpacity }} className="w-16 md:w-32 h-[2px] bg-foreground/80 block" />
                  <span className="text-[12vw] sm:text-[10vw] leading-[0.8] text-muted-foreground/60 italic font-light">与沉淀</span>
                </div>
              </motion.h1>
            </div>
          </motion.div>
        )}
      </ShrinkHero>

      {/* 2. Editorial Featured Section (Newspaper Layout) */}
      <FeaturedSection featured={featured} />

      {/* 3. The Grand Archive (Dense Data Table) */}
      <div className="w-full px-6 md:px-16 pt-24 min-h-[50vh]">
        
        {/* Archive Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 border-b-2 border-foreground pb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-widest flex items-center gap-4 mb-8">
              <span className="w-3 h-3 bg-primary block"/> 往期简牍 / ARCHIVES
            </h2>
            <div className="flex flex-wrap items-center gap-2 md:gap-8 font-sans text-sm tracking-widest">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative px-3 py-2 min-h-[44px] transition-colors ${
                    activeTab === cat ? "text-foreground font-bold border-b-[2px] border-foreground" : "text-muted-foreground hover:text-foreground border-b-[2px] border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full lg:w-96 shrink-0">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="检索馆藏..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-border pl-8 pr-4 py-3 font-sans text-sm tracking-widest placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
        </div>

        {/* Dense Brutalist Table */}
        {loading ? (
          <div className="py-32 text-center font-sans tracking-widest text-muted-foreground uppercase animate-pulse">
            正在检索馆藏...
          </div>
        ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left font-serif min-w-[1000px]">
            <thead>
              <tr className="border-b-[1.5px] border-border text-muted-foreground font-sans text-xs tracking-widest uppercase">
                <th className="py-6 px-4 w-24 font-normal">NO.编目</th>
                <th className="py-6 px-4 w-32 font-normal">分类</th>
                <th className="py-6 px-4 font-normal">标题</th>
                <th className="py-6 px-4 w-32 font-normal">记录者</th>
                <th className="py-6 px-4 w-32 font-normal text-right">字数统计</th>
                <th className="py-6 px-4 w-36 font-normal text-right">收录日期</th>
              </tr>
            </thead>
            <tbody>
                {filtered.map((art) => (
                  <tr
                    key={art.id}
                    className="border-b border-dashed border-border/80 group hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="py-8 px-4 font-mono text-sm tracking-widest text-muted-foreground/60">
                      DOC_{(art.id).toString().padStart(3, '0')}
                    </td>
                    <td className="py-8 px-4 font-sans text-xs tracking-widest text-muted-foreground">
                      {art.category}
                    </td>
                    <td className="py-8 px-4">
                      <Link href={`/articles/${art.id}`} className="block">
                        <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors pr-8">
                          {art.title}
                        </span>
                        <div className="flex items-center gap-4 mt-3 font-sans text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {art.views} 阅读</span>
                          <span>| {art.time}</span>
                        </div>
                      </Link>
                    </td>
                    <td className="py-8 px-4 text-lg text-muted-foreground italic">
                      {art.author}
                    </td>
                    <td className="py-8 px-4 font-mono text-sm text-right text-muted-foreground tracking-widest">
                      {art.words}
                    </td>
                    <td className="py-8 px-4 font-mono text-sm text-right text-foreground tracking-widest">
                      {art.date}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-32 text-center font-sans tracking-widest text-muted-foreground uppercase">
                      未检索到相关简牍。
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
        )}

        {/* Paginator */}
        <div className="w-full flex justify-between items-center mt-12 pt-8 border-t border-border font-sans text-xs tracking-widest uppercase text-muted-foreground">
          <span>Currently displaying {filtered.length} chronicles</span>
          <div className="flex items-center gap-2">
             <button className="px-4 py-2 border border-border hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground" disabled>
               前翻 / PREV
             </button>
             <button className="px-4 py-2 border border-border hover:bg-foreground hover:text-background transition-colors">
               后翻 / NEXT
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
