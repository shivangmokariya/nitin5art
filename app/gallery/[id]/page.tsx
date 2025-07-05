'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Eye, Heart, Share2, Mail, Calendar, Palette, Ruler } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';

interface Painting {
  _id: string;
  title: string;
  description: string;
  category: string;
  medium: string;
  size: string;
  imageUrl: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
    alt: string;
    keywords: string[];
  };
  views: number;
  featured: boolean;
  createdAt: string;
}

export default function PaintingPage() {
  const params = useParams();
  const [painting, setPainting] = useState<Painting | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        console.log(params,"<<<<params")
        const response = await fetch(`/api/paintings/${params.id}`);
        const data = await response.json();
        
        if (response.ok) {
          setPainting(data);
        } else {
          // Fallback to sample data
          setPainting({
            _id: params.slug as string,
            title: 'Divine Tanjore',
            description: 'Traditional Tanjore painting with gold leaf and rich colors. This piece showcases the ancient South Indian art form with intricate details, vibrant colors, and gold leaf embellishments.',
            category: 'tanjore-paintings',
            medium: 'Traditional Tanjore',
            size: '24" x 36"',
            imageUrl: '/sample-artwork-1.jpg',
            tags: ['tanjore', 'traditional', 'gold leaf', 'south indian', 'divine'],
            seo: {
              title: 'Divine Tanjore - Traditional South Indian Art',
              description: 'Traditional Tanjore painting with gold leaf and rich colors. Original artwork by professional artist.',
              alt: 'Traditional Tanjore painting with gold leaf',
              keywords: ['tanjore', 'traditional', 'gold leaf', 'south indian', 'divine']
            },
            views: 156,
            featured: true,
            createdAt: '2024-01-15T10:30:00Z'
          });
        }
      } catch (error) {
        console.error('Error fetching painting:', error);
        // Fallback to sample data
        setPainting({
          _id: params.slug as string,
          title: 'Divine Tanjore',
          description: 'Traditional Tanjore painting with gold leaf and rich colors. This piece showcases the ancient South Indian art form with intricate details, vibrant colors, and gold leaf embellishments.',
          category: 'tanjore-paintings',
          medium: 'Traditional Tanjore',
          size: '24" x 36"',
                      imageUrl: '/sample-artwork-1.jpg',
          tags: ['tanjore', 'traditional', 'gold leaf', 'south indian', 'divine'],
          seo: {
            title: 'Divine Tanjore - Traditional South Indian Art',
            description: 'Traditional Tanjore painting with gold leaf and rich colors. Original artwork by professional artist.',
            alt: 'Traditional Tanjore painting with gold leaf',
            keywords: ['tanjore', 'traditional', 'gold leaf', 'south indian', 'divine']
          },
          views: 156,
          featured: true,
          createdAt: '2024-01-15T10:30:00Z'
        });
      } finally {
        setLoading(false);
      }
    };

    if (!params.id) {
      setLoading(false);
      setPainting(null);
      return;
    }
    fetchPainting();
  }, [params.id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: painting?.title,
        text: painting?.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-secondary-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="bg-secondary-200 h-8 w-32 rounded mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-secondary-200 h-96 rounded-lg"></div>
                <div className="space-y-4">
                  <div className="bg-secondary-200 h-8 rounded"></div>
                  <div className="bg-secondary-200 h-4 rounded w-3/4"></div>
                  <div className="bg-secondary-200 h-4 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!painting && !loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-secondary-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-serif font-bold text-secondary-900 mb-4">
              Artwork Not Found
            </h1>
            <p className="text-secondary-600 mb-8">
              The artwork you're looking for doesn't exist, the link is invalid, or the slug is missing.
            </p>
            <Link href="/gallery" className="btn-primary">
              Browse Gallery
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!painting) {
    return null;
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-secondary-50">
        {/* Breadcrumb */}
        <section className="bg-white border-b border-secondary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-secondary-600">
              <Link href="/" className="hover:text-primary-600 transition-colors duration-200">
                Home
              </Link>
              <span>/</span>
              <Link href="/gallery" className="hover:text-primary-600 transition-colors duration-200">
                Gallery
              </Link>
              <span>/</span>
              <span className="text-secondary-900">{painting.title}</span>
            </nav>
          </div>
        </section>

        {/* Artwork Details */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={painting.imageUrl}
                    alt={painting.seo.alt}
                    fill
                    className="object-cover"
                    priority
                  />
                  {painting.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                
                {/* Action buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200">
                      <Eye className="h-5 w-5" />
                      <span>{painting.views} views</span>
                    </button>
                    <button className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200">
                      <Heart className="h-5 w-5" />
                      <span>Favorite</span>
                    </button>
                  </div>
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-serif font-bold text-secondary-900 mb-2">
                    {painting.title}
                  </h1>
                  <p className="text-lg text-secondary-600">
                    {painting.description}
                  </p>
                </div>

                {/* Specifications */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-secondary-900 mb-4">
                    Specifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Palette className="h-5 w-5 text-primary-600" />
                      <span className="text-secondary-700">
                        <span className="font-medium">Medium:</span> {painting.medium}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Ruler className="h-5 w-5 text-primary-600" />
                      <span className="text-secondary-700">
                        <span className="font-medium">Size:</span> {painting.size}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-primary-600" />
                      <span className="text-secondary-700">
                        <span className="font-medium">Created:</span> {new Date(painting.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {painting.tags && painting.tags.length > 0 && (
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-secondary-900 mb-3">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {painting.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-4">
                  <button
                    onClick={() => setShowInquiryForm(true)}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Inquire About This Piece</span>
                  </button>
                  
                  <Link
                    href="/gallery"
                    className="w-full btn-outline flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Gallery</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form Modal */}
        {showInquiryForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-serif font-semibold text-secondary-900">
                    Inquire About "{painting.title}"
                  </h2>
                  <button
                    onClick={() => setShowInquiryForm(false)}
                    className="text-secondary-400 hover:text-secondary-600"
                  >
                    ✕
                  </button>
                </div>
                <InquiryForm
                  paintingId={painting._id}
                  paintingTitle={painting.title}
                  onSuccess={() => setShowInquiryForm(false)}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
} 