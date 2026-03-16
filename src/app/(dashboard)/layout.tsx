import Sidebar from "@/components/dashboard/Sidebar";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-ink overflow-x-hidden flex">
      {/* Sidebar (Fixed) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-[240px] flex flex-col h-screen overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-30 glass border-b border-rim h-[64px] flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h1 className="font-display font-black text-lg text-text-primary">Dashboard</h1>
            <span className="px-2 py-1 rounded-full bg-success/10 text-success border border-success/20 text-[10px] font-bold font-display uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Markets Open
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-semibold font-display text-text-primary">14:24:36</p>
              <p className="text-[10px] text-text-muted font-body">New York EST</p>
            </div>
            <UserButton />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
