"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useScrollShrink, type ShrinkConfig } from "@/hooks/useScrollShrink";

export interface ShrinkRenderProps {
  /** 大标题缩放 1→0.35 */
  titleScale: MotionValue<number>;
  /** 大标题透明度 1→0 */
  titleOpacity: MotionValue<number>;
  /** 副文本透明度 1→0 */
  subOpacity: MotionValue<number>;
  /** 副文本 Y 偏移 0→30 */
  subY: MotionValue<number>;
  isSticky: boolean;
}

interface ShrinkHeroProps extends ShrinkConfig {
  stickyTitle: string;
  className?: string;
  children: (props: ShrinkRenderProps) => React.ReactNode;
}

export function ShrinkHero({
  stickyTitle,
  className = "",
  children,
  ...config
}: ShrinkHeroProps) {
  const { heroRef, progress, titleScale, titleOpacity, subOpacity, subY, isSticky } =
    useScrollShrink(config);

  const stickyOpacity = useTransform(progress, [0.8, 1], [0, 1]);

  return (
    <>
      <div ref={heroRef} className={`relative ${className}`}>
        {children({ titleScale, titleOpacity, subOpacity, subY, isSticky })}
      </div>

      <motion.div
        style={{ opacity: stickyOpacity }}
        className={`sticky top-12 md:top-16 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm transition-shadow ${
          isSticky ? "shadow-sm pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="px-6 md:px-16 py-3 md:py-4">
          <h2 className="font-serif font-bold text-foreground tracking-tight text-xl md:text-2xl truncate">
            {stickyTitle}
          </h2>
        </div>
      </motion.div>
    </>
  );
}
