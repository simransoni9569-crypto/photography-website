'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // Google Maps Embed URL for Shree Ji Pictures Studio in Mahoba, UP
  const mapEmbedUrl = "https://maps.google.com/maps?q=Alha%20chowk%20Infront%20Of%20Ambedkar%20Park,%20Makaniya%20Purva,%20Mahoba,%20Uttar%20Pradesh%20210427&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      toast.error('Please complete all contact form fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/contact', formData);
      if (res.data.success) {
        toast.success('Your message has been sent to Shree Ji Pictures!');
        setSent(true);
      } else {
        toast.error(res.data.message || 'Failed to send message.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error while sending message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-obsidian-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-widest border border-gold-500/20">
          Get In Touch
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold">
          Contact <span className="gold-gradient-text">Shree Ji Pictures</span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          Have a question or want to discuss your shoot details? Reach out directly to our studio director.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details Card */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold-500/30 space-y-8 shadow-2xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Official Studio Information</span>
              <h2 className="font-serif text-3xl font-bold text-zinc-900 dark:text-white mt-1">
                Shree Ji Pictures
              </h2>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white text-xs uppercase tracking-wider">Owner Phone & Direct Line</h4>
                  <a href="tel:8887647811" className="text-lg font-serif font-bold text-gold-400 hover:underline block mt-0.5">
                    8887647811
                  </a>
                  <span className="text-xs text-zinc-400">Direct studio line & WhatsApp active</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white text-xs uppercase tracking-wider">Studio Email</h4>
                  <a href="mailto:shubhamsoniphotography07@gmail.com" className="text-base font-medium text-gold-400 hover:underline block mt-0.5 break-all">
                    shubhamsoniphotography07@gmail.com
                  </a>
                  <span className="text-xs text-zinc-400">Replies usually within 2 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white text-xs uppercase tracking-wider">Working Hours</h4>
                  <p className="text-sm font-medium text-zinc-300 mt-0.5">
                    Monday - Sunday
                  </p>
                  <p className="text-xs text-gold-400 font-bold">
                    9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold-500/30 shadow-2xl">
            {sent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold">Message Sent Successfully!</h3>
                <p className="text-xs text-zinc-400">We have received your message and stored it securely in our system.</p>
                <button
                  onClick={() => {
                    setSent(false);
                    setFormData({ name: '', phone: '', email: '', message: '' });
                  }}
                  className="px-6 py-2 rounded-full border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-2xl font-bold mb-4">Send Us a Direct Message</h3>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 8887647811"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. ananya@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your inquiry here..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 text-xs font-bold uppercase tracking-widest text-obsidian-950 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-300 rounded-xl shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50"
                >
                  {submitting ? 'Sending Message...' : 'Send Message To Studio'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Google Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-4 rounded-3xl border border-gold-500/30 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold-400" />
              <span className="font-serif font-bold text-sm">Shree Ji Pictures Studio Map Location</span>
            </div>
            <span className="text-[11px] text-zinc-400">Replace iframe URL in source code anytime</span>
          </div>

          <div className="w-full h-96 rounded-2xl overflow-hidden relative">
            <iframe
              title="Shree Ji Pictures Studio Google Map"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-[0.8] contrast-[1.1]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
