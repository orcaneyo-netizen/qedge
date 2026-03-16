"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "QuantEdge turned my backtest simulations into a highly profitable desk. Sub-ms execution makes it unparalleled for retail desks.",
    author: "Sarah Jenkins",
    role: "Founder, Apex Capital",
    avatar: "S",
    glow: "border-lime/20 bg-lime/5",
  },
  {
    quote: "The Neural Signal Core correctly flagged the consolidation breakout on $AAPL 10 minutes before the movement. That's pure ALPHA.",
    author: "Marcus Chen",
    role: "Independent Prop Trader",
    avatar: "M",
  },
  {
    quote: "Setup was 5 minutes, and integration took another 10. Simple APIs, robust backtest validation, and high fidelity tick data.",
    author: "Alex Rivera",
    role: "Quant Developer, StatArb",
    avatar: "A",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-6 md:px-12 max-w-7xl mx-auto py-20 relative z-10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-3xl md:text-5xl tracking-tight mb-4"
        >
          Backed by <span className="text-gradient-lime">Institutional Traders.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary max-w-xl mx-auto font-body"
        >
          See what top independent quants and prop desks are saying about QuantEdge.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`rounded-2xl border border-rim p-8 backdrop-blur-md relative flex flex-col justify-between ${
              testimonial.glow || "bg-surface"
            }`}
          >
            <p className="text-text-secondary font-body text-base italic leading-relaxed mb-6">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-lime/10 text-lime border border-lime/20 flex items-center justify-center font-display font-bold">
                {testimonial.avatar}
              </div>
              <div>
                <h4 className="font-display font-semibold text-text-primary text-sm">
                  {testimonial.author}
                </h4>
                <p className="text-text-muted text-xs font-body">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
