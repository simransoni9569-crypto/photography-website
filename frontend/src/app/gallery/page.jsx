'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Sparkles, Filter } from 'lucide-react';
import Lightbox from '../../components/Lightbox';
import { ImageCardSkeleton } from '../../components/Skeleton';
import api from '../../services/api';

const categories = [
  "All",
  "Wedding",
  "Pre Wedding",
  "Birthday",
  "Baby Shoot",
  "Fashion",
  "Events",
  "Nature",
  "Portrait"
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchGallery();
  }, [activeCategory]);

  const fetchGallery = () => {
    setLoading(true);
    const catQuery = activeCategory !== "All" ? `?category=${encodeURIComponent(activeCategory)}` : '';
    api.get(`/gallery${catQuery}`)
      .then((res) => {
        if (res.data.success) {
          setGallery(res.data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  // Pagination Slice
  const totalPages = Math.ceil(gallery.length / itemsPerPage) || 1;
  const paginatedItems = gallery.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-obsidian-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-widest border border-gold-500/20">
          Studio Showcase
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold">
          Masterpiece <span className="gold-gradient-text">Gallery</span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          Browse through our curated portfolio of royal weddings, pre-wedding romance, editorial fashion, and milestone celebrations.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-400 to-amber-300 text-obsidian-950 font-bold shadow-lg shadow-gold-500/20 scale-105'
                    : 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-gold-500/40 hover:text-gold-400'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Image Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ImageCardSkeleton key={i} />
            ))}
          </div>
        ) : paginatedItems.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-2xl p-8">
            <p className="text-zinc-400 text-base">No photographs found in "{activeCategory}" category yet.</p>
            <p className="text-xs text-zinc-500 mt-1">Admin can upload high-resolution images via the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {paginatedItems.map((item, index) => {
                const globalIndex = (page - 1) * itemsPerPage + index;
                return (
                  <motion.div
                    key={item.id || item.image}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setLightboxIndex(globalIndex)}
                    className="relative h-80 rounded-2xl overflow-hidden glass-card group cursor-pointer border border-zinc-200 dark:border-zinc-800/80"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay & Details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                      <div className="flex justify-end">
                        <div className="w-10 h-10 rounded-full bg-black/60 border border-gold-500/40 flex items-center justify-center text-gold-400">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-400 mb-1 block">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-white leading-snug">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-zinc-300 line-clamp-2 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-full border border-zinc-700 text-xs font-bold text-zinc-300 disabled:opacity-40 hover:border-gold-500"
          >
            Previous
          </button>
          <span className="text-xs font-semibold text-zinc-400">
            Page <span className="text-gold-400 font-bold">{page}</span> of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-full border border-zinc-700 text-xs font-bold text-zinc-300 disabled:opacity-40 hover:border-gold-500"
          >
            Next
          </button>
        </div>
      )}

      {/* Interactive Lightbox Component */}
      <Lightbox
        images={gallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
