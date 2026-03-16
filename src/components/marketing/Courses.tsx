"use client";

import { motion } from "framer-motion";
import { BookOpen, Star, Clock } from "lucide-react";

interface Course {
  title: string;
  duration: string;
  rating: number;
  instructor: string;
  image: string;
}

const courses: Course[] = [
  {
    title: "Intro to Quantitative Trading",
    duration: "12 Hours",
    rating: 4.8,
    instructor: "Dr. Aris V.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Algorithmic Market Making",
    duration: "18 Hours",
    rating: 4.9,
    instructor: "Sarah Lee",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Option Pricing & Black-Scholes",
    duration: "15 Hours",
    rating: 4.7,
    instructor: "Michael Chen",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Machine Learning in Finance",
    duration: "25 Hours",
    rating: 5.0,
    instructor: "QuantEdge AI Team",
    image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Courses() {
  return (
    <section className="py-20 bg-ink/50 backdrop-blur-md relative z-10 border-t border-b border-rim overflow-hidden">
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end gap-4"
        >
          <div>
            <span className="text-lime font-display text-xs font-bold uppercase tracking-widest bg-lime/10 px-3 py-1 rounded-full border border-lime/20 mb-3 inline-block">
              Learn the math
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
              Quant Academy
            </h2>
          </div>
          <p className="text-text-secondary font-body max-w-md text-sm md:text-base">
            Master quantitative finance with our structured curriculum, from core statistics to advanced neural architecture loops.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="flex gap-6 overflow-x-auto px-6 md:px-12 max-w-7xl mx-auto pb-8 scrollbar-hide">
        {courses.map((course, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="min-w-[300px] md:min-w-[350px] rounded-2xl border border-rim bg-surface overflow-hidden group hover:border-lime/20 transition-all duration-300 flex flex-col"
          >
            <div className="h-44 bg-ink2 relative overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex items-center gap-1 text-[10px] text-text-muted font-display">
                    <Clock className="w-3 h-3 text-lime" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-text-muted font-display">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {course.rating.toFixed(1)}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-lime transition-colors mb-2">
                  {course.title}
                </h3>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-rim">
                <span className="text-xs text-text-muted font-body">by {course.instructor}</span>
                <span className="text-xs font-bold text-lime font-display group-hover:underline">Join &rarr;</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
