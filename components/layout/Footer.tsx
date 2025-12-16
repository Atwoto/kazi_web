import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Blurb */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2 mb-6">
             <Image 
               src="/logo1.jpg" 
               alt="Kazi - Work Handled" 
               width={180} 
               height={60} 
               className="object-contain"
             />
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed">
            Kazi connects skilled East African experts with clients in
            Europe, delivering excellence across borders.
          </p>
        </div>

        {/* Services Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services/video-editing" className="hover:text-primary transition-colors">Video Editing</Link></li>
            <li><Link href="/services/photo-editing" className="hover:text-primary transition-colors">Photo Editing</Link></li>
            <li><Link href="/services/web-design-development" className="hover:text-primary transition-colors">Web Design & Development</Link></li>
            <li><Link href="/services/graphic-design" className="hover:text-primary transition-colors">Graphic Design</Link></li>
            <li><Link href="/services/ai-services" className="hover:text-primary transition-colors">AI Services</Link></li>
            <li><Link href="/services/academic-support" className="hover:text-primary transition-colors">Academic Support</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link href="/work-with-us" className="hover:text-primary transition-colors">Work with Us</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/legal/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/legal/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/legal/cookies" className="hover:text-primary transition-colors">Cookies</Link></li>
          </ul>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-200 relative z-50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Kazi. All rights reserved.
          </div>

          <div className="flex space-x-6 items-center">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            
            {/* X (Twitter) Icon */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>

            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>

            {/* TikTok Icon */}
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}