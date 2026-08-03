'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import CounterStats from './CounterStats';

const heroImages = [
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=1920&q=85"
];

const subheadTags = [
  "Professional Wedding Photography",
  "Pre Wedding",
  "Engagement",
  "Birthday",
  "Baby Shoot",
  "Fashion",
  "Cinematic Videos",
  "Events",
  "Portfolio Photography"
];

export default function Hero() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-obsidian-950 text-white">
      {/* Background Image Carousel with Parallax & Fade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImgIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImages[currentImgIndex]})` }}
          />
        </AnimatePresence>

        {/* Gradient Overlays for Luxury Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/80 via-transparent to-obsidian-950/80" />
      </div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto text-center flex flex-col items-center">
        {/* Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-medium tracking-widest uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Premier Luxury Photography Studio</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6"
        >
          Capturing Your <span className="gold-gradient-text italic font-serif">Precious Moments</span> Forever
        </motion.h1>

        {/* Subheadings Tags Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mb-10 text-xs sm:text-sm text-zinc-300 font-sans"
        >
          {subheadTags.map((tag, idx) => (
            <span key={tag} className="flex items-center gap-2">
              <span className="bg-zinc-900/80 backdrop-blur border border-zinc-700/50 px-3 py-1 rounded-md text-zinc-200">
                {tag}
              </span>
              {idx < subheadTags.length - 1 && (
                <span className="text-gold-500/60 hidden sm:inline">•</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Call-to-action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          <Link
            href="/booking"
            className="w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-widest text-obsidian-900 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-300 rounded-full shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Book Your Shoot Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/gallery"
            className="w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-widest text-zinc-100 bg-obsidian-900/80 backdrop-blur border border-gold-500/40 rounded-full hover:bg-gold-500/10 hover:border-gold-500 transition-all flex items-center justify-center"
          >
            View Portfolios & Gallery
          </Link>
        </motion.div>
      </div>

      {/* Animated Counter Stats Component Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
        <CounterStats />
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 flex justify-center mt-6">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-zinc-500 hover:text-gold-400 cursor-pointer"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </div>
    </section>
  );
}
