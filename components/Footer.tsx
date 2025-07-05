import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold text-sm">A</span>
              </div>
              <span className="font-serif text-xl font-semibold">
                Artist Gallery
              </span>
            </Link>
            <p className="text-secondary-300 mb-4 max-w-md">
              Discover stunning paint sketch artwork by a professional artist. 
              Each piece tells a unique story through color, texture, and emotion.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/nitin5art/"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
                target="_blank" rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm8.25 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z"/>
                </svg>
              </a>
              <a
                href="https://www.etsy.com/in-en/shop/Nitin5artShop"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
                aria-label="Etsy"
                target="_blank" rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.8 2H2.2C1.54 2 1 2.54 1 3.2v17.6C1 21.46 1.54 22 2.2 22h19.6c.66 0 1.2-.54 1.2-1.2V3.2C23 2.54 22.46 2 21.8 2zM20.5 19.5h-17v-15h17v15zm-2.5-2.5h-7.5v-1.5h6.5v-1.5h-6.5v-1.5h7.5v-1.5h-9v7h9v-1.5zm-7.5-7.5h7.5v-1.5h-7.5v1.5z"/>
                </svg>
              </a>
              <a
                href="https://x.com/nitin5art"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-secondary-300">
              <li>Email: support@nitin5art.com</li>
              <li>Phone: +91 98981 69824</li>
              <li>Address: 661, shiv vatika society, near juhika residency, nansad gam road, kamrej, surat, 394180 </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 text-sm">
            © {currentYear} Artist Gallery. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-secondary-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-secondary-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 