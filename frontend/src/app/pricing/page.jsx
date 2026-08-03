'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles, Star, ArrowRight } from 'lucide-react';
import api from '../../services/api';

export default function PricingPage() {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pricing')
      .then((res) => {
        if (res.data.success) {
          setPricing(res.data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-obsidian-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-widest border border-gold-500/20">
          Transparent Pricing Investment
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold">
          Studio <span className="gold-gradient-text">Packages & Pricing</span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          Choose from our carefully curated photography and videography packages designed for wedding ceremonies and grand events.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12 text-zinc-400">Loading package options...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricing.map((pkg, index) => {
              const isPopular = pkg.packageName.toLowerCase() === 'gold' || pkg.packageName.toLowerCase() === 'premium';
              return (
                <motion.div
                  key={pkg.id || pkg.packageName}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                    isPopular
                      ? 'border-2 border-gold-500 shadow-2xl shadow-gold-500/15 scale-105 bg-obsidian-900/90'
                      : 'border border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-400 to-amber-300 text-obsidian-950 font-extrabold text-[10px] uppercase tracking-widest shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="text-center border-b border-zinc-200 dark:border-zinc-800 pb-6">
                      <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
                        {pkg.packageName}
                      </h3>
                      <div className="font-serif text-3xl font-extrabold gold-gradient-text mt-3">
                        {pkg.price}
                      </div>
                      <span className="text-[11px] text-zinc-400 uppercase tracking-wider block mt-1">Per Package</span>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed min-h-[60px]">
                      {pkg.description}
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-gold-500">Package Features:</div>
                      <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-gold-500 shrink-0" />
                          <span>High-Resolution Edited Digital Photos</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-gold-500 shrink-0" />
                          <span>Professional Lighting & Equipment</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-gold-500 shrink-0" />
                          <span>Private Online Password Gallery</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-gold-500 shrink-0" />
                          <span>Full Rights & Print Release</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 mt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <Link
                      href={`/booking?event=${encodeURIComponent(pkg.packageName + ' Package')}`}
                      className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        isPopular
                          ? 'bg-gradient-to-r from-gold-400 to-amber-300 text-obsidian-950 shadow-lg hover:scale-105'
                          : 'bg-obsidian-900 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-black'
                      }`}
                    >
                      <span>Book Package</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
