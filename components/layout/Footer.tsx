import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Blurb */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Image src="/next.svg" alt="Kazi Logo" width={30} height={30} />{" "}
            {/* Replace with actual logo path */}
            <span className="text-xl font-heading font-bold">Kazi</span>
          </Link>
          <p className="text-sm">
            Kazi connects skilled East African freelancers with clients in
            Europe, delivering excellence across borders.
          </p>
        </div>

        {/* Services Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/services/video-editing" className="hover:text-gray-900">
                Video Editing
              </Link>
            </li>
            <li>
              <Link href="/services/photo-editing" className="hover:text-gray-900">
                Photo Editing
              </Link>
            </li>
            <li>
              <Link href="/services/web-design-development" className="hover:text-gray-900">
                Web Design & Development
              </Link>
            </li>
            <li>
              <Link href="/services/graphic-design" className="hover:text-gray-900">
                Graphic Design
              </Link>
            </li>
            <li>
              <Link href="/services/ai-services" className="hover:text-gray-900">
                AI Services
              </Link>
            </li>
            <li>
              <Link href="/services/academic-support" className="hover:text-gray-900">
                Academic Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-gray-900">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-900">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/work-with-us" className="hover:text-gray-900">
                Work with Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/legal/privacy-policy" className="hover:text-gray-900">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/legal/terms-of-service" className="hover:text-gray-900">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" className="hover:text-gray-900">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-8 border-t border-gray-200 pt-6">
        © {new Date().getFullYear()} Kazi. All rights reserved.
      </div>
    </footer>
  );
}
