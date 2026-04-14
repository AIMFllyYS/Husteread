export function Footer() {
  return (
    <footer
      className="border-t py-8 px-4 text-center text-xs"
      style={{ borderColor: "var(--border)", color: "var(--muted)" }}
    >
      <div className="max-w-5xl mx-auto space-y-2">
        <p className="font-medium" style={{ color: "var(--color-primary)" }}>
          📖 HUSTERead — 华科读书会展示平台
        </p>
        <p>⚠️ 本网站为非官方平台，与华中科技大学官方无任何隶属或授权关系</p>
        <p>
          Next.js 16 · React 19 · Tailwind v4 · Supabase
        </p>
      </div>
    </footer>
  );
}
