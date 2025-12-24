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
                Kazi Agency<span className="text-blue-400">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              {t.footer.blurb}
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/kazi.agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="https://facebook.com" // Placeholder, user will provide later
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#1877F2] flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>

              <a
                href={`https://wa.me/${t.contact.phoneNumber.replace(/\s/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-green-500 flex items-center justify-center transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.5 3.42 1.46 4.9L2.05 22l5.03-1.32c1.4-.77 2.97-1.18 4.56-1.18 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.82 14.54c-.28.27-.68.42-1.09.42-.41 0-.8-.15-1.09-.42l-.66-.66c-.14-.14-.3-.2-.47-.2s-.33.06-.47.2l-.66.66c-.46.46-1.17.46-1.63 0-.46-.46-.46-1.17 0-1.63l.66-.66c.14-.14.2-.3.2-.47s-.06-.33-.2-.47l-.66-.66c-.27-.28-.42-.68-.42-1.09 0-.41.15-.8.42-1.09l.66-.66c.14-.14.2-.3.2-.47s-.06-.33-.2-.47l-.66-.66c-.46-.46-.46-1.17 0-1.63.46-.46 1.17-.46 1.63 0l.66.66c.14.14.3.2.47.2s.33-.06.47-.2l.66-.66c.28-.27.68-.42 1.09-.42.41 0,.8.15 1.09.42l.66.66c.14.14.3.2.47.2s.33-.06.47-.2l.66-.66c.46-.46 1.17-.46 1.63 0 .46.46.46 1.17 0 1.63l-.66.66c-.14.14-.2.3-.2.47s.06.33.2.47l.66.66c.27.28.42.68.42 1.09 0 .41-.15.8-.42 1.09l-.66.66c-.14.14-.3.2-.47.2s-.33-.06-.47-.2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">{t.footer.servicesTitle}</h3>
            <ul className="space-y-3">
              {t.nav.servicesList.map((service, index) => (
                <li key={index}>
                  <Link href={service.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">{t.footer.companyTitle}</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.aboutUs}</Link></li>
              <li><Link href="/portfolio" className="text-slate-400 hover:text-white text-sm transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">{t.nav.contact}</Link></li>
              <li><Link href="/work-with-us" className="text-slate-400 hover:text-white text-sm transition-colors">{t.footer.joinUs}</Link></li>
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
              © {new Date().getFullYear()} Kazi Agency. {t.footer.rights}
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
