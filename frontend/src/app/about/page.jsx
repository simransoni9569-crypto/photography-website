'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Heart, Award, ShieldCheck, Film, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-white dark:bg-obsidian-950 text-zinc-800 dark:text-zinc-100">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-widest border border-gold-500/20">
          Our Philosophy & Craft
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold">
          About <span className="gold-gradient-text">Shree Ji Pictures</span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          Dedicated to capturing emotions, royal elegance, and unscripted moments through premier photography and cinematic storytelling.
        </p>
      </div>

      {/* Main Studio Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Where Artistry Meets <span className="gold-gradient-text">Cherished Memories</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
              At <strong>Shree Ji Pictures</strong>, photography is far more than clicking pictures — it is the delicate art of preserving life’s most profound human connections. Founded with an unwavering commitment to luxury, storytelling, and cinematic precision, our studio has earned a reputation for excellence.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
              Whether documenting a grand heritage royal wedding, an intimate pre-wedding session by golden lakes, high-fashion editorials, or newborn baby milestones, we pour heart and soul into every frame.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div>
                <h4 className="font-serif text-2xl font-bold gold-gradient-text">100%</h4>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Customer Satisfaction</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl font-bold gold-gradient-text">4K Ultra HD</h4>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Cinematic Quality</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gold-500/30">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                alt="Shree Ji Pictures Behind The Scenes"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Core Pillars / Values Section */}
      <div className="bg-zinc-50 dark:bg-obsidian-900 py-20 border-y border-gold-500/10 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="font-serif text-3xl font-bold mb-3">Why Choose Shree Ji Pictures?</h3>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Our Guiding Pillars of Excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Film,
                title: "Cinematic Storytelling",
                desc: "We don't just shoot poses; we capture genuine emotions, laughter, and tearful joys in movie-like quality."
              },
              {
                icon: Sparkles,
                title: "High-Quality Editing",
                desc: "Every photograph undergoes meticulous color grading, skin-retouching, and artistic finishing touches."
              },
              {
                icon: ShieldCheck,
                title: "Unmatched Reliability",
                desc: "Punctual delivery of high-res digital galleries, flush mount albums, and raw video archives."
              }
            ].map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div key={pillar.title} className="glass-card p-8 rounded-2xl space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">{pillar.title}</h4>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Owner Profile Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-gold-500/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="relative max-w-sm mx-auto w-full">
              <div className="rounded-3xl overflow-hidden border-2 border-gold-500/50 shadow-2xl bg-obsidian-900/90 p-2">
                <img
                  src="/owner.jpg"
                  alt="Shubham Soni Founder"
                  className="w-full h-[460px] sm:h-[500px] object-cover object-center rounded-2xl"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Founder & Creative Director</span>
              <h3 className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">
                Shubham Soni
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                "Photography for me is not a profession — it is a lifelong devotion. Seeing the emotional tears in a bride's eyes when she opens her wedding film or the joy of parents looking at their newborn’s first portrait is what drives our creativity every single day."
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-gold-500">
                <span>Direct Phone: +91 8887647811</span>
                <span>•</span>
                <span>Email: shubhamsoniphotography07@gmail.com</span>
              </div>
              <div className="pt-4">
                <Link
                  href="/booking"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gold-400 to-amber-300 text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
                >
                  Book Session With Shubham Soni
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
