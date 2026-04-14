"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, BookOpen, PenTool } from "lucide-react";

const EtheralShadow = dynamic(
  () => import("@/components/ui/etheral-shadow").then((m) => m.EtheralShadow),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* 1. Typographic Hero / Extreme Asymmetry (Chinese Focused) */}
      <section className="relative w-full h-[90vh] min-h-[700px] flex object-cover overflow-hidden bg-background border-b border-border">
        {/* Subtle background texture */}
        <div className="blend-heavy absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply dark:mix-blend-screen">
          <EtheralShadow
            color="var(--background)"
            animation={{ scale: 100, speed: 80 }}
            noise={{ opacity: 0.8, scale: 1.2 }}
            performanceMode="balanced"
          />
        </div>

        <div className="w-full flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-24 z-10 relative">
          
          {/* Vertical Decor Text */}
          <div className="absolute top-16 right-16 hidden md:flex font-serif text-muted-foreground/40 text-sm tracking-[0.6em]" style={{ writingMode: 'vertical-rl' }}>
            华中科技大学读书会 · 精神避难所
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-mono text-muted-foreground text-xs md:text-sm tracking-[0.4em] mb-8 flex items-center gap-4 uppercase">
              <span className="w-12 h-px bg-primary block" /> 
              HUSTeread
            </div>
            
            <h1 className="blend-heavy flex flex-col font-serif font-bold text-foreground tracking-tighter mix-blend-darken dark:mix-blend-lighten relative z-10 w-full mb-12">
              <span className="text-[15vw] sm:text-[12vw] leading-[0.8] mb-2 md:mb-6">字里行间</span>
              <div className="flex items-center gap-4 md:gap-12 pl-[5vw] md:pl-[10vw]">
                <span className="w-16 md:w-32 h-[2px] bg-foreground/80 block" />
                <span className="text-[18vw] sm:text-[14vw] leading-[0.8] text-primary italic">万物共振</span>
              </div>
            </h1>
          </motion.div>

          {/* Bottom CTA Block (Asymmetric) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-md border-l-2 border-primary pl-6 mt-8 flex flex-col gap-6"
          >
            <p className="font-serif text-lg md:text-xl text-foreground/80 leading-loose">
               沉浸书香，悦读人生。记录每一次思想的碰撞，分享每一份纯粹的感动。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 font-sans text-sm tracking-widest">
              <Link href="/activities" className="group flex justify-center items-center gap-4 bg-foreground text-background px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-500">
                <span>浏览活动纪实</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/articles" className="group flex justify-center items-center gap-4 border border-border bg-background text-foreground px-8 py-4 hover:bg-muted transition-colors duration-500">
                <span>阅读精华文章</span>
                <BookOpen className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Structured Data / Macro Typography Stats (Chinese) */}
      <section className="w-full border-b border-border bg-muted/30 text-foreground py-16 md:py-24 px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-x-0 md:divide-x divide-border/60">
          {[
            { value: "128", label: "场线下聚会", sub: "自2021年起" },
            { value: "3K+", label: "参与人次", sub: "独立的思想声音" },
            { value: "456", label: "篇共创文章", sub: "沉淀的文字记录" },
            { value: "90+", label: "位核心书友", sub: "持续活跃的同好" }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col md:px-8 first:pl-0"
            >
              <span className="text-6xl md:text-8xl font-serif font-bold tracking-tighter mb-4">{stat.value}</span>
              <span className="font-sans text-sm font-bold tracking-widest mb-1">{stat.label}</span>
              <span className="font-serif italic text-sm text-muted-foreground">{stat.sub}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Brutalist Vertical Narrative (Latest Articles) */}
      <section className="w-full py-24 px-6 md:px-16 overflow-hidden max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 border-b-2 border-foreground pb-8">
          <h2 className="text-2xl font-serif font-bold tracking-widest text-foreground flex items-center gap-4">
            <span className="w-3 h-3 rounded-none bg-primary block"/> 最新随笔与书评
          </h2>
          <Link href="/articles" className="font-sans text-sm tracking-widest border border-border px-4 py-2 hover:bg-foreground hover:text-background transition-colors flex items-center gap-2">
            进入文章归档 <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Main feature article */}
          <motion.article 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-7 group border border-border p-8 md:p-12 hover:bg-muted/30 transition-colors relative"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
               <span className="font-serif text-[8rem] leading-none text-primary italic">读</span>
            </div>

            <div className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-6 flex items-center gap-3">
              <span className="px-2 py-1 bg-foreground text-background">卷首栏目</span>
              <span>2026.03.18</span>
            </div>
            <Link href="/articles/1" className="block relative z-10">
              <h3 className="text-4xl md:text-6xl font-serif font-bold leading-[1.2] text-foreground mb-8 group-hover:text-primary transition-colors pr-12">
                自由的边界：<br/>两百年的困惑与重塑
              </h3>
            </Link>
            <p className="font-serif text-lg leading-relaxed text-muted-foreground italic mb-12 max-w-xl">
              「探讨以塞亚·伯林的两种自由概念在当下社群环境的映射。我们是否真的拥有免于饥饿与恐惧的消极自由？又是否有追求自我实现的积极自由？」
            </p>
            <div className="flex items-center gap-4 border-t border-dashed border-border/80 pt-6">
              <div className="w-10 h-10 border border-foreground flex items-center justify-center font-serif text-lg font-bold">老</div>
              <span className="font-sans text-sm tracking-widest">笔者：老舍</span>
            </div>
          </motion.article>

          {/* Secondary Stack */}
          <div className="md:col-span-5 flex flex-col gap-8">
            {[ 
              { title: "在《被讨厌的勇气》中找寻自我原点", author: "林夕", tag: "读书笔记" },
              { title: "午后阳光与《尤利西斯》读本", author: "书友 B", tag: "随笔日记" },
            ].map((art, i) => (
              <motion.article 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group border border-border p-8 flex flex-col hover:bg-muted/30 transition-colors h-full justify-between"
              >
                <div>
                  <div className="font-sans text-xs tracking-widest text-muted-foreground mb-6">
                    <span className="border-b border-primary pb-1">{art.tag}</span>
                  </div>
                  <Link href="/articles/2" className="block mb-8">
                    <h3 className="text-2xl font-serif font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                      {art.title}
                    </h3>
                  </Link>
                </div>
                <div className="font-sans text-xs tracking-widest text-muted-foreground flex items-center gap-3">
                  <PenTool className="w-3 h-3" /> 作者：{art.author}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
