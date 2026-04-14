import { cookies } from "next/headers";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import { getAdminCookieName, readAdminSessionToken } from "@/lib/admin-session";
import { hasRole } from "@/lib/rbac";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = readAdminSessionToken(cookieStore.get(getAdminCookieName())?.value);
  const isAdmin = !!session && hasRole(session.role, "ADMIN");

  if (!isAdmin) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
