'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Phone, Mail, Clock, MapPin, Instagram, Facebook, Youtube, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-obsidian-950 text-zinc-400 border-t border-gold-500/20 pt-16 pb-8 relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 to-amber-200 p-[2px]">
                <div className="w-full h-full bg-obsidian-900 rounded-full flex items-center justify-center">
                  <Camera className="w-5 h-5 text-gold-400" />
                </div>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider gold-gradient-text block leading-none">
                  SHREE JI
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-sans block mt-1">
                  Pictures
                </span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We specialize in royal wedding photography, pre-wedding shoots, maternity, baby milestones, high fashion editorials, and 4K cinematic videography.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918887647811"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-zinc-100 mb-6 border-b border-zinc-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-gold-400 transition-colors">About Studio</Link></li>
              <li><Link href="/services" className="hover:text-gold-400 transition-colors">Services & Coverage</Link></li>
              <li><Link href="/gallery" className="hover:text-gold-400 transition-colors">Photo Gallery</Link></li>
              <li><Link href="/testimonials" className="hover:text-gold-400 transition-colors">Client Reviews</Link></li>
              <li><Link href="/pricing" className="hover:text-gold-400 transition-colors">Pricing Packages</Link></li>
              <li><Link href="/contact" className="hover:text-gold-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services List */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-zinc-100 mb-6 border-b border-zinc-800 pb-2">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-gold-400 transition-colors">Wedding Photography</Link></li>
              <li><Link href="/services" className="hover:text-gold-400 transition-colors">Pre-Wedding Shoots</Link></li>
              <li><Link href="/services" className="hover:text-gold-400 transition-colors">Engagement Ceremony</Link></li>
              <li><Link href="/services" className="hover:text-gold-400 transition-colors">Newborn & Baby Shoot</Link></li>
              <li><Link href="/services" className="hover:text-gold-400 transition-colors">Fashion Editorial</Link></li>
              <li><Link href="/services" className="hover:text-gold-400 transition-colors">4K Drone Videography</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-zinc-100 mb-6 border-b border-zinc-800 pb-2">
              Studio Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <a href="tel:8887647811" className="hover:text-gold-400 transition-colors">
                  +91 8887647811
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <a href="mailto:shubhamsoniphotography07@gmail.com" className="hover:text-gold-400 transition-colors break-all">
                  shubhamsoniphotography07@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Mon - Sun: 9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <a
                  href="https://maps.google.com/?q=Alha+chowk+Infront+Of+Ambedkar+Park,+Makaniya+Purva,+Mahoba,+Uttar+Pradesh+210427"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold-400 transition-colors text-xs text-gold-400/90 underline underline-offset-4"
                >
                  Alha Chowk, Ambedkar Park, Mahoba, UP →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© 2026 Shree Ji Pictures. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms & Conditions</Link>
            <Link href="/admin" className="hover:text-gold-400 transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
