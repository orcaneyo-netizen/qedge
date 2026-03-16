import Hero from "@/components/marketing/Hero";
import Ticker from "@/components/marketing/Ticker";
import Features from "@/components/marketing/Features";
import AICopilotDemo from "@/components/marketing/AICopilotDemo";
import Courses from "@/components/marketing/Courses";
import Pricing from "@/components/marketing/Pricing";
import Testimonials from "@/components/marketing/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 overflow-x-hidden">
      <div className="pt-24">
        <Hero />
      </div>
      <Ticker />
      <Features />
      <AICopilotDemo />
      <Courses />
      <Pricing />
      <Testimonials />
      
      {/* CTA Band */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 w-full relative z-10">
        <div className="rounded-3xl border border-lime/30 bg-gradient-to-r from-lime/10 via-ink2 to-transparent p-12 md:p-16 flex flex-col md:flex-row justify-between items-center gap-8 backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-lime/5 via-transparent to-transparent opacity-50" />
          <div className="max-w-xl flex flex-col gap-4 relative">
            <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
              Ready to trade with <br />
              <span className="text-gradient-lime">Institutional Edge?</span>
            </h2>
            <p className="text-text-secondary font-body text-sm md:text-base">
              Get started with QuantEdge today. No credit card required to explore the dashboard and basic screeners.
            </p>
          </div>
          <a href="/dashboard" className="px-8 py-4 rounded-xl bg-lime text-ink font-bold font-display text-base glow-lime hover:scale-105 active:scale-95 transition-all duration-300 relative">
            Launch App Free &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}
