'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-zinc-900 border border-gold-500/40 text-gold-400 flex items-center justify-center shadow-lg hover:bg-gold-500 hover:text-black transition-all duration-300"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Call Now Floating Button */}
      <a
        href="tel:8887647811"
        className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 relative group"
        title="Call Shree Ji Pictures (+91 8887647811)"
      >
        <Phone className="w-5 h-5" />
        <span className="absolute right-14 bg-obsidian-900 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-zinc-700">
          Call Now: 8887647811
        </span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918887647811?text=Hello%20Shree%20Ji%20Pictures!%20I%20would%20like%20to%20inquire%20about%20a%20photography%20shoot."
        target="_blank"
        rel="noreferrer"
        className="w-13 h-13 w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-110 transition-transform duration-300 relative group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-14 bg-obsidian-900 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-zinc-700">
          WhatsApp Inquiry
        </span>
      </a>
    </div>
  );
}
