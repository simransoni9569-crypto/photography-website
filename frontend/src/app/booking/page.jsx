'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User, Phone, Mail, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

const eventTypes = [
  "Wedding Photography",
  "Pre Wedding Shoot",
  "Engagement Photography",
  "Birthday Photography",
  "Baby Shoot",
  "Maternity Shoot",
  "Event Photography",
  "Product Photography",
  "Fashion Photography",
  "Cinematic Videography",
  "Drone Photography",
  "Album Designing"
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const prefilledEvent = searchParams.get('event') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: prefilledEvent || eventTypes[0],
    date: '',
    location: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledEvent && eventTypes.includes(prefilledEvent)) {
      setFormData(prev => ({ ...prev, eventType: prefilledEvent }));
    }
  }, [prefilledEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.location) {
      toast.error('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/booking', formData);
      if (res.data.success) {
        toast.success('Booking Request Submitted Successfully!');
        setSubmitted(true);
      } else {
        toast.error(res.data.message || 'Failed to submit booking request.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error while submitting booking.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-obsidian-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-widest border border-gold-500/20">
            Reserve Your Date
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold">
            Book <span className="gold-gradient-text">Shree Ji Pictures</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
            Fill out the details below to check availability for your special date. Our creative team will get in touch within 24 hours.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-10 rounded-3xl text-center space-y-6 border border-gold-500/40 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 mx-auto flex items-center justify-center border border-gold-500/40">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">
              Booking Request Received!
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-gold-400">{formData.name}</strong>! Your reservation request for <strong>{formData.eventType}</strong> on <strong>{formData.date}</strong> has been saved.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    eventType: eventTypes[0],
                    date: '',
                    location: '',
                    message: ''
                  });
                }}
                className="px-6 py-2.5 rounded-full border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-black transition-all"
              >
                Submit Another Booking
              </button>
              <a
                href="https://wa.me/918887647811"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
              >
                <span>Instant WhatsApp Confirm</span>
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold-500/30 shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Event Type Dropdown */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2">
                  Event / Shoot Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Event Date */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2">
                  Shoot Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2">
                  Event Location / City *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Udaipur / Jaipur Studio"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Message / Requirements */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2">
                Special Requests or Notes (Optional)
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your event theme, number of functions, or video expectations..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 text-xs font-bold uppercase tracking-widest text-obsidian-950 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-300 rounded-xl shadow-xl shadow-gold-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50"
            >
              {submitting ? 'Submitting Reservation...' : 'Confirm & Send Booking Request'}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
