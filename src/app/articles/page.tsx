"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, BookMarked, Eye } from "lucide-react";

const categories = ["全部分类", "读书笔记", "随笔日记", "深度书评"];
const articles = [
  { id: 1, title: "自由的边界：两百年的困惑与重塑", summary: "探讨以塞亚·伯林的两种自由概念在当下社群环境的映射。我们是否真的拥有免于饥饿与恐惧的消极自由？又是否有追求自我实现的积极自由？", author: "老舍", date: "2026.03.18", category: "深度书评", featured: true, words: "12,400", time: "45 MIN", views: "3.2K" },
  { id: 2, title: "在《被讨厌的勇气》中找寻自我", summary: "阿德勒心理学告诉我们，决定我们自身的不是过去的经历，而是我们赋予经历的意义。", author: "林夕", date: "2026.03.15", category: "读书笔记", featured: false, words: "3,200", time: "12 MIN", views: "1.5K" },
  { id: 3, title: "午后阳光与《尤利西斯》读本", summary: "意识流小说的巅峰之作，虽然被公认为天书般难读，但由于无逻辑的蔓延，反而给予了某种自由。", author: "书友 B", date: "2026.03.10", category: "随笔日记", featured: false, words: "5,800", time: "20 MIN", views: "890" },
  { id: 4, title: "如何建立个人的阅读体系", summary: "不再被碎片化信息裹挟，摆脱信息焦虑，在这个狂躁的时代，建立属于你自己的精神花园。", author: "管理员", date: "2026.03.05", category: "随笔日记", featured: false, words: "4,500", time: "15 MIN", views: "4.1K" },
  { id: 5, title: "百年孤独中的因果闭环", summary: "马孔多究竟是一个真实的村庄，还是整个拉丁美洲命运的缩影？从第一代到第七代，所有的繁华与毁灭早已刻在羊皮卷上。", author: "南山", date: "2026.02.28", category: "深度书评", featured: false, words: "8,900", time: "30 MIN", views: "2.7K" },
  { id: 6, title: "福柯与权力的微观物理学", summary: "权力并非自上而下的压迫，而是弥散在规训与惩罚的网络之中。我们如何看待现代社会的敞视监狱？", author: "哲学爱好者", date: "2026.02.15", category: "读书笔记", featured: false, words: "6,200", time: "25 MIN", views: "1.2K" },
];

export default function ArticlesPage() {
  const [activeTab, setActiveTab] = useState("全部分类");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter(a => {
    if (a.featured) return false;
    const matchesTab = activeTab === "全部分类" || a.category === activeTab;
    const matchesSearch = a.title.includes(searchQuery) || a.author.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const featured = articles.find(a => a.featured) || articles[0];

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-foreground selection:text-background w-full pb-32">
      
      {/* 1. Header (Macro typography bleed) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full px-6 md:px-16 pt-24 md:pt-32 pb-12 flex flex-col justify-between items-start border-b-[3px] border-foreground gap-8"
      >
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="w-full">
            <p className="font-sans text-xs tracking-[0.4em] text-muted-foreground mb-4 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-primary" /> LITERARY ARCHIVE
            </p>
            <h1 className="flex flex-col font-serif font-bold text-foreground tracking-tighter mix-blend-multiply dark:mix-blend-screen w-full">
              <span className="text-[12vw] sm:text-[10vw] leading-[0.8] mb-4 text-foreground">浩瀚书卷</span>
              <div className="flex items-center gap-4 md:gap-8 justify-end w-full pr-[5vw]">
                <span className="w-16 md:w-32 h-[2px] bg-foreground/80 block" />
                <span className="text-[12vw] sm:text-[10vw] leading-[0.8] text-muted-foreground/60 italic font-light">与沉淀</span>
              </div>
            </h1>
          </div>
        </div>
      </motion.div>

      {/* 2. Editorial Featured Section (Newspaper Layout) */}
      <div className="w-full px-6 md:px-16 pt-16 flex flex-col xl:flex-row gap-16 xl:gap-24 border-b border-border pb-24">
        {/* Left: Hero Article */}
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
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold text-foreground leading-[1.1] group-hover:text-primary transition-colors max-w-4xl tracking-tight">
              {featured.title}
            </h2>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-12 xl:gap-24 mt-auto">
            <p className="font-serif italic text-2xl md:text-3xl leading-relaxed text-muted-foreground flex-1 m-0">
              「{featured.summary}」
            </p>
            <div className="flex flex-col justify-end w-full md:w-48 shrink-0 pb-2">
               <div className="font-sans text-sm tracking-widest border-t border-border pt-4 mt-auto space-y-2">
                 <div>记录者：<span className="font-bold">{featured.author}</span></div>
                 <div className="text-muted-foreground text-xs">预计阅读：{featured.time}</div>
               </div>
               <Link href={`/articles/${featured.id}`} className="mt-8 flex items-center justify-between gap-3 bg-background text-foreground border border-foreground font-sans text-xs uppercase px-6 py-4 tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors">
                 翻阅全文 <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
          </div>
        </motion.article>
      </div>

      {/* 3. The Grand Archive (Dense Data Table) */}
      <div className="w-full px-6 md:px-16 pt-24 min-h-[50vh]">
        
        {/* Archive Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 border-b-2 border-foreground pb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-widest flex items-center gap-4 mb-8">
              <span className="w-3 h-3 bg-primary block"/> 往期简牍 / ARCHIVES
            </h2>
            <div className="flex flex-wrap items-center gap-4 md:gap-8 font-sans text-sm tracking-widest">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative pb-2 transition-colors ${
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
            <AnimatePresence>
              <motion.tbody>
                {filtered.map((art) => (
                  <motion.tr
                    key={art.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, display: "none" }}
                    transition={{ duration: 0.4 }}
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
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-32 text-center font-sans tracking-widest text-muted-foreground uppercase">
                      未检索到相关简牍。
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

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
