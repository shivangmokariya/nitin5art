'use client';

import { useState, useEffect } from 'react';
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

export default function FeaturedGallery() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPaintings = async () => {
      try {
        const response = await fetch('/api/paintings?featured=true&limit=6');
        const data = await response.json();
        setPaintings(data.paintings || []);
      } catch (error) {
        console.error('Error fetching featured paintings:', error);
        // Fallback to sample data
        setPaintings([
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPaintings();
  }, []);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paintings.slice(currentIndex, currentIndex + 3).map((painting) => (
          <div key={painting._id} className="group card overflow-hidden">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={painting.imageUrl}
                alt={painting.seo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Overlay actions */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-4">
                  <Link
                    href={painting.slug ? `/gallery/${painting.slug}` : "#"}
                    className="bg-white/90 hover:bg-white text-secondary-900 p-3 rounded-full transition-colors duration-200"
                  >
                    <Eye className="h-5 w-5" />
                  </Link>
                  <button className="bg-white/90 hover:bg-white text-secondary-900 p-3 rounded-full transition-colors duration-200">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-serif text-xl font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                {painting.title}
              </h3>
              <p className="text-secondary-600 text-sm mb-3 line-clamp-2">
                {painting.description}
              </p>
              <div className="flex justify-between items-center text-sm text-secondary-500">
                <span>{painting.medium}</span>
                <span>{painting.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
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
    </div>
  );
} 