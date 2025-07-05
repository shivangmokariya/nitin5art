import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';

export const metadata: Metadata = {
  title: 'Contact the Artist | Professional Artist Gallery',
  description: 'Get in touch with the artist for inquiries about artwork, custom commissions, or general questions. We\'d love to hear from you!',
  keywords: ['contact', 'artist', 'inquiry', 'commission', 'artwork', 'custom art'],
  openGraph: {
    title: 'Contact the Artist | Professional Artist Gallery',
    description: 'Get in touch with the artist for inquiries about artwork, custom commissions, or general questions.',
    images: ['/contact-image.jpg'],
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-secondary-900 mb-6 leading-tight">
                Get in{' '}
                <span className="text-primary-600">Touch</span>
              </h1>
              <p className="text-xl text-secondary-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                Have a question about my artwork? Interested in a custom commission? 
                I'd love to hear from you and discuss how we can bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/gallery" className="btn-primary inline-flex items-center justify-center">
                  Browse Gallery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="#contact-form" className="btn-outline inline-flex items-center justify-center">
                  Send Message
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-secondary-900 mb-6">
                  Send a Message
                </h2>
                <p className="text-lg text-secondary-700 mb-8">
                  Fill out the form below and I'll get back to you as soon as possible. 
                  Whether you're interested in purchasing artwork, commissioning a custom piece, 
                  or just want to say hello, I'm here to help.
                </p>
                
                <div id="contact-form">
                  <InquiryForm />
                </div>
              </div>
              
              {/* Contact Details */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-secondary-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-lg text-secondary-700 mb-8">
                  Here are the best ways to reach me. I typically respond within 24-48 hours 
                  during business days.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">Email</h3>
                      <p className="text-secondary-700">support@nitin5art.com</p>
                      <p className="text-sm text-secondary-600">Best for detailed inquiries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">Phone</h3>
                      <p className="text-secondary-700">+91 98981 69824</p>
                      <p className="text-sm text-secondary-600">Available Mon-Fri, 9AM-6PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">Studio Location</h3>
                      <p className="text-secondary-700">661, shiv vatika society, near juhika residency, nansad gam road, kamrej, surat, 394180 </p>
                      {/* <p className="text-sm text-secondary-600">By appointment only</p> */}
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">Business Hours</h3>
                      <p className="text-secondary-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-secondary-700">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-sm text-secondary-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                
                {/* FAQ Section */}
                <div className="mt-12">
                  <h3 className="text-xl font-serif font-semibold text-secondary-900 mb-4">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    <div className="card p-4">
                      <h4 className="font-semibold text-secondary-900 mb-2">
                        How long does a custom commission take?
                      </h4>
                      <p className="text-secondary-700 text-sm">
                        Custom commissions typically take 4-8 weeks depending on complexity and size. 
                        I'll provide a detailed timeline when we discuss your project.
                      </p>
                    </div>
                    
                    <div className="card p-4">
                      <h4 className="font-semibold text-secondary-900 mb-2">
                        Do you ship internationally?
                      </h4>
                      <p className="text-secondary-700 text-sm">
                        Yes, I ship worldwide. Shipping costs and delivery times vary by location. 
                        All artwork is carefully packaged to ensure safe delivery.
                      </p>
                    </div>
                    
                    <div className="card p-4">
                      <h4 className="font-semibold text-secondary-900 mb-2">
                        Can I see the artwork in person?
                      </h4>
                      <p className="text-secondary-700 text-sm">
                        Absolutely! Studio visits are available by appointment. 
                        This is a great way to see the artwork up close and discuss custom projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-secondary-900 mb-6">
              Ready to Start Your Art Journey?
            </h2>
            <p className="text-xl text-secondary-600 mb-8">
              Whether you're looking for the perfect piece or want to create something special together, 
              I'm here to help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/gallery" className="btn-primary inline-flex items-center">
                Browse Available Artwork
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#contact-form" className="btn-outline inline-flex items-center">
                Start a Conversation
                <MessageSquare className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
} 