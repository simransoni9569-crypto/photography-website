'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Camera, Clock } from 'lucide-react';

const stats = [
  {
    icon: Clock,
    value: "10+",
    label: "Years Experience",
    desc: "A decade of story telling"
  },
  {
    icon: Users,
    value: "1,500+",
    label: "Happy Clients",
    desc: "Smiles & unforgettable memories"
  },
  {
    icon: Camera,
    value: "2,200+",
    label: "Projects Completed",
    desc: "Weddings, portraits & films"
  },
  {
    icon: Award,
    value: "35+",
    label: "Prestigious Awards",
    desc: "Excellence in photography"
  }
];

export default function CounterStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="glass-panel rounded-2xl p-5 text-center relative overflow-hidden group hover:border-gold-500/50 transition-all duration-300"
          >
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-black transition-all">
              <IconComponent className="w-5 h-5" />
            </div>
            <div className="font-serif text-2xl sm:text-4xl font-extrabold gold-gradient-text tracking-tight mb-1">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-zinc-200 dark:text-zinc-200">
              {stat.label}
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 hidden sm:block">
              {stat.desc}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
