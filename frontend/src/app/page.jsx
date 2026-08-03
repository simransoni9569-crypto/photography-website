'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Camera, Heart, CheckCircle2, Award, ChevronRight } from 'lucide-react';
import Hero from '../components/Hero';
import Lightbox from '../components/Lightbox';
import api from '../services/api';

export default function Home() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    // Fetch initial preview data from API
    api.get('/gallery?limit=6').then((res) => {
      if (res.data.success) setGalleryItems(res.data.data.slice(0, 6));
    }).catch(() => {});

    api.get('/services').then((res) => {
      if (res.data.success) setServices(res.data.data.slice(0, 6));
    }).catch(() => {});

    api.get('/testimonial').then((res) => {
      if (res.data.success) setTestimonials(res.data.data);
    }).catch(() => {});
  }, []);

  return (
    <div className="bg-white dark:bg-obsidian-950">
      {/* Hero Section */}
      <Hero />

      {/* About Studio Teaser Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image Composition */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gold-500/20">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                  alt="Shree Ji Pictures Studio Founder"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-white">Shubham Soni</h4>
                    <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold">Founder & Master Photographer</p>
                  </div>
                </div>
              </div>
              {/* Decorative Accent Card */}
              <div className="absolute -bottom-6 -right-6 z-20 glass-panel p-6 rounded-2xl hidden sm:flex items-center gap-4 max-w-xs border border-gold-500/40">
                <div className="p-3 rounded-full bg-gold-500 text-black font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-serif text-xl font-bold gold-gradient-text">Top Rated</div>
                  <div className="text-xs text-zinc-400">Award Winning Wedding Storytellers</div>
                </div>
              </div>
            </motion.div>

            {/* Right Story Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About Shree Ji Pictures</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
                Crafting Timeless <span className="gold-gradient-text">Cinematic Visuals</span> With Passion
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
                Welcome to <strong>Shree Ji Pictures</strong>. We believe every emotion, glance, and celebration holds an eternal magic. With over a decade of excellence in professional photography and 4K videography, we transform your real moments into heirloom works of art.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  "Royal Wedding Photography",
                  "Cinematic Drone Videography",
                  "High-End Retouching",
                  "Custom Flush Mount Albums"
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-amber-300 underline underline-offset-8 transition-colors"
                >
                  <span>Learn More About Our Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-zinc-50 dark:bg-obsidian-900 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">
              Exclusive Coverage
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white">
              Our Signature <span className="gold-gradient-text">Photography Services</span>
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Tailored photography packages for every milestone of your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((serv, idx) => (
              <motion.div
                key={serv.id || serv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={serv.image}
                    alt={serv.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="px-3 py-1 rounded-full bg-gold-500 text-black text-xs font-extrabold uppercase">
                      {serv.price}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white group-hover:text-gold-400 transition-colors">
                      {serv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                      {serv.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
                    <Link
                      href="/booking"
                      className="text-xs font-bold uppercase tracking-wider text-gold-500 hover:text-amber-300 flex items-center gap-1 group/btn"
                    >
                      <span>Book Service</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-obsidian-900 border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-all"
            >
              Explore All 12 Signature Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Gallery Teaser */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Visual Portfolio</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white mt-2">
                Recent <span className="gold-gradient-text">Masterpieces</span>
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-400 hover:underline"
            >
              <span>View Full Gallery (Categories & Filter)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedImageIndex(index)}
                className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer border border-zinc-200 dark:border-zinc-800"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-zinc-300 line-clamp-1 mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Gallery Preview */}
      <Lightbox
        images={galleryItems}
        currentIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onNavigate={(idx) => setSelectedImageIndex(idx)}
      />

      {/* Testimonials Slider Preview */}
      <section className="py-24 bg-obsidian-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Client Love</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              What Our <span className="gold-gradient-text">Clients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id || test.customerName}
                className="glass-panel p-8 rounded-2xl border border-gold-500/20 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-300 italic leading-relaxed">
                    "{test.review}"
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-zinc-800">
                  <img
                    src={test.photo}
                    alt={test.customerName}
                    className="w-12 h-12 rounded-full object-cover border border-gold-500/40"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-white">{test.customerName}</h4>
                    <span className="text-[11px] text-gold-400 uppercase tracking-wider">Verified Client</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Now Banner CTA */}
      <section className="py-20 bg-gradient-to-r from-gold-600 via-gold-500 to-amber-400 text-obsidian-900">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Capture Your Special Moments?
          </h2>
          <p className="text-base sm:text-lg font-medium text-obsidian-950 max-w-2xl mx-auto">
            Book your session today with Shree Ji Pictures. Limited dates available for upcoming wedding seasons.
          </p>
          <div className="pt-2">
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white bg-obsidian-950 rounded-full shadow-2xl hover:scale-105 transition-transform"
            >
              <span>Book Appointment Now</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
