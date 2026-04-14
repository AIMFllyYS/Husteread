"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, ShieldAlert, ArrowRight, BookLock, Fingerprint } from "lucide-react";
import { verifyAdminPassword } from "./actions";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setError("");
    setIsLoading(true);

    try {
      const res = await verifyAdminPassword(password);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.error || "发生了未知异常");
      }
    } catch {
      setError("网络链路不稳定，密匙校验握手失败。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1A1612 0%, #2A2218 40%, #1E1A16 100%)" }}
    >
      {/* Animated paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}
      />

      {/* Decorative ink splash / calligraphy accent */}
      <div className="absolute top-[15%] left-[10%] text-[180px] font-serif text-white/[0.015] pointer-events-none select-none leading-none tracking-widest">
        读
      </div>
      <div className="absolute bottom-[10%] right-[8%] text-[240px] font-serif text-white/[0.012] pointer-events-none select-none leading-none tracking-widest rotate-12">
        卷
      </div>

      {/* Subtle grid lines like library card catalog */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "80px 80px" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[440px] mx-4"
      >
        {/* Main card - resembles an aged library entrance card */}
        <div className="relative bg-[#F6F1EA] border border-[#C8B89A]/40 shadow-[0_25px_60px_rgba(0,0,0,0.5),0_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Crimson top band */}
          <div className="h-[5px] bg-gradient-to-r from-[#7E1518] via-[#9B2226] to-[#7E1518]" />

          {/* Decorative corner marks */}
          <div className="absolute top-[5px] left-0 w-8 h-8 border-l-[2px] border-t-[2px] border-[#7E1518]/20 m-4" />
          <div className="absolute top-[5px] right-0 w-8 h-8 border-r-[2px] border-t-[2px] border-[#7E1518]/20 m-4" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-[2px] border-b-[2px] border-[#7E1518]/20 m-4" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-[2px] border-b-[2px] border-[#7E1518]/20 m-4" />

          <div className="px-10 pt-14 pb-12 md:px-14 md:pt-16 md:pb-14">
            {/* Icon */}
            <div className="flex justify-center mb-10">
              <motion.div
                animate={{ rotateY: isFocused ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 border-[2px] border-[#2A2218]/15 rounded-full flex items-center justify-center bg-[#EDE7DD] shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)]"
              >
                {isFocused ? (
                  <Fingerprint className="w-7 h-7 text-[#7E1518]" strokeWidth={1.5} />
                ) : (
                  <BookLock className="w-7 h-7 text-[#2A2218]/60" strokeWidth={1.5} />
                )}
              </motion.div>
            </div>

            {/* Title */}
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-[28px] font-serif font-bold tracking-[0.15em] text-[#2A2218]">
                典 · 藏 · 阁
              </h1>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-[1px] bg-[#C8B89A]/60" />
                <p className="text-[11px] font-mono text-[#8B7355] uppercase tracking-[0.3em]">
                  Administrator Console
                </p>
                <div className="w-12 h-[1px] bg-[#C8B89A]/60" />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                  <KeyRound className="w-4 h-4 text-[#8B7355]" strokeWidth={1.5} />
                </div>
                <input
                  type="password"
                  placeholder="输入管理密匙..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full bg-transparent border-b-[2px] border-[#C8B89A]/50 focus:border-[#7E1518] pl-8 pr-2 py-4 text-lg font-serif text-[#2A2218] focus:outline-none transition-colors duration-300 placeholder:text-[#C8B89A]/60"
                  autoComplete="off"
                  disabled={isLoading}
                />
                <motion.div
                  animate={{ scaleX: isFocused ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7E1518] origin-left"
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start gap-3 p-4 bg-[#9B2226]/5 border border-[#9B2226]/15 text-[#9B2226] text-sm font-medium leading-relaxed">
                      <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isLoading || !password}
                className="w-full relative overflow-hidden bg-[#2A2218] text-[#F6F1EA] py-4 font-serif font-bold text-[15px] tracking-[0.15em] hover:bg-[#7E1518] transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 group shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#F6F1EA]/30 border-t-[#F6F1EA] rounded-full animate-spin" />
                    验证中...
                  </span>
                ) : (
                  <>
                    启封 · 进入管理
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>

            {/* Footer notice */}
            <div className="mt-14 text-center flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#C8B89A]/40" />
                <div className="w-1.5 h-1.5 bg-[#7E1518]/30 rotate-45" />
                <div className="w-8 h-[1px] bg-[#C8B89A]/40" />
              </div>
              <p className="text-[10px] text-[#8B7355]/70 font-mono uppercase tracking-[0.25em]">
                Authorized Personnel Only · Logs Monitored
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
