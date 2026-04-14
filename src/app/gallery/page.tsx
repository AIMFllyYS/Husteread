"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";

// Mock masonry data demonstrating varied heights for the photo wall
const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000", alt: "读书会现场", height: "h-[300px]", caption: "《百年的孤独》精读分享会" },
  { id: 2, src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000", alt: "讲书", height: "h-[450px]", caption: "文学与电影的互文" },
  { id: 3, src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000", alt: "图书馆的角落", height: "h-[350px]", caption: "初雪，一个人读书" },
  { id: 4, src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000", alt: "沉浸式阅读", height: "h-[400px]", caption: "草坪读诗夜" },
  { id: 5, src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000", alt: "摆满书的桌子", height: "h-[300px]", caption: "Sunlight 周末沙龙" },
  { id: 6, src: "https://images.unsplash.com/photo-1476275466078-4007374efac4?q=80&w=1000", alt: "手边的咖啡和书", height: "h-[480px]", caption: "咖啡与哲学" },
  { id: 7, src: "https://images.unsplash.com/photo-1524578974012-ef36c84b4233?q=80&w=1000", alt: "书本特写", height: "h-[360px]", caption: "二手书交换活动" },
  { id: 8, src: "https://images.unsplash.com/photo-1510172951991-856a654063f9?q=80&w=1000", alt: "讲座", height: "h-[400px]", caption: "人文讲坛记录" },
];

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 mb-16"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/10 rounded-full blur-md" />
            <span className="relative inline-flex p-5 rounded-full bg-card border border-border shadow-sm text-primary">
              <Camera className="w-8 h-8" strokeWidth={1.5} />
            </span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">照片墙</h1>
        <p className="text-lg text-muted-foreground font-serif italic max-w-lg mx-auto">
          "时间会流逝，但光影被永远定格于纸上。"
        </p>
      </motion.div>

      {/* Masonry Layout via CSS Columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % 4) * 0.1, duration: 0.6, ease: "easeOut" }}
            className={`relative break-inside-avoid overflow-hidden rounded-sm border-[6px] border-[#FFFDF8] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] transform transition-transform duration-500 hover:scale-[1.03] group ${photo.height} hover:z-10`}
          >
            <div className="h-full w-full flex flex-col relative overflow-hidden">
              {/* Image with subtle sepia reading filter */}
              <img 
                src={photo.src} 
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110 sepia-[15%] group-hover:sepia-0 brightness-95"
                loading="lazy"
              />
              
              {/* Hover Caption Details */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 h-1/2">
                <p className="text-[#F8F5F0] font-serif font-medium tracking-wide drop-shadow-md text-lg pb-3">
                  『 {photo.caption} 』
                </p>
                <div className="w-8 h-[2px] bg-primary/80" />
              </div>
            </div>
            
            {/* Vintage Film Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
            
            {/* Elegant inner shadow for print feel */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.15)]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
