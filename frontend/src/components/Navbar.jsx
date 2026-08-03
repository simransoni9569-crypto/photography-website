'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, Sun, Moon, Menu, X, Phone, UserCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { darkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel py-3 shadow-xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Studio Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-200 p-[2px] shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-obsidian-900 rounded-full flex items-center justify-center">
              <Camera className="w-5 h-5 text-gold-400" />
            </div>
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider gold-gradient-text block leading-none">
              SHREE JI
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-sans block mt-1">
              Pictures
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  isActive
                    ? 'text-gold-400 font-semibold'
                    : 'text-zinc-300 hover:text-gold-400 dark:text-zinc-300 dark:hover:text-gold-400'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 to-amber-300 rounded-full" />
                )}
              </Link>
            );
          })}

          {user && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-xs text-gold-400 border border-gold-500/40 px-3 py-1.5 rounded-full hover:bg-gold-500/10 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-zinc-700/50 bg-zinc-900/50 text-zinc-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-obsidian-900" />}
          </button>

          {/* Call Quick Link */}
          <a
            href="tel:8887647811"
            className="hidden md:flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-gold-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400" />
            <span>8887647811</span>
          </a>

          {/* Book Now Button */}
          <Link
            href="/booking"
            className="relative inline-flex items-center justify-center px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-400 via-gold-500 to-amber-300 rounded-full shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 transition-all duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-zinc-700/50 bg-zinc-900/50 text-zinc-300"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-gold-400"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-gold-500/20 px-6 py-6 mt-3 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-zinc-200 hover:text-gold-400 py-1"
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-gold-400 py-1"
            >
              Admin Dashboard
            </Link>
          )}
          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
            <a
              href="tel:8887647811"
              className="flex items-center gap-2 text-sm text-zinc-300"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>+91 8887647811</span>
            </a>
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-400 to-amber-300 rounded-lg shadow-md"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
