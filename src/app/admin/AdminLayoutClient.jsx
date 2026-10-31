// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : AdminLayoutClient.jsx
// Description : AdminLayoutClient module.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, BookOpen, MessageSquare, FolderGit, ImageIcon, Link2, LogOut, ArrowLeft, Users, Mail, HelpCircle, KeyRound } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayoutClient({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { href: '/admin',           label: 'Overview',        icon: LayoutDashboard },
    { href: '/admin/blogs',     label: 'Blogs',           icon: BookOpen },
    { href: '/admin/comments',  label: 'Comments',        icon: MessageSquare },
    { href: '/admin/projects',  label: 'Projects',        icon: FolderGit },
    { href: '/admin/gallery',   label: 'Gallery',         icon: ImageIcon },
    { href: '/admin/backlinks', label: 'Backlinks',       icon: Link2 },
    { href: '/admin/enquiries', label: 'Enquiries',       icon: Mail },
    { href: '/admin/faqs',      label: 'FAQs',            icon: HelpCircle },
    { href: '/admin/visitors',  label: 'Visitors',        icon: Users },
    { href: '/admin/change-password', label: 'Change Password', icon: KeyRound },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div>
          {/* Header branding */}
          <div className="p-5 border-b border-slate-800">
            <Link href="/" className="flex items-center group py-1">
              <Image 
                src="/assets/logo-dark.webp" 
                alt="R Kiran Kumar Logo" 
                width={180} 
                height={30} 
                className="h-6 sm:h-7 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
                style={{ height: 'auto' }}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 py-3 rounded-xl text-sm font-semibold transition-all duration-250 ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/15 border-l-4 border-l-logo-orange pl-3'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100 px-4'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 space-y-1.5">
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Site</span>
          </Link>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-100 hover:bg-red-950/40 transition-all cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-grow p-6 sm:p-10 max-h-screen overflow-y-auto relative bg-gradient-to-br from-slate-50 to-slate-100/60 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
        {/* Immersive glow accents (primary cyan & logo orange) */}
        <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full blur-[130px] opacity-15 dark:opacity-10 pointer-events-none"
             style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full blur-[130px] opacity-12 dark:opacity-8 pointer-events-none"
             style={{ background: 'radial-gradient(circle, var(--logo-orange) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto relative z-10">
          {children}
        </div>
      </main>

      {/* Clean Modal based Logout Confirmation */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-card rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-border text-center space-y-4 animate-scale-in">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">Confirm Log Out</h3>
              <p className="text-xs text-foreground-muted font-light leading-relaxed">
                Are you sure you want to end your active session? You will need to log back in to manage your portfolio dashboard.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-foreground bg-background-alt hover:bg-border/60 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {loggingOut ? 'Logging out...' : 'Log Out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
