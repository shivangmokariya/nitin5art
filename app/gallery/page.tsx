import dbConnect from '@/lib/mongodb';
import Painting from '@/models/Painting';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const GalleryListClient = dynamic(() => import('@/components/GalleryListClient'), { ssr: false });

interface Pagination {
  currentPage: number;
  totalPages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default async function GalleryPage({ searchParams }: { searchParams: any }) {
  await dbConnect();
  const search = searchParams?.search || '';
  const category = searchParams?.category || 'all';
  const page = parseInt(searchParams?.page || '1');
  const limit = 12;
  const skip = (page - 1) * limit;

  let query: any = {};
  if (search) query.title = { $regex: search, $options: 'i' };
  if (category && category !== 'all') query.category = category;

  const [paintings, total] = await Promise.all([
    Painting.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Painting.countDocuments(query),
  ]);
  const totalPages = Math.ceil(total / limit);
  const pagination: Pagination = {
    currentPage: page,
    totalPages,
    total,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tanjore-paintings', label: 'Tanjore Paintings' },
    { value: 'sketch-painting', label: 'Sketch Paintings' },
    { value: 'oil-paintings', label: 'Oil Paintings' },
    { value: 'portraits', label: 'Portraits' },
  ];

  return (
    <>
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

        {/* Gallery Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {paintings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-secondary-600 text-lg mb-4">
                  No artwork found matching your criteria.
                </p>
                <Link href="/gallery" className="btn-primary">Clear Filters</Link>
              </div>
            ) : (
              <>
                {/* Results Info */}
                <div className="mb-8">
                  <p className="text-secondary-600">
                    Showing {paintings.length} of {pagination.total || 0} artworks
                    {search && ` for "${search}"`}
                    {category !== 'all' && ` in ${categories.find(c => c.value === category)?.label}`}
                  </p>
                </div>
                {/* Gallery List Client (Grid/List Toggle + Clickable Images) */}
                <GalleryListClient paintings={paintings as any} />
                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/gallery?page=${pagination.currentPage - 1}${search ? `&search=${search}` : ''}${category !== 'all' ? `&category=${category}` : ''}`}
                        className={`p-2 rounded-lg border border-secondary-300 hover:bg-secondary-50 ${!pagination.hasPrev ? 'opacity-50 pointer-events-none' : ''}`}
                        aria-disabled={!pagination.hasPrev}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Link>
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Link
                          key={pageNum}
                          href={`/gallery?page=${pageNum}${search ? `&search=${search}` : ''}${category !== 'all' ? `&category=${category}` : ''}`}
                          className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
                            pageNum === pagination.currentPage
                              ? 'bg-primary-600 text-white border-primary-600'
                              : 'border-secondary-300 text-secondary-700 hover:bg-secondary-50'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      ))}
                      <Link
                        href={`/gallery?page=${pagination.currentPage + 1}${search ? `&search=${search}` : ''}${category !== 'all' ? `&category=${category}` : ''}`}
                        className={`p-2 rounded-lg border border-secondary-300 hover:bg-secondary-50 ${!pagination.hasNext ? 'opacity-50 pointer-events-none' : ''}`}
                        aria-disabled={!pagination.hasNext}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Link>
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