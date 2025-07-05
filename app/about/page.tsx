import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Palette, Award, Users, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArtistImage from '@/components/ArtistImage';
import { getSiteSettings } from '@/lib/siteUtils';
import DynamicAboutText from "@/components/DynamicAboutText";

export const metadata: Metadata = {
  title: 'About the Artist | Professional Artist Gallery',
  description: 'Learn about the professional artist behind our stunning paint sketch artwork collection. Discover the journey, inspiration, and dedication that goes into each piece.',
  keywords: ['artist', 'about', 'biography', 'paint sketch', 'artwork', 'professional artist'],
  openGraph: {
    title: 'About the Artist | Professional Artist Gallery',
    description: 'Learn about the professional artist behind our stunning paint sketch artwork collection.',
    images: ['/artist-image.jpg'],
  },
};

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 lg:pt-12 lg:pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl lg:text-6xl font-serif font-bold text-secondary-900 mb-6 leading-tight">
                  About the{' '}
                  <span className="text-primary-600">Artist</span>
                </h1>
                <p className="text-xl text-secondary-700 mb-8 leading-relaxed">
                  Discover the story behind the artwork, the passion that drives creativity, 
                  and the journey that has shaped a unique artistic vision.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/gallery" className="btn-primary inline-flex items-center justify-center">
                    View Artwork
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="btn-outline inline-flex items-center justify-center">
                    Get in Touch
                  </Link>
                </div>
              </div>
              
              <div className="relative animate-slide-up">
                <ArtistImage 
                  artistName={siteSettings.artistName}
                  artistExperience={siteSettings.artistExperience}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Artist Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-secondary-900 mb-4">
                My Artistic Journey
              </h2>
              <p className="text-xl text-secondary-600">
                From humble beginnings to professional recognition
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p className="text-lg leading-relaxed mb-6">
                <DynamicAboutText />
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                My artistic journey began with a simple fascination for how colors and textures 
                could capture the essence of a moment. What started as a hobby quickly evolved 
                into a passionate pursuit of artistic excellence, leading me to explore various 
                mediums and techniques.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Each piece I create is more than just a painting—it's a window into a moment 
                in time, an emotion captured on canvas, or a story waiting to be told. I believe 
                that art has the power to transform spaces and touch hearts, which is why I pour 
                my soul into every brushstroke.
              </p>
              
              <p className="text-lg leading-relaxed">
                My work spans various styles and subjects, from serene landscapes that transport 
                you to peaceful moments, to expressive portraits that capture the depth of human 
                emotion, always maintaining the distinctive character that makes each piece truly original.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">1500+</h3>
                <p className="text-secondary-600">Artworks Created</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">15+</h3>
                <p className="text-secondary-600">Years Experience</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">500+</h3>
                <p className="text-secondary-600">Happy Collectors</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">5.0</h3>
                <p className="text-secondary-600">Average Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-secondary-900 mb-4">
                My Artistic Philosophy
              </h2>
              <p className="text-xl text-secondary-600">
                The principles that guide my creative process
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card p-8">
                <h3 className="text-xl font-serif font-semibold text-secondary-900 mb-4">
                  Authenticity
                </h3>
                <p className="text-secondary-700">
                  Every piece I create is an authentic expression of my vision and emotions. 
                  I believe in staying true to my artistic voice while continuously evolving and growing.
                </p>
              </div>
              
              <div className="card p-8">
                <h3 className="text-xl font-serif font-semibold text-secondary-900 mb-4">
                  Quality
                </h3>
                <p className="text-secondary-700">
                  I use only the finest materials and techniques to ensure that each artwork 
                  not only looks beautiful but also stands the test of time.
                </p>
              </div>
              
              <div className="card p-8">
                <h3 className="text-xl font-serif font-semibold text-secondary-900 mb-4">
                  Connection
                </h3>
                <p className="text-secondary-700">
                  Art is about creating connections—between the artist and viewer, 
                  between emotions and expression, between the past and present.
                </p>
              </div>
              
              <div className="card p-8">
                <h3 className="text-xl font-serif font-semibold text-secondary-900 mb-4">
                  Innovation
                </h3>
                <p className="text-secondary-700">
                  While I honor traditional techniques, I'm always exploring new ways 
                  to push boundaries and create something truly unique and contemporary.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
              Ready to Experience My Art?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Browse my collection or get in touch to discuss a custom commission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/gallery" className="bg-white text-primary-600 hover:bg-secondary-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Browse Gallery
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Contact Me
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
} 