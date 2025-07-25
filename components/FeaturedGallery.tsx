'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Eye, Heart } from 'lucide-react';

interface Painting {
  _id: string;
  title: string;
  description: string;
  category: string;
  medium: string;
  size: string;
  imageUrl: string;
  seo: {
    alt: string;
  };
  views: number;
  featured: boolean;
  slug: string;
}

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

export default function FeaturedGallery() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // Track loading state for each image by id
  const [loadingMap, setLoadingMap] = useState<{ [id: string]: boolean }>({});

  // Reset loadingMap when paintings change
  useEffect(() => {
    const map: { [id: string]: boolean } = {};
    paintings.forEach((p) => { map[p._id] = true; });
    setLoadingMap(map);
  }, [paintings]);

  useEffect(() => {
    const fetchFeaturedPaintings = async () => {
      try {
        const response = await fetch('/api/paintings?featured=true&limit=6');
        const data = await response.json();
        setPaintings(data.paintings || []);
        // Set all images to loading initially
        const map: { [id: string]: boolean } = {};
        (data.paintings || []).forEach((p: Painting) => { map[p._id] = true; });
        setLoadingMap(map);
      } catch (error) {
        console.error('Error fetching featured paintings:', error);
        // Fallback to sample data
        const fallback = [
          {
            _id: '1',
            title: 'Divine Tanjore',
            description: 'Traditional Tanjore painting with gold leaf and rich colors',
            category: 'tanjore-paintings',
            medium: 'Traditional Tanjore',
            size: '24" x 36"',
            imageUrl: '/sample-artwork-1.jpg',
            seo: { alt: 'Traditional Tanjore painting with gold leaf' },
            views: 156,
            featured: true,
            slug: 'divine-tanjore'
          },
          {
            _id: '2',
            title: 'Sketch Portrait',
            description: 'Detailed pencil sketch capturing human emotion',
            category: 'sketch-painting',
            medium: 'Pencil on Paper',
            size: '20" x 24"',
            imageUrl: '/sample-artwork-2.jpg',
            seo: { alt: 'Detailed pencil sketch portrait' },
            views: 89,
            featured: true,
            slug: 'sketch-portrait'
          },
          {
            _id: '3',
            title: 'Oil Masterpiece',
            description: 'Classic oil painting with rich textures and colors',
            category: 'oil-paintings',
            medium: 'Oil on Canvas',
            size: '30" x 40"',
            imageUrl: '/sample-artwork-3.jpg',
            seo: { alt: 'Classic oil painting masterpiece' },
            views: 203,
            featured: true,
            slug: 'oil-masterpiece'
          }
        ];
        setPaintings(fallback);
        const map: { [id: string]: boolean } = {};
        fallback.forEach((p) => { map[p._id] = true; });
        setLoadingMap(map);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPaintings();
  }, []);

  const handleImageLoad = (id: string) => {
    setLoadingMap(prev => ({ ...prev, [id]: false }));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === paintings.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? paintings.length - 3 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-secondary-200 h-64 rounded-lg mb-4"></div>
            <div className="bg-secondary-200 h-4 rounded mb-2"></div>
            <div className="bg-secondary-200 h-3 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (paintings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-600 text-lg">No featured artwork available at the moment.</p>
      </div>
    );
  }

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
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
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
                ref={el => {
                  // Check if image is already loaded from cache
                  if (el && el.complete && loadingMap[painting._id]) {
                    handleImageLoad(painting._id);
                  }
                }}
                src={painting.imageUrl}
                alt={painting.seo.alt}
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
      {/* Navigation arrows */}
      {/* Remove the navigation arrows if not functional */}
      {/*
      {paintings.length > 3 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-secondary-100 p-3 rounded-full shadow-lg transition-colors duration-200"
          >
            <ChevronLeft className="h-6 w-6 text-secondary-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-secondary-100 p-3 rounded-full shadow-lg transition-colors duration-200"
          >
            <ChevronRight className="h-6 w-6 text-secondary-700" />
          </button>
        </>
      )}
      */}
    </div>
  );
}