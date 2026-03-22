export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex">
      {/* TODO: Phase 3 — Admin sidebar + RBAC guard */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
