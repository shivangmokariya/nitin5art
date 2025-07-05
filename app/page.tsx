import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Eye, Palette } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedGallery from '@/components/FeaturedGallery';
import HeroImage from '@/components/HeroImage';
import ArtistImage from '@/components/ArtistImage';
import { getCategoryData } from '@/lib/categoryUtils';
import { getSiteStats } from '@/lib/statsUtils';
import { getSiteSettings } from '@/lib/siteUtils';
import DynamicAboutText from "@/components/DynamicAboutText";

export const metadata: Metadata = {
  title: 'Professional Artist Gallery | Paint Sketch Artwork',
  description: 'Discover stunning paint sketch artwork by a professional artist. Browse our collection of landscapes, portraits, and abstract pieces. Contact us for inquiries about original artwork.',
  keywords: ['artist', 'paint sketch', 'artwork', 'gallery', 'original art', 'landscape', 'portrait', 'abstract'],
  openGraph: {
    title: 'Professional Artist Gallery | Paint Sketch Artwork',
    description: 'Discover stunning paint sketch artwork by a professional artist. Browse our collection of landscapes, portraits, and abstract pieces.',
    images: ['/hero-image.jpg'],
  },
};

export default async function HomePage() {
  const [categoryData, siteStats, siteSettings] = await Promise.all([
    getCategoryData(),
    getSiteStats(),
    getSiteSettings()
  ]);
console.log(categoryData,'categoryData');
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 lg:pt-12 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-secondary-900 mb-6 leading-tight">
                Discover the Art of{' '}
                <span className="text-primary-600">Emotion</span>
              </h1>
              <p className="text-xl text-secondary-700 mb-8 leading-relaxed">
                Each brushstroke tells a story, every color evokes emotion. 
                Explore our collection of original paint sketch artwork that 
                captures the beauty of life through the eyes of a professional artist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/gallery" className="btn-primary inline-flex items-center justify-center">
                  Explore Gallery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/about" className="btn-outline inline-flex items-center justify-center">
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <HeroImage />
              
              {/* Floating stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold text-secondary-900">{siteStats.averageRating}/5</span>
                </div>
                <p className="text-sm text-secondary-600">Customer Rating</p>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-primary-600" />
                  <span className="font-semibold text-secondary-900">{siteStats.totalPaintings}+</span>
                </div>
                <p className="text-sm text-secondary-600">Artworks Created</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-secondary-900 mb-4">
              Featured Artwork
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Discover our most popular pieces, each one a unique expression of creativity and skill.
            </p>
          </div>
          
          <FeaturedGallery />
          
          <div className="text-center mt-12">
            <Link href="/gallery" className="btn-primary inline-flex items-center">
              View All Artwork
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-secondary-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Find the perfect piece for your space from our diverse collection of styles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryData.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group card overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-secondary-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-secondary-600 mb-3">
                    {category.description}
                  </p>
                  <p className="text-sm text-primary-600 font-medium">
                    {category.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <ArtistImage 
                artistName={siteSettings.artistName}
                artistExperience={siteSettings.artistExperience}
              />
            </div>
            
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-secondary-900 mb-6">
                Meet the Artist
              </h2>
              <p className="text-lg text-secondary-700 mb-6 leading-relaxed">
                <DynamicAboutText />
              </p>
              <p className="text-lg text-secondary-700 mb-8 leading-relaxed">
                My work spans various styles and subjects, from serene landscapes to expressive 
                portraits, always maintaining the distinctive character that makes each piece truly original.
              </p>
              <Link href="/about" className="btn-primary inline-flex items-center">
                Learn More About Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Browse our complete collection or get in touch to discuss a custom commission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery" className="bg-white text-primary-600 hover:bg-secondary-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              Browse Gallery
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              Contact Artist
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 