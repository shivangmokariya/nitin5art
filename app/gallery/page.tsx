'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, Grid, List, Eye, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Painting {
  _id: string;
  title: string;
  description: string;
  category: string;
  medium: string;
  size: string;
  price: number;
  imageUrl: string;
  seo: {
    alt: string;
  };
  views: number;
  featured: boolean;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // URL state
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page') || '1');
  
  // Local state
  const [localSearch, setLocalSearch] = useState(search);
  const [localCategory, setLocalCategory] = useState(category);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'landscape', label: 'Landscapes' },
    { value: 'portrait', label: 'Portraits' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'still-life', label: 'Still Life' },
    { value: 'other', label: 'Other' },
  ];

  useEffect(() => {
    const fetchPaintings = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category !== 'all') params.append('category', category);
        params.append('page', page.toString());
        params.append('limit', '12');

        const response = await fetch(`/api/paintings?${params.toString()}`);
        const data = await response.json();
        
        setPaintings(data.paintings || []);
        setPagination(data.pagination || null);
      } catch (error) {
        console.error('Error fetching paintings:', error);
        // Fallback to sample data
        setPaintings([
          {
            _id: '1',
            title: 'Mountain Serenity',
            description: 'A peaceful mountain landscape captured in warm tones',
            category: 'landscape',
            medium: 'Oil on Canvas',
            size: '24" x 36"',
            price: 1200,
            imageUrl: '/sample-artwork-1.jpg',
            seo: { alt: 'Mountain landscape painting in warm tones' },
            views: 156,
            featured: true
          },
          {
            _id: '2',
            title: 'Urban Portrait',
            description: 'Contemporary portrait with urban influences',
            category: 'portrait',
            medium: 'Acrylic on Canvas',
            size: '20" x 24"',
            price: 800,
            imageUrl: '/sample-artwork-2.jpg',
            seo: { alt: 'Contemporary urban portrait painting' },
            views: 89,
            featured: true
          },
          {
            _id: '3',
            title: 'Abstract Harmony',
            description: 'Bold abstract composition with vibrant colors',
            category: 'abstract',
            medium: 'Mixed Media',
            size: '30" x 40"',
            price: 1500,
            imageUrl: '/sample-artwork-3.jpg',
            seo: { alt: 'Vibrant abstract painting with bold colors' },
            views: 203,
            featured: true
          }
        ]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          total: 3,
          hasNext: false,
          hasPrev: false
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, [search, category, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (localSearch.trim()) params.append('search', localSearch.trim());
    if (localCategory !== 'all') params.append('category', localCategory);
    params.append('page', '1');
    
    router.push(`/gallery?${params.toString()}`);
  };

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (newCategory !== 'all') params.append('category', newCategory);
    params.append('page', '1');
    
    router.push(`/gallery?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category !== 'all') params.append('category', category);
    params.append('page', newPage.toString());
    
    router.push(`/gallery?${params.toString()}`);
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-secondary-50">
        {/* Page Header */}
        <section className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-secondary-900 mb-4">
                Art Gallery
              </h1>
              <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
                Explore our collection of original paint sketch artwork. 
                Each piece is a unique expression of creativity and emotion.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="bg-white border-b border-secondary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search artwork..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-secondary-400" />
                </div>
              </form>

              {/* Filters and View Toggle */}
              <div className="flex items-center space-x-4">
                {/* Category Filter */}
                <div className="hidden md:flex items-center space-x-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleCategoryChange(cat.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                        category === cat.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center space-x-2 px-3 py-2 border border-secondary-300 rounded-lg hover:bg-secondary-50"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-secondary-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-secondary-600 hover:bg-secondary-50'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === 'list'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-secondary-600 hover:bg-secondary-50'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="mt-4 md:hidden">
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleCategoryChange(cat.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                        category === cat.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-secondary-200 h-64 rounded-lg mb-4"></div>
                    <div className="bg-secondary-200 h-4 rounded mb-2"></div>
                    <div className="bg-secondary-200 h-3 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : paintings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-secondary-600 text-lg mb-4">
                  No artwork found matching your criteria.
                </p>
                <button
                  onClick={() => router.push('/gallery')}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Results Info */}
                <div className="mb-8">
                  <p className="text-secondary-600">
                    Showing {paintings.length} of {pagination?.total || 0} artworks
                    {search && ` for "${search}"`}
                    {category !== 'all' && ` in ${categories.find(c => c.value === category)?.label}`}
                  </p>
                </div>

                {/* Gallery Grid/List */}
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                    : 'space-y-6'
                }>
                  {paintings.map((painting) => (
                    <div key={painting._id} className={`group card overflow-hidden ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}>
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'h-64'
                      }`}>
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
                              href={`/gallery/${painting._id}`}
                              className="bg-white/90 hover:bg-white text-secondary-900 p-3 rounded-full transition-colors duration-200"
                            >
                              <Eye className="h-5 w-5" />
                            </Link>
                            <button className="bg-white/90 hover:bg-white text-secondary-900 p-3 rounded-full transition-colors duration-200">
                              <Heart className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Price tag */}
                        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ${typeof painting.price === 'number' ? painting.price.toLocaleString() : 'N/A'}
                        </div>
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-secondary-500">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{painting.views} views</span>
                          </div>
                          {painting.featured && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrev}
                        className="p-2 rounded-lg border border-secondary-300 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
                            pageNum === pagination.currentPage
                              ? 'bg-primary-600 text-white border-primary-600'
                              : 'border-secondary-300 text-secondary-700 hover:bg-secondary-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={!pagination.hasNext}
                        className="p-2 rounded-lg border border-secondary-300 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
} 