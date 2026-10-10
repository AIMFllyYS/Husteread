"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquarePlus, Clock, Heart, MoveRight, Search, Flame, Hash, Filter } from "lucide-react";
import { ShrinkHero } from "@/components/ui/ShrinkHero";

const trendingTags = ["Tonight", "活动回顾", "游园会", "网站建设", "讨论"];

type Post = {
  id: number | string;
  author: string;
  content: string;
  likes: number;
  replies: number;
  time: string;
  initial: string;
  tags: string[];
};

const fallbackPosts: Post[] = [
  { id: 1, author: "覃星智", content: "童心拾梦征文活动圆满结束！16位同学参与，13篇投稿，每一篇都是对童年最真挚的回忆。感谢大家的参与，期待下一次活动！", likes: 24, replies: 5, time: "2021.06.02", initial: "覃", tags: ["活动回顾"] },
  { id: 2, author: "刘岳松", content: "书海寻踪游戏的题库已经整理好了，分为李白专场、杜甫专场、苏轼专场和杂烩场。社团文化节当天大家来挑战！", likes: 8, replies: 12, time: "2025.04.15", initial: "刘", tags: ["游园会", "游戏策划"] },
  { id: 3, author: "聂旭凯", content: "上次 Tonight 读书会讨论了游戏与文学结合的可能性，大家的观点很有意思。有人认为游戏本身就是文学，有人觉得只是载体。下次继续聊！", likes: 15, replies: 3, time: "2022.11.20", initial: "聂", tags: ["Tonight", "讨论"] },
  { id: 4, author: "汪欣悦", content: "网站不只是展示页，还要承担留痕、投稿、互动、沉淀资料的长期作用。群聊负责热闹，网站负责归档。", likes: 12, replies: 1, time: "2026.03.29", initial: "汪", tags: ["网站建设"] },
  { id: 5, author: "罗振星", content: "社团文化节物资采购清单已更新：手绘明信片六套、华科大书签20枚、书籍8本。大家有补充的吗？", likes: 6, replies: 8, time: "2025.04.10", initial: "罗", tags: ["游园会", "物资"] },
  { id: 6, author: "何恩泽", content: "立冬时节的 Tonight 读书会，在西华园文化餐吧聊了各自家乡的立冬习俗，还做了书籍漂流。氛围很好，下次继续！", likes: 18, replies: 2, time: "2025.11.08", initial: "何", tags: ["Tonight", "活动回顾"] },
];

function usePosts() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchPosts() {
      try {
        const res = await fetch("/api/forum?limit=20");
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        if (!cancelled && json.success && json.data?.items?.length > 0) {
          const mapped: Post[] = json.data.items.map((item: Record<string, unknown>) => ({
            id: item.id,
            author: "读书会成员",
            content: (item.content as string) || "",
            likes: (item.likes as number) || 0,
            replies: 0,
            time: new Date(item.created_at as string).toLocaleDateString("zh-CN"),
            initial: "书",
            tags: ["讨论"],
          }));
          setPosts(mapped);
        }
      } catch {
        // fallback to mock
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchPosts();
    return () => { cancelled = true; };
  }, []);

  return { posts, loading };
}

