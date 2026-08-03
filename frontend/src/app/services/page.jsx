'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, Video, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';
import { ServiceCardSkeleton } from '../../components/Skeleton';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services')
      .then((res) => {
        if (res.data.success) {
          setServices(res.data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-obsidian-950 text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-widest border border-gold-500/20">
          World-Class Photography & Videography
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold">
          Our Premier <span className="gold-gradient-text">Services</span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          From royal weddings to fashion editorials, explore our range of bespoke photography and 4K film services.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id || service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card rounded-2xl overflow-hidden group hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-gold-500 text-obsidian-950 font-extrabold text-xs uppercase tracking-wider shadow-lg">
                      {service.price}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white group-hover:text-gold-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                      Professional Crew
                    </span>
                    <Link
                      href={`/booking?event=${encodeURIComponent(service.title)}`}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-gold-400 to-amber-300 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center gap-1"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Special Offer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold-500/30 text-center space-y-6">
          <Sparkles className="w-8 h-8 text-gold-400 mx-auto" />
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Need a Custom Photography Package?
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
            We offer tailored shoot schedules, multi-day destination wedding packages, and customized drone coverage suited for your specific requirements.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-obsidian-900 text-white font-bold text-xs uppercase tracking-widest border border-gold-500/40 hover:bg-gold-500 hover:text-black transition-all"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
