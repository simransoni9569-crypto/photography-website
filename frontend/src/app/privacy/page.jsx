'use client';

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 text-zinc-900 dark:text-zinc-100">
      <h1 className="font-serif text-4xl font-bold mb-6 gold-gradient-text">Privacy Policy</h1>
      <p className="text-xs text-zinc-400 mb-8">Effective Date: January 1, 2026 • Shree Ji Pictures Studio</p>

      <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">1. Information Collection</h3>
          <p>
            Shree Ji Pictures respects your privacy. When you book a session or fill out our contact form, we collect your name, phone number, email address, event date, and location details to provide our professional photography services.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">2. Use of Photographs</h3>
          <p>
            Photographs taken during shoots may be displayed in our online portfolio, website gallery, or social media channels for marketing purposes unless explicitly agreed otherwise in writing.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">3. Contact & Inquiries</h3>
          <p>
            If you have questions regarding your data privacy or wish to request image removal, please contact Shubham Soni at <strong className="text-gold-400">shubhamsoniphotography07@gmail.com</strong> or call <strong className="text-gold-400">8887647811</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
