export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex">
      {/* TODO: Phase 3 — Sidebar navigation */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
