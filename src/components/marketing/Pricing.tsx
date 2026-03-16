"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Ideal for beginners and learners.",
    features: ["Basic screener filters", "Backtest dashboard access", "10 backtests/month", "Delayed symbols feed"],
    button: "Get Started",
    className: "bg-surface",
  },
  {
    name: "Pro",
    price: "$49",
    description: "Tailored for active retail traders.",
    features: [
      "Everything in Free",
      "Unlimited backtests",
      "Real-time alerts",
      "Dynamic optimizer access",
      "AI Copilot assistant (basic)",
    ],
    button: "Upgrade to Pro",
    className: "border-lime/30 bg-gradient-to-b from-transparent via-lime/5 to-transparent relative",
    popular: true,
  },
  {
    name: "Firm",
    price: "$299",
    description: "Built for small funds and prop desks.",
    features: [
      "Everything in Pro",
      "Sub-millisecond API execution",
      "Up to 10 user seats",
      "Dark pool liquidity nodes",
      "Dedicated quant model support",
    ],
    button: "Connect Firm",
    className: "bg-surface",
  },
  {
    name: "Custom",
    price: "Custom",
    description: "Enterprise solutions for institutions.",
    features: ["White-label configuration", "On-premise deployments", "Unlimited seats/nodes", "SLA guarantees"],
    button: "Contact Sales",
    className: "bg-surface",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 md:px-12 max-w-7xl mx-auto py-20 relative z-10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-3xl md:text-5xl tracking-tight mb-4"
        >
          Simple Pricing. <span className="text-gradient-lime">No Hidden Fees.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary max-w-xl mx-auto font-body"
        >
          Choose the plan that matches your trading size and strategy execution style.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`flex flex-col rounded-2xl border border-rim p-8 backdrop-blur-md ${tier.className}`}
          >
            {tier.popular && (
              <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 rounded-full bg-lime text-ink text-xs font-bold font-display glow-lime">
                Most Popular
              </div>
            )}
            <div className="mb-6">
              <h3 className="font-display font-bold text-xl text-text-primary mb-2">
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-3xl text-gradient-lime">
                  {tier.price}
                </span>
                {tier.price !== "Custom" && tier.price !== "$0" && (
                  <span className="text-text-muted text-sm">/mo</span>
                )}
              </div>
              <p className="text-text-secondary text-sm font-body mt-2">
                {tier.description}
              </p>
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              {tier.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-text-secondary font-body">
                  <Check className="w-4 h-4 text-lime mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-xl font-bold font-display text-sm transition-all duration-300 ${
                tier.popular
                  ? "bg-lime text-ink glow-lime hover:scale-[1.02]"
                  : "border border-rim bg-surface hover:bg-surface-hover hover:border-lime/30"
              }`}
            >
              {tier.button}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
