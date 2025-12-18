"use client";

import Link from "next/link";
import { Linkedin, Instagram, Facebook, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-heading font-bold text-white">
                Kazi<span className="text-blue-400">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              {t.footer.blurb}
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#0077b5] flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-black flex items-center justify-center transition-colors duration-300"
                aria-label="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#1877F2] flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-black flex items-center justify-center transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">{t.footer.servicesTitle}</h3>
            <ul className="space-y-3">
              <li><Link href="/services/video-editing" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.serviceNames.videoEditing}</Link></li>
              <li><Link href="/services/photo-editing" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.serviceNames.photoEditing}</Link></li>
              <li><Link href="/services/web-design-development" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.serviceNames.webDev}</Link></li>
              <li><Link href="/services/graphic-design" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.serviceNames.graphicDesign}</Link></li>
              <li><Link href="/services/ai-services" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.serviceNames.aiServices}</Link></li>
              <li><Link href="/services/academic-support" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.serviceNames.academicSupport}</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">{t.footer.companyTitle}</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.aboutUs}</Link></li>
              <li><Link href="/portfolio" className="text-slate-400 hover:text-white text-sm transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">{t.nav.contact}</Link></li>
              <li><Link href="/work-with-us" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.workWithUs}</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">{t.footer.legalTitle}</h3>
            <ul className="space-y-3">
              <li><Link href="/legal/privacy-policy" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.privacyPolicy}</Link></li>
              <li><Link href="/legal/terms-of-service" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.termsOfService}</Link></li>
              <li><Link href="/legal/cookies" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.cookies}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Kazi. {t.footer.rights}
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="mailto:hello@kaziagency.es" className="hover:text-white transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@kaziagency.es
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
