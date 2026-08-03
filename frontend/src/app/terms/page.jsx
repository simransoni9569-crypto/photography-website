'use client';

import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 text-zinc-900 dark:text-zinc-100">
      <h1 className="font-serif text-4xl font-bold mb-6 gold-gradient-text">Terms & Conditions</h1>
      <p className="text-xs text-zinc-400 mb-8">Effective Date: January 1, 2026 • Shree Ji Pictures Studio</p>

      <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">1. Booking & Retainers</h3>
          <p>
            Reservations are confirmed upon agreement of shoot dates and receipt of initial booking deposit. Dates are allocated on a first-come, first-served basis.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">2. Delivery Timelines</h3>
          <p>
            High-resolution edited digital galleries are typically delivered within 2-3 weeks post event. Flush mount photo albums take approximately 4 weeks.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">3. Copyright & Usage</h3>
          <p>
            Shree Ji Pictures retains copyright of all images. Clients receive personal print and digital sharing rights for non-commercial use.
          </p>
        </section>
      </div>
    </div>
  );
}
