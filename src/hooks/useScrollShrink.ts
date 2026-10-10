"use client";

import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

export interface ShrinkConfig {
  /** 副文本在前 N% 滚动内完全消失 (0-1)，默认 0.6 */
  subFadeEnd?: number;
}

export interface ShrinkValues {
  heroRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
  /** 大标题缩放 1→0.35 */
  titleScale: MotionValue<number>;
  /** 大标题透明度 1→0（在后半段渐隐） */
  titleOpacity: MotionValue<number>;
  /** 副文本透明度 1→0 */
  subOpacity: MotionValue<number>;
  /** 副文本 Y 偏移 0→30 */
  subY: MotionValue<number>;
  isSticky: boolean;
}

export function useScrollShrink(config: ShrinkConfig = {}): ShrinkValues {
  const { subFadeEnd = 0.6 } = config;
  const heroRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [heroHeight, setHeroHeight] = useState(1);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const measure = () => setHeroHeight(el.offsetHeight || 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, heroHeight], [0, 1]);

  // 大标题：整个滚动过程中从 1 缩到 0.35
  const titleScale = useTransform(progress, [0, 0.9], [1, 0.35]);
  // 大标题：后段渐隐，让 sticky 标题接管
  const titleOpacity = useTransform(progress, [0.6, 0.95], [1, 0]);

  // 副文本：前段快速消失
  const subOpacity = useTransform(progress, [0, subFadeEnd], [1, 0]);
  const subY = useTransform(progress, [0, subFadeEnd], [0, 30]);

  useMotionValueEvent(progress, "change", (v) => {
    setIsSticky(v >= 0.95);
  });

  return {
    heroRef,
    progress,
    titleScale,
    titleOpacity,
    subOpacity,
    subY,
    isSticky,
  };
}
