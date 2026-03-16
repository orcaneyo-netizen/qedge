import { ReactNode } from "react";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen aurora-bg overflow-x-hidden">
      {/* Background Blobs */}
      <div className="blob-1" />
      <div className="blob-2" />
      <div className="blob-3" />
      <div className="blob-4" />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-rim py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-display font-extrabold text-2xl tracking-wider text-gradient-lime">
            QuantEdge
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="#features" className="hover:text-lime transition-colors">Features</a>
          <a href="#pricing" className="hover:text-lime transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-lime transition-colors">Testimonials</a>
          <a href="/dashboard" className="hover:text-lime transition-colors">App</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="/dashboard" className="px-5 py-2 rounded-full bg-lime text-ink font-bold font-display text-sm glow-lime hover:scale-105 active:scale-95 transition-all duration-300">
            Get Started
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-rim py-12 px-6 md:px-12 text-center text-text-muted text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display font-bold text-xl text-gradient-lime">QuantEdge</div>
          <p>&copy; {new Date().getFullYear()} QuantEdge. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-lime transition-colors">Terms</a>
            <a href="#" className="hover:text-lime transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
