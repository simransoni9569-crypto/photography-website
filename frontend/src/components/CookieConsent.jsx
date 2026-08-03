'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('shreeji_cookie_consent');
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('shreeji_cookie_consent', 'accepted');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-md glass-panel p-5 rounded-2xl border border-gold-500/30 shadow-2xl animate-fade-in text-zinc-200">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-full bg-gold-500/10 text-gold-400 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-2 text-xs">
          <h4 className="font-serif font-bold text-white text-sm">Cookie & Privacy Notice</h4>
          <p className="text-zinc-400 leading-relaxed">
            We use cookies to enhance your browsing experience, display high-resolution galleries, and analyze website traffic for Shree Ji Pictures.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-400 to-amber-300 text-black font-bold text-[11px] uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Accept All
            </button>
            <button
              onClick={handleAccept}
              className="text-zinc-400 hover:text-white text-[11px] underline"
            >
              Decline
            </button>
          </div>
        </div>
        <button
          onClick={handleAccept}
          className="text-zinc-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
