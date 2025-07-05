'use client';

import { useState } from 'react';
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
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hide sidebar and navbar on login page
  if (pathname === '/admin/login') {
    return (
      <main className="flex-1 p-8 bg-secondary-50 min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      {/* Top Navbar */}
      <header className="w-full bg-white shadow-sm border-b border-secondary-200 flex items-center justify-between px-6 py-3 z-10">
        <div className="flex items-center space-x-4">
          <button className="md:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-6 w-6 text-primary-700" /> : <Menu className="h-6 w-6 text-primary-700" />}
          </button>
          <Link href="/admin" className="flex items-center space-x-2">
            <span className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg">A</span>
            <span className="font-serif text-2xl font-bold text-primary-700">Admin Panel</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-secondary-700 font-medium hidden sm:block">Welcome, Admin</span>
          <button
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            onClick={() => { router.push('/admin/logout'); }}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-secondary-200 flex flex-col py-6 px-4 w-64 transition-transform duration-200 z-20 fixed md:static inset-y-0 left-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="mb-8 md:hidden flex justify-end">
            <button onClick={() => setSidebarOpen(false)}><X className="h-6 w-6 text-primary-700" /></button>
          </div>
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${pathname === item.href ? 'bg-primary-50 text-primary-700' : 'text-secondary-700 hover:bg-primary-50 hover:text-primary-700'}`}
                onClick={() => setSidebarOpen(false)}
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
    </div>
  );
} 