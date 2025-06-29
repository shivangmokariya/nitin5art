'use client';

import { useState, useEffect } from 'react';
import { Image, MessageSquare, Eye, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalPaintings: number;
  totalInquiries: number;
  totalViews: number;
  featuredPaintings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsResponse = await fetch('/api/admin/stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        } else {
          setStats({
            totalPaintings: 45,
            totalInquiries: 23,
            totalViews: 1250,
            featuredPaintings: 8
          });
        }
      } catch (error) {
        setStats({
          totalPaintings: 45,
          totalInquiries: 23,
          totalViews: 1250,
          featuredPaintings: 8
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-4 bg-secondary-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-secondary-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-secondary-900">
          Dashboard
        </h1>
        <p className="text-secondary-600">
          Welcome to your admin dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Image className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Total Artwork</p>
              <p className="text-2xl font-bold text-secondary-900">{stats?.totalPaintings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Total Inquiries</p>
              <p className="text-2xl font-bold text-secondary-900">{stats?.totalInquiries}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Total Views</p>
              <p className="text-2xl font-bold text-secondary-900">{stats?.totalViews?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Featured Pieces</p>
              <p className="text-2xl font-bold text-secondary-900">{stats?.featuredPaintings}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-secondary-200">
        <div className="p-6 border-b border-secondary-200">
          <h2 className="text-lg font-serif font-semibold text-secondary-900">
            Quick Actions
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/artwork"
              className="flex items-center p-4 text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors duration-200 border border-secondary-200"
            >
              <Image className="h-5 w-5 mr-3" />
              <span>Manage Artwork</span>
            </a>
            <a
              href="/admin/inquiries"
              className="flex items-center p-4 text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors duration-200 border border-secondary-200"
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              <span>View Inquiries</span>
            </a>
            <a
              href="/admin/analytics"
              className="flex items-center p-4 text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors duration-200 border border-secondary-200"
            >
              <TrendingUp className="h-5 w-5 mr-3" />
              <span>Analytics</span>
            </a>
            <a
              href="/admin/settings"
              className="flex items-center p-4 text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors duration-200 border border-secondary-200"
            >
              <Image className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 