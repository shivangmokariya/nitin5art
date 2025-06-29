'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Image, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Users,
  BarChart3
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Manage Artwork', href: '/admin/artwork' },
  { name: 'Hero Image', href: '/admin/hero-image' },
  { name: 'Artist Settings', href: '/admin/artist-settings' },
  { name: 'View Inquiries', href: '/admin/inquiries' },
  { name: 'Analytics', href: '/admin/analytics' },
  { name: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-secondary-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-secondary-200 flex flex-col py-6 px-4">
        <div className="mb-8">
          <Link href="/admin" className="text-2xl font-serif font-bold text-primary-600">
            Admin Panel
          </Link>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2 rounded-lg text-secondary-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-8 text-xs text-secondary-400 text-center">
          &copy; {new Date().getFullYear()} Artist Admin
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-secondary-50 min-h-screen">
        {children}
      </main>
    </div>
  );
} 