'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian-950 text-white px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto">
          <Camera className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-6xl font-extrabold gold-gradient-text">404</h1>
        <h2 className="font-serif text-2xl font-bold">Frame Out of Focus</h2>
        <p className="text-sm text-zinc-400">
          The page or photo gallery you are looking for doesn't exist or has been moved.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-400 to-amber-300 text-black font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
