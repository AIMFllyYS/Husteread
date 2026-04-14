"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { useRouter } from "next/navigation";

type Step = "email" | "code";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const codeInputRef = useRef<HTMLInputElement>(null);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendCode = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error?.message || "发送失败");
        return;
      }
      setStep("code");
      setCountdown(60);
      setTimeout(() => codeInputRef.current?.focus(), 100);
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  }, [email]);

  const handleVerifyCode = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error?.message || "验证失败");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  }, [email, code, router]);

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div
        className="w-full max-w-sm rounded-2xl border p-8 space-y-6"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            📖 HUSTERead
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {step === "email" ? "输入邮箱以接收验证码" : `验证码已发送至 ${email}`}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            step === "email" ? handleSendCode() : handleVerifyCode();
          }}
          className="space-y-4"
        >
          {step === "email" ? (
            <Input
              label="邮箱地址"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          ) : (
            <Input
              ref={codeInputRef}
              label="验证码"
              type="text"
              inputMode="numeric"
              placeholder="6 位数字"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              required
              autoFocus
            />
          )}

          {error && (
            <p className="text-sm" style={{ color: "var(--error)" }}>
              {error}
            </p>
          )}

          <Button type="submit" loading={loading} className="w-full">
            {step === "email" ? "发送验证码" : "验证并登录"}
          </Button>

          {/* Step navigation */}
          {step === "code" && (
            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => { setStep("email"); setCode(""); setError(""); }}
                className="underline"
                style={{ color: "var(--muted)" }}
              >
                换个邮箱
              </button>
              <button
                type="button"
                onClick={handleSendCode}
                disabled={countdown > 0 || loading}
                className="disabled:opacity-50"
                style={{ color: "var(--color-primary)" }}
              >
                {countdown > 0 ? `${countdown}s 后可重发` : "重新发送"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
