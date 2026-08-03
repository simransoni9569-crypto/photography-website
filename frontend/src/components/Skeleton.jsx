'use client';

import React from 'react';

export function ImageCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden glass-card p-2 animate-pulse">
      <div className="w-full h-64 bg-zinc-800/80 rounded-xl" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-zinc-800 rounded w-2/3" />
        <div className="h-3 bg-zinc-800/60 rounded w-1/3" />
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="rounded-2xl glass-card p-6 animate-pulse space-y-4">
      <div className="w-full h-48 bg-zinc-800 rounded-xl" />
      <div className="h-5 bg-zinc-800 rounded w-3/4" />
      <div className="h-3 bg-zinc-800 rounded w-full" />
      <div className="h-3 bg-zinc-800 rounded w-5/6" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-zinc-800 rounded w-1/4" />
        <div className="h-8 bg-zinc-800 rounded-full w-1/3" />
      </div>
    </div>
  );
}
