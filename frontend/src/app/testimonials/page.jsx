'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MessageSquarePlus } from 'lucide-react';
import api from '../../services/api';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/testimonial')
      .then((res) => {
        if (res.data.success) {
          setTestimonials(res.data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-obsidian-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-widest border border-gold-500/20">
          Client Feedback & Reviews
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold">
          Heartfelt <span className="gold-gradient-text">Testimonials</span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          Read what couples, models, and families say about their experience with Shree Ji Pictures.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12 text-zinc-400">Loading client stories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 rounded-3xl border border-gold-500/20 flex flex-col justify-between relative group hover:border-gold-500/50 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {/* Star rating */}
                    <div className="flex items-center gap-1 text-gold-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-gold-500/20 group-hover:text-gold-500/40 transition-colors" />
                  </div>

                  <p className="text-sm text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                    "{item.review}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <img
                    src={item.photo}
                    alt={item.customerName}
                    className="w-13 h-13 rounded-full object-cover border-2 border-gold-500/50 shadow-md"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-zinc-900 dark:text-white">
                      {item.customerName}
                    </h4>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-500">
                      Verified Experience
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
