// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : Navbar.jsx
// Description : Navbar UI component.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, User2, FolderHeart, BookOpen, Image as ImageIcon, MessageSquare, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { href: '/about',    label: 'About',    icon: User2 },
    { href: '/projects', label: 'Projects', icon: FolderHeart },
    { href: '/blog',     label: 'Blog',     icon: BookOpen },
    { href: '/gallery',  label: 'Gallery',  icon: ImageIcon },
    { href: '/contact',  label: 'Contact',  icon: MessageSquare },
  ];

  // Auto-hide top bar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false); // Scrolling down
      } else {
        setShowNavbar(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  return (
    <header 
      className={`sticky top-0 z-50 w-full glass-panel shadow-sm transition-transform duration-300 ease-in-out ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* ── Brand Logo (Dynamic based on theme) ── */}
          <Link href="/" className="flex items-center group shrink-0 py-1">
            <Image
              src="/assets/logo-light.webp"
              alt="R Kiran Kumar Logo"
              width={220}
              height={36}
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02] dark:hidden"
              style={{ height: 'auto' }}
              priority
            />
            <Image
              src="/assets/logo-dark.webp"
              alt="R Kiran Kumar Logo"
              width={220}
              height={36}
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02] hidden dark:block"
              style={{ height: 'auto' }}
              priority
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold flex items-center space-x-1.5 py-2 border-b-2 transition-colors duration-200 ${
                    isActive(link.href)
                      ? 'text-primary border-primary'
                      : 'border-transparent hover:text-primary hover:border-primary'
                  }`}
                  style={{ color: isActive(link.href) ? 'var(--primary)' : 'var(--foreground-muted)' }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer flex items-center justify-center"
              style={{ background: 'var(--badge-bg)', color: 'var(--foreground-muted)' }}
            >
              {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
              {theme === 'dark' && <Moon className="w-4 h-4 text-indigo-400" />}
              {theme === 'system' && <Monitor className="w-4 h-4 text-primary" />}
            </button>
          </nav>

          {/* ── Mobile Right Controls ── */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              className="p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center"
              style={{ background: 'var(--badge-bg)', color: 'var(--foreground-muted)' }}
            >
              {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
              {theme === 'dark' && <Moon className="w-4 h-4 text-indigo-400" />}
              {theme === 'system' && <Monitor className="w-4 h-4 text-primary" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg focus:outline-none transition-colors"
              style={{ color: 'var(--foreground-muted)' }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {isOpen && (
        <div className="md:hidden animate-fade-in border-t" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-semibold transition-colors ${
                    isActive(link.href) ? 'text-primary' : 'hover:text-primary'
                  }`}
                  style={{
                    background: isActive(link.href) ? 'var(--primary-light)' : 'transparent',
                    color: isActive(link.href) ? 'var(--primary)' : 'var(--foreground)',
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: isActive(link.href) ? 'var(--primary)' : 'var(--foreground-muted)' }} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
