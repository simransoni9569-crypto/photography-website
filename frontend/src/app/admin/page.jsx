'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  User,
  LogOut,
  Image as ImageIcon,
  Calendar,
  MessageSquare,
  DollarSign,
  Briefcase,
  Users,
  Eye,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Upload,
  BarChart3
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function AdminPage() {
  const { user, login, logout, token } = useAuth();

  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Dashboard Tab
  const [activeTab, setActiveTab] = useState('analytics'); // analytics, gallery, bookings, messages, services, pricing, testimonials

  // Data States
  const [stats, setStats] = useState({ totalVisitors: 14850, totalBookings: 0, totalGalleryImages: 0, totalMessages: 0 });
  const [gallery, setGallery] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [services, setServices] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Upload Form Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({ title: '', category: 'Wedding', description: '', imageUrl: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user && token) {
      loadDashboardData();
    }
  }, [user, token]);

  const loadDashboardData = () => {
    api.get('/dashboard/stats').then(res => res.data.success && setStats(res.data.data)).catch(() => {});
    api.get('/gallery').then(res => res.data.success && setGallery(res.data.data)).catch(() => {});
    api.get('/bookings').then(res => res.data.success && setBookings(res.data.data)).catch(() => {});
    api.get('/messages').then(res => res.data.success && setMessages(res.data.data)).catch(() => {});
    api.get('/services').then(res => res.data.success && setServices(res.data.data)).catch(() => {});
    api.get('/pricing').then(res => res.data.success && setPricing(res.data.data)).catch(() => {});
    api.get('/testimonial').then(res => res.data.success && setTestimonials(res.data.data)).catch(() => {});
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const result = await login(email, password);
    setLoggingIn(false);

    if (result.success) {
      toast.success('Welcome back, Admin!');
    } else {
      toast.error(result.message || 'Login failed. Check credentials.');
    }
  };

  // Image Upload Handler
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('title', uploadData.title);
      formData.append('category', uploadData.category);
      formData.append('description', uploadData.description);

      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (uploadData.imageUrl) {
        formData.append('imageUrl', uploadData.imageUrl);
      } else {
        toast.error('Please upload an image file or provide an image URL');
        setUploading(false);
        return;
      }

      const res = await api.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        toast.success('Image added to gallery!');
        setShowUploadModal(false);
        setUploadData({ title: '', category: 'Wedding', description: '', imageUrl: '' });
        setSelectedFile(null);
        loadDashboardData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  // Delete Gallery Item
  const handleDeleteGallery = async (id) => {
    if (!confirm('Are you sure you want to delete this gallery image?')) return;
    try {
      const res = await api.delete(`/gallery/${id}`);
      if (res.data.success) {
        toast.success('Image deleted');
        loadDashboardData();
      }
    } catch (err) {
      toast.error('Failed to delete image');
    }
  };

  // Update Booking Status
  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const res = await api.put(`/booking/${id}/status`, { status });
      if (res.data.success) {
        toast.success(`Booking status updated to ${status}`);
        loadDashboardData();
      }
    } catch (err) {
      toast.error('Failed to update booking status');
    }
  };

  // Delete Booking
  const handleDeleteBooking = async (id) => {
    if (!confirm('Delete this booking record?')) return;
    try {
      const res = await api.delete(`/booking/${id}`);
      if (res.data.success) {
        toast.success('Booking record removed');
        loadDashboardData();
      }
    } catch (err) {
      toast.error('Failed to delete booking');
    }
  };

  // If not authenticated, render Admin Login view
  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-obsidian-950 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl border border-gold-500/30 shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-white">Admin Authentication</h2>
            <p className="text-xs text-zinc-400">Sign in to manage Shree Ji Pictures studio system</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@shreejipictures.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-400 to-amber-300 text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              {loggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-zinc-800">
            <p className="text-[11px] text-zinc-500">Default Demo Credentials:</p>
            <p className="text-[11px] text-gold-400 font-mono mt-0.5">admin@shreejipictures.com / Admin@123456</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout
  return (
    <div className="min-h-screen pt-28 pb-24 bg-obsidian-950 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Dashboard Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-gold-500/20 mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-gold-400 font-bold">Logged in as {user.role}</span>
            <h1 className="font-serif text-2xl font-bold text-white mt-0.5">Studio Executive Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-gold-400 to-amber-300 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Photograph</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Analytics Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="glass-panel p-6 rounded-2xl border border-gold-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase text-zinc-400 font-semibold">Total Visitors</span>
              <Eye className="w-5 h-5 text-gold-400" />
            </div>
            <div className="font-serif text-3xl font-bold gold-gradient-text">{stats.totalVisitors.toLocaleString()}</div>
            <span className="text-[10px] text-emerald-400 mt-1 block">↑ 12% from last month</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gold-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase text-zinc-400 font-semibold">Bookings</span>
              <Calendar className="w-5 h-5 text-gold-400" />
            </div>
            <div className="font-serif text-3xl font-bold gold-gradient-text">{stats.totalBookings}</div>
            <span className="text-[10px] text-zinc-400 mt-1 block">Active reservation requests</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gold-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase text-zinc-400 font-semibold">Gallery Photos</span>
              <ImageIcon className="w-5 h-5 text-gold-400" />
            </div>
            <div className="font-serif text-3xl font-bold gold-gradient-text">{stats.totalGalleryImages}</div>
            <span className="text-[10px] text-zinc-400 mt-1 block">Published showcase photos</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gold-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase text-zinc-400 font-semibold">Inquiries</span>
              <MessageSquare className="w-5 h-5 text-gold-400" />
            </div>
            <div className="font-serif text-3xl font-bold gold-gradient-text">{stats.totalMessages}</div>
            <span className="text-[10px] text-zinc-400 mt-1 block">Client contact messages</span>
          </div>
        </div>

        {/* Dashboard Tab Controls */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-800 pb-4">
          {[
            { id: 'analytics', label: 'Analytics Overview', icon: BarChart3 },
            { id: 'gallery', label: 'Manage Gallery', icon: ImageIcon },
            { id: 'bookings', label: 'Bookings & Reservations', icon: Calendar },
            { id: 'messages', label: 'Contact Messages', icon: MessageSquare },
            { id: 'services', label: 'Services List', icon: Briefcase },
            { id: 'pricing', label: 'Pricing Packages', icon: DollarSign },
          ].map((tab) => {
            const IconC = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-gold-500 text-obsidian-950 font-bold shadow-lg'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-gold-500/30'
                }`}
              >
                <IconC className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ANALYTICS OVERVIEW */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-gold-500/20">
              <h3 className="font-serif text-xl font-bold mb-4">Recent Bookings Activity</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Client</th>
                      <th className="p-3">Event Type</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-zinc-300">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id}>
                        <td className="p-3 font-semibold text-white">{b.name}</td>
                        <td className="p-3">{b.eventType}</td>
                        <td className="p-3">{b.date}</td>
                        <td className="p-3">{b.location}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold">Gallery Photos ({gallery.length})</h3>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 rounded-full bg-gold-500 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Photograph</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item) => (
                <div key={item.id} className="glass-card rounded-2xl overflow-hidden relative group border border-zinc-800">
                  <img src={item.image} alt={item.title} className="w-full h-52 object-cover" />
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-gold-400">{item.category}</span>
                    <h4 className="font-serif font-bold text-white text-base">{item.title}</h4>
                    <p className="text-xs text-zinc-400 line-clamp-1">{item.description}</p>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="glass-panel p-6 rounded-2xl border border-gold-500/20">
            <h3 className="font-serif text-xl font-bold mb-4">All Reservation Requests ({bookings.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Client Name</th>
                    <th className="p-3">Phone / Email</th>
                    <th className="p-3">Event Type</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="p-3 font-semibold text-white">{b.name}</td>
                      <td className="p-3">
                        <div>{b.phone}</div>
                        <div className="text-zinc-500">{b.email}</div>
                      </td>
                      <td className="p-3">{b.eventType}</td>
                      <td className="p-3">{b.date}</td>
                      <td className="p-3">{b.location}</td>
                      <td className="p-3">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                          className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs font-semibold text-gold-400 focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="p-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">Client Inquiries ({messages.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {messages.map((m) => (
                <div key={m.id} className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif font-bold text-white text-base">{m.name}</h4>
                      <p className="text-xs text-gold-400">{m.phone} • {m.email}</p>
                    </div>
                    <span className="text-[10px] text-zinc-500">{new Date(m.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                    "{m.message}"
                  </p>
                  <div className="pt-2 flex gap-3">
                    <a href={`tel:${m.phone}`} className="text-[11px] font-bold text-gold-400 hover:underline">
                      Call Client
                    </a>
                    <a href={`mailto:${m.email}`} className="text-[11px] font-bold text-zinc-400 hover:underline">
                      Reply Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">Active Studio Services ({services.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.id} className="glass-panel p-4 rounded-2xl border border-zinc-800 space-y-3">
                  <img src={s.image} alt={s.title} className="w-full h-40 object-cover rounded-xl" />
                  <div className="flex justify-between items-center">
                    <h4 className="font-serif font-bold text-white">{s.title}</h4>
                    <span className="text-xs font-bold text-gold-400">{s.price}</span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: PRICING */}
        {activeTab === 'pricing' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">Pricing Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {pricing.map((p) => (
                <div key={p.id} className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-3 text-center">
                  <h4 className="font-serif font-bold text-white text-lg">{p.packageName}</h4>
                  <div className="font-serif text-2xl font-bold gold-gradient-text">{p.price}</div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Image Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-gold-500/40 shadow-2xl space-y-5"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-white">Upload Gallery Image</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                  placeholder="e.g. Royal Pre-Wedding Shoot"
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Category *</label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-gold-500 focus:outline-none"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Pre Wedding">Pre Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Baby Shoot">Baby Shoot</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Events">Events</option>
                  <option value="Nature">Nature</option>
                  <option value="Portrait">Portrait</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Choose File Upload (Multer API) *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full text-zinc-400 bg-zinc-900 p-2 rounded-xl border border-zinc-800"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">OR Image URL (Fallback)</label>
                <input
                  type="text"
                  value={uploadData.imageUrl}
                  onChange={(e) => setUploadData({ ...uploadData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  placeholder="Short details about location or theme..."
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 py-3 rounded-xl bg-gold-500 text-black font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Publish Image'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-3 rounded-xl border border-zinc-700 text-zinc-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
