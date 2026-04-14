"use client";

import React, { CSSProperties } from "react";

// Type definitions
interface ResponsiveImage {
  src: string;
  alt?: string;
  srcSet?: string;
}

interface AnimationConfig {
  scale: number;
  speed: number;
}

interface NoiseConfig {
  opacity: number;
  scale: number;
}

interface ShadowOverlayProps {
  type?: "preset" | "custom";
  presetIndex?: number;
  customImage?: ResponsiveImage;
  sizing?: "fill" | "stretch";
  color?: string;
  animation?: AnimationConfig;
  noise?: NoiseConfig;
  performanceMode?: "high" | "balanced" | "low";
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export function EtheralShadow({
  sizing = "fill",
  color = "rgba(40, 40, 45, 1)",
  animation = { scale: 80, speed: 70 },
  noise = { opacity: 0.8, scale: 1 },
  performanceMode = "balanced",
  style,
  className,
  children,
}: ShadowOverlayProps) {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shouldAnimate =
    !reducedMotion && performanceMode !== "low" && animation && animation.scale > 0;
  const textureSize = `${Math.max(120, noise.scale * 200)}px`;
  const driftDuration = `${Math.max(20, 140 - animation.speed)}s`;
  const maskImage = "url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')";

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: performanceMode === "high" ? -24 : -12,
        }}
      >
        <div
          style={{
            backgroundColor: color,
            maskImage,
            maskSize: sizing === "stretch" ? "100% 100%" : "cover",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            width: "100%",
            height: "100%",
            transform: shouldAnimate ? "scale(1.02)" : "none",
            animation: shouldAnimate ? `etherealDrift ${driftDuration} linear infinite` : "none",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
        }}
      >
        {children}
      </div>

      {noise && noise.opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at center, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: textureSize,
            backgroundRepeat: "repeat",
            opacity: noise.opacity / 2,
            pointerEvents: "none",
            mixBlendMode: performanceMode === "high" ? "overlay" : "normal",
          }}
        />
      )}
    </div>
  );
}
