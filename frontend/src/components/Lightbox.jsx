'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export default function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setZoomLevel(1); // Reset zoom on image change
  }, [currentIndex]);

  if (currentIndex === null || !images || images.length === 0) return null;

  const currentItem = images[currentIndex];

  const handleNext = () => {
    onNavigate((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8">
        {/* Top Control Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50 text-white">
          <div className="text-xs sm:text-sm font-medium tracking-wider text-zinc-400">
            <span className="text-gold-400 font-bold">{currentIndex + 1}</span> / {images.length} • {currentItem.category}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setZoomLevel((z) => (z > 1 ? 1 : 1.6))}
              className="p-2 rounded-full bg-zinc-900/80 border border-zinc-700/60 hover:text-gold-400 transition-colors"
              title="Toggle Zoom"
            >
              {zoomLevel > 1 ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-900/80 border border-zinc-700/60 hover:text-gold-400 transition-colors"
              title="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:text-gold-400 hover:border-gold-500 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:text-gold-400 hover:border-gold-500 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Image Display Area */}
        <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
          <motion.img
            key={currentItem.id || currentItem.image}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: zoomLevel }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            src={currentItem.image}
            alt={currentItem.title || 'Studio Photograph'}
            className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl transition-transform duration-300"
          />

          {/* Caption / Description */}
          <div className="mt-4 text-center max-w-xl">
            <h3 className="font-serif text-lg font-bold gold-gradient-text">
              {currentItem.title}
            </h3>
            {currentItem.description && (
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-2">
                {currentItem.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
