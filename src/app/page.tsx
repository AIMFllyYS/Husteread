export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-24">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto space-y-8">
        {/* Logo / Brand */}
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight" style={{ color: "var(--color-primary)" }}>
            📖 HUSTERead
          </h1>
          <p className="text-lg" style={{ color: "var(--muted)" }}>
            华中科技大学读书会展示平台
          </p>
        </div>

        {/* Tagline */}
        <p className="text-xl leading-relaxed">
          记录与分享读书会的活动成果、会员文章与日常读书心得
        </p>

        {/* Status Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            backgroundColor: "var(--color-accent-soft)",
            color: "var(--color-primary-dark)",
            border: "1px solid var(--border)",
          }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Phase 1 — 基础架构搭建中
        </div>

        {/* Quick Links (placeholder) */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {[
            { icon: "📝", label: "文章分享", desc: "书评 · 读书笔记" },
            { icon: "📅", label: "活动展示", desc: "读书会活动" },
            { icon: "💬", label: "微型论坛", desc: "自由讨论" },
            { icon: "📸", label: "照片墙", desc: "精彩瞬间" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1 p-4 rounded-xl w-36 transition-all hover:scale-105"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <footer className="mt-16 text-center text-xs" style={{ color: "var(--muted)" }}>
        <p>⚠️ 本网站为非官方平台，与华中科技大学官方无任何隶属或授权关系</p>
        <p className="mt-1">
          Next.js 16 · React 19.2 · Tailwind v4 · TypeScript
        </p>
      </footer>
    </main>
  );
}