export default function ForumPage() {
  const { posts } = usePosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 180);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !debouncedQuery ||
        post.content.includes(debouncedQuery) ||
        post.author.includes(debouncedQuery);
      const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [activeTag, debouncedQuery, posts]);

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground pb-32">
      
      {/* 1. Header & Navigation */}
      <ShrinkHero
        stickyTitle="思维 · 回声广场"
        className="w-full px-6 md:px-16 pt-24 md:pt-32 pb-16 border-b-[3px] border-foreground flex justify-between items-end flex-wrap gap-12"
      >
        {({ titleScale, titleOpacity, subOpacity, subY }) => (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <motion.p style={{ opacity: subOpacity, y: subY }} className="font-sans text-xs md:text-sm tracking-[0.4em] text-muted-foreground flex items-center gap-4 mb-4">
                <span className="w-12 h-[2px] bg-primary" /> MICRO DISCOURSE
              </motion.p>
              <motion.h1
                style={{ scale: titleScale, opacity: titleOpacity, transformOrigin: "left bottom" }}
                className="blend-heavy flex flex-col font-serif font-bold text-foreground tracking-tighter mix-blend-multiply dark:mix-blend-screen w-full will-change-transform"
              >
                <span className="text-[12vw] md:text-[8vw] leading-[0.8] mb-2 md:mb-6 text-foreground">思维</span>
                <div className="flex items-center gap-4 md:gap-8 pl-[5vw] md:pl-[4vw]">
                  <motion.span style={{ opacity: subOpacity }} className="w-12 md:w-32 h-[3px] bg-foreground/80 block" />
                  <span className="text-[12vw] md:text-[8vw] leading-[0.8] text-muted-foreground/60 italic font-light">回声广场</span>
                </div>
              </motion.h1>
            </motion.div>

            {/* Search & Action Interface */}
            <div className="flex flex-col gap-6 w-full md:w-auto md:min-w-[400px]">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索思维碎片..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-[2px] border-foreground px-12 py-4 font-sans text-sm tracking-widest placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0"
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="font-sans text-xs tracking-widest text-muted-foreground flex items-center gap-2 uppercase">
                  <Filter className="w-3 h-3" /> 最新涌现
                </div>
                <button className="flex items-center gap-3 bg-foreground text-background font-sans text-xs tracking-widest px-8 py-3 min-h-[48px] hover:bg-primary hover:text-primary-foreground transition-colors group">
                  发起对白 <MessageSquarePlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </ShrinkHero>

      {/* 2. Trending & Metadata Bar */}
      <div className="w-full px-6 md:px-16 py-6 border-b border-border flex flex-wrap justify-between items-center gap-8 bg-muted/20">
        <div className="flex flex-wrap items-center gap-4 md:gap-8 font-sans text-xs tracking-widest">
          <span className="flex items-center gap-2 text-primary font-bold"><Flame className="w-4 h-4" /> 探讨脉络:</span>
          <button 
            onClick={() => setActiveTag(null)}
            className={`py-2 min-h-[44px] hover:text-foreground transition-colors ${activeTag === null ? "text-foreground font-bold" : "text-muted-foreground"}`}
          >
            全部
          </button>
          {trendingTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`flex items-center gap-1 py-2 min-h-[44px] hover:text-foreground transition-colors ${activeTag === tag ? "text-foreground font-bold" : "text-muted-foreground"}`}
            >
              <Hash className="w-3 h-3"/> {tag}
            </button>
          ))}
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase flex gap-6">
          <span>Total Records: {posts.length}</span>
          <span>Online Thinkers: 12</span>
        </div>
      </div>

      {/* 3. Masonry Wall of Echoes */}
      <div className="w-full px-6 md:px-16 pt-16 mx-auto">
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center font-sans tracking-widest text-muted-foreground uppercase"
          >
            未找到思想共振
          </motion.div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="break-inside-avoid group relative flex flex-col border-[2px] border-foreground bg-background p-6 md:p-10 hover:bg-muted/30 transition-colors duration-500 w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]"
              >
                  {/* Header inside card */}
                  <div className="flex justify-between items-start mb-8 border-b-2 border-foreground pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 border border-foreground flex items-center justify-center font-serif text-2xl font-bold bg-transparent group-hover:bg-foreground group-hover:text-background transition-colors duration-500">
                        {post.initial}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans font-bold text-foreground tracking-widest text-sm">
                          {post.author}
                        </span>
                        <span className="font-sans text-[10px] tracking-widest text-muted-foreground mt-1">
                          <Clock className="w-3 h-3 inline mr-1" /> {post.time}
                        </span>
                      </div>
                    </div>
                    <div className="font-mono text-[10px] tracking-wider text-muted-foreground/60 text-right">
                      ID_{String(post.id).padStart(4, '0')}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {post.tags.map(t => (
                      <span key={t} className="font-sans text-[10px] tracking-widest uppercase border border-border px-2 py-1 text-muted-foreground">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Main Fragment */}
                  <p className="font-serif text-xl md:text-2xl leading-[1.6] text-foreground mb-12 relative z-10 break-words group-hover:italic transition-[font-style] duration-700 tracking-wide">
                    {post.content}
                  </p>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between border-t border-dashed border-border/80 pt-6 mt-auto">
                    <div className="flex items-center gap-6 font-sans text-xs tracking-widest">
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer group/btn uppercase">
                        <Heart className="w-3 h-3 group-hover/btn:fill-primary" /> {post.likes} 共鸣
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer uppercase">
                        <MessageSquarePlus className="w-3 h-3" /> {post.replies} 对白
                      </button>
                    </div>
                    <button className="font-sans text-xs flex items-center gap-2 border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors">
                      介入 <MoveRight className="w-3 h-3" />
                    </button>
                  </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
