"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus, Clock, Heart, MoveRight, Search, Flame, Hash, Filter } from "lucide-react";

const trendingTags = ["拉美文学", "存在主义", "博尔赫斯", "阅读方法论", "秋季书单"];

const posts = [
  { id: 1, author: "青空", content: "『我们读过的书，最终都会成为我们的骨和肉。』虽然烂俗，坐在图书馆窗边，却觉得贴切。", likes: 24, replies: 5, time: "2 小时前", initial: "青", tags: ["随感"] },
  { id: 2, author: "木心先生的猫", content: "有没有人推荐一下关于古希腊哲学的入门读物？最近在啃罗素的《西方哲学史》，但实在太像流水账了，想找点偏故事性或者思想演变剖析的。", likes: 8, replies: 12, time: "5 小时前", initial: "木", tags: ["求书推荐", "哲学"] },
  { id: 3, author: "Sunlighter", content: "刚刚读完了昨晚分享会上大家讨论的那本拉美文学，结尾跨越百年的孤独宿命感非常震撼。被蚂蚁搬走的桥段简绝唱。", likes: 45, replies: 3, time: "昨天 22:30", initial: "S", tags: ["拉美文学", "书评"] },
  { id: 4, author: "行者", content: "阅读就像是在别人的思想里散步。", likes: 12, replies: 1, time: "3 天前", initial: "行", tags: ["随感"] },
  { id: 5, author: "Lumos", content: "今天复习了卡尔维诺的《看不见的城市》。每次读都能在字里行间发现新的隐式几何结构，这真的是用文字在建造立体空间啊，令人着迷。", likes: 33, replies: 8, time: "4 天前", initial: "L", tags: ["经典重读"] },
  { id: 6, author: "岛屿", content: "求一份社科学科的经典书单，最好是社会学入门的。想系统性了解下结构主义和符号学的基础。", likes: 5, replies: 2, time: "上周", initial: "岛", tags: ["求书推荐", "社会学"] },
];

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.includes(searchQuery) || post.author.includes(searchQuery);
    const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground pb-32">
      
      {/* 1. Header & Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full px-6 md:px-16 pt-24 md:pt-32 pb-16 border-b-[3px] border-foreground flex justify-between items-end flex-wrap gap-12"
      >
        <div className="relative">
          <p className="font-sans text-xs md:text-sm tracking-[0.4em] text-muted-foreground flex items-center gap-4 mb-4">
            <span className="w-12 h-[2px] bg-primary" /> MICRO DISCOURSE
          </p>
          <h1 className="flex flex-col font-serif font-bold text-foreground tracking-tighter mix-blend-multiply dark:mix-blend-screen w-full">
            <span className="text-[15vw] md:text-[8vw] leading-[0.8] mb-2 md:mb-6 text-foreground">思维</span>
            <div className="flex items-center gap-4 md:gap-8 pl-[5vw] md:pl-[4vw]">
              <span className="w-16 md:w-32 h-[3px] bg-foreground/80 block" />
              <span className="text-[15vw] md:text-[8vw] leading-[0.8] text-muted-foreground/60 italic font-light">回声广场</span>
            </div>
          </h1>
        </div>

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
            <button className="flex items-center gap-3 bg-foreground text-background font-sans text-xs tracking-widest px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-colors group">
              发起对白 <MessageSquarePlus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. Trending & Metadata Bar */}
      <div className="w-full px-6 md:px-16 py-6 border-b border-border flex flex-wrap justify-between items-center gap-8 bg-muted/20">
        <div className="flex flex-wrap items-center gap-4 md:gap-8 font-sans text-xs tracking-widest">
          <span className="flex items-center gap-2 text-primary font-bold"><Flame className="w-4 h-4" /> 探讨脉络:</span>
          <button 
            onClick={() => setActiveTag(null)}
            className={`hover:text-foreground transition-colors ${activeTag === null ? "text-foreground font-bold" : "text-muted-foreground"}`}
          >
            全部
          </button>
          {trendingTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`flex items-center gap-1 hover:text-foreground transition-colors ${activeTag === tag ? "text-foreground font-bold" : "text-muted-foreground"}`}
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
        <AnimatePresence mode="popLayout">
          {filteredPosts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 text-center font-sans tracking-widest text-muted-foreground uppercase"
            >
              未找到思想共振
            </motion.div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {filteredPosts.map((post, i) => (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="break-inside-avoid group relative flex flex-col border-[2px] border-foreground bg-background p-8 md:p-10 hover:bg-muted/30 transition-colors duration-500 w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]"
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
                  <p className="font-serif text-xl md:text-2xl leading-[1.6] text-foreground mb-12 relative z-10 break-words group-hover:italic transition-all duration-700 tracking-wide">
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
        </AnimatePresence>
      </div>
    </div>
  );
}
