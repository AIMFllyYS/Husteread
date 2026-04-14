import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "个人中心" };

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirect=/dashboard");

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
        👤 个人中心
      </h1>

      <div
        className="rounded-xl border p-6 space-y-4"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: "var(--color-accent-soft)" }}
          >
            {user.nickname?.[0] ?? "U"}
          </div>
          <div className="space-y-1">
            <h2 className="font-bold text-lg">{user.nickname}</h2>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {user.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          <div>
            <p className="text-xs" style={{ color: "var(--muted)" }}>角色</p>
            <p className="text-sm font-medium">
              {user.role === "ADMIN" ? "🛡️ 管理员" : user.role === "MEMBER" ? "📖 会员" : "👁 游客"}
            </p>
          </div>
          <div>
            <p className="text-xs" style={{ color: "var(--muted)" }}>注册日期</p>
            <p className="text-sm font-medium">{formatDate(user.created_at)}</p>
          </div>
          <div>
            <p className="text-xs" style={{ color: "var(--muted)" }}>邮箱验证</p>
            <p className="text-sm font-medium">
              {user.email_verified ? "✅ 已验证" : "⏳ 未验证"}
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-center" style={{ color: "var(--muted)" }}>
        更多功能（我的文章、我的帖子）即将上线 🚧
      </p>
    </div>
  );
}
