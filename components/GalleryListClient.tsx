"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function BrushLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <svg width="80" height="80" viewBox="0 0 120 120" className="animate-spin-slow">
        <ellipse
          cx="60"
          cy="60"
          rx="50"
          ry="50"
          fill="none"
          stroke="url(#brushGradient)"
          strokeWidth="12"
          strokeDasharray="40 30"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="brushGradient" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f59e42" />
            <stop offset="0.3" stopColor="#3b82f6" />
            <stop offset="0.6" stopColor="#10b981" />
            <stop offset="1" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </svg>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

interface Painting {
  _id: string;
  title: string;
  description: string;
  category: string;
  medium: string;
  size: string;
  imageUrl: string;
  seo?: {
    alt?: string;
  };
  featured?: boolean;
  slug?: string;
}

export default function GalleryListClient({ paintings }: { paintings: Painting[] }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // Track loading state for each image by id
  const [loadingMap, setLoadingMap] = useState<{ [id: string]: boolean }>(() => {
    const map: { [id: string]: boolean } = {};
    paintings.forEach(p => { map[p._id] = true; });
    return map;
  });

  // Reset loadingMap when paintings change
  useEffect(() => {
    const map: { [id: string]: boolean } = {};
    paintings.forEach((p) => { map[p._id] = true; });
    setLoadingMap(map);
  }, [paintings]);

  const handleImageLoad = (id: string) => {
    setLoadingMap(prev => ({ ...prev, [id]: false }));
  };

  return (
    <div className="relative">
      {/* View Mode Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setViewMode('grid')}
          className={`px-4 py-2 rounded-l-lg border border-secondary-300 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-secondary-700 hover:bg-secondary-50'}`}
        >
          Grid
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded-r-lg border border-secondary-300 border-l-0 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-secondary-700 hover:bg-secondary-50'}`}
        >
          List
        </button>
      </div>
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
          : 'space-y-6'
      }>
        {paintings.map((painting) => (
          <Link
            key={painting._id}
            href={`/gallery/${painting.slug || painting._id}`}
            className={`group card overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}
          >
            <div className={`relative aspect-square rounded-lg overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : ''}`}>
              {loadingMap[painting._id] && <BrushLoader />}
              <Image
                src={painting.imageUrl}
                alt={painting.seo?.alt || painting.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                onLoadingComplete={() => handleImageLoad(painting._id)}
                onError={() => handleImageLoad(painting._id)}
              />
            </div>
            <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <h3 className="font-serif text-xl font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                {painting.title}
              </h3>
              <p className="text-secondary-600 text-sm mb-3 line-clamp-2">
                {painting.description}
              </p>
              <div className="flex justify-between items-center text-sm text-secondary-500 mb-3">
                <span>{painting.medium}</span>
                <span>{painting.size}</span>
              </div>
              {painting.featured && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 