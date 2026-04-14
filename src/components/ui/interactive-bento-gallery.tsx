"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface MediaItemType {
  id: number;
  type: "image" | "video";
  title: string;
  desc: string;
  url: string;
  fallbackUrl?: string;
  span: string;
}

type MediaCardProps = {
  item: MediaItemType;
  className?: string;
  onClick?: () => void;
};

const MediaItem = ({ item, className, onClick }: MediaCardProps) => {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = failed && item.fallbackUrl ? item.fallbackUrl : item.url;

  if (item.type === "video") {
    return (
      <video
        className={`${className ?? ""} h-full w-full object-cover`}
        onClick={onClick}
        playsInline
        muted
        loop
        preload="metadata"
      >
        <source src={item.url} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={item.title}
      className={`${className ?? ""} h-full w-full object-cover cursor-pointer`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      referrerPolicy="no-referrer"
    />
  );
};

type GalleryModalProps = {
  selectedItem: MediaItemType;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: MediaItemType) => void;
  mediaItems: MediaItemType[];
};

const GalleryModal = ({
  selectedItem,
  isOpen,
  onClose,
  onSelect,
  mediaItems,
}: GalleryModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="mx-auto flex h-full w-full max-w-6xl flex-col p-4"
      >
        <button
          className="ml-auto mb-3 rounded-full bg-white/80 p-2 text-foreground hover:bg-white"
          onClick={onClose}
          aria-label="关闭预览"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="relative flex-1 overflow-hidden rounded-xl border border-white/20 bg-black/30">
          <MediaItem item={selectedItem} className="h-full w-full object-contain bg-black/50" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-white">
            <h3 className="text-2xl font-bold font-serif mb-2">{selectedItem.title}</h3>
            <p className="text-base text-white/90 font-serif leading-relaxed">{selectedItem.desc}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 overflow-x-auto rounded-xl bg-white/10 p-2">
          {mediaItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-md border ${
                selectedItem.id === item.id ? "border-white" : "border-white/40"
              }`}
              aria-label={`预览 ${item.title}`}
            >
              <MediaItem item={item} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

interface InteractiveBentoGalleryProps {
  mediaItems: MediaItemType[];
  title: string;
  description: string;
}

export default function InteractiveBentoGallery({
  mediaItems,
  title,
  description,
}: InteractiveBentoGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
  const items = useMemo(() => mediaItems, [mediaItems]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
      <div className="mb-8 text-center">
        <motion.h1
          className="text-3xl font-bold text-foreground md:text-5xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          {description}
        </motion.p>
      </div>

      <AnimatePresence>
        {selectedItem ? (
          <GalleryModal
            selectedItem={selectedItem}
            isOpen
            onClose={() => setSelectedItem(null)}
            onSelect={setSelectedItem}
            mediaItems={items}
          />
        ) : null}
      </AnimatePresence>

      <div className="grid auto-rows-[120px] grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            className={`relative min-w-0 cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-card shadow-md ${item.span}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, type: "spring", stiffness: 260, damping: 24 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            onClick={() => setSelectedItem(item)}
          >
            <MediaItem item={item} className="absolute inset-0" />
            <motion.div 
              className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 flex flex-col justify-end p-4"
              whileHover={{ opacity: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <h3 className="relative line-clamp-1 text-base font-bold font-serif text-white">{item.title}</h3>
              <p className="relative line-clamp-2 text-xs text-white/80 font-serif mt-1">{item.desc}</p>
            </motion.div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

