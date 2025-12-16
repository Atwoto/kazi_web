"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchModal from "@/components/common/SearchModal";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const servicesList = [
  { title: "Video Editing", href: "/services/video-editing", description: "Professional cuts for social & business." },
  { title: "Photo Editing", href: "/services/photo-editing", description: "High-end retouching & manipulation." },
  { title: "Web Design & Dev", href: "/services/web-design-development", description: "Custom, responsive websites." },
  { title: "Graphic Design", href: "/services/graphic-design", description: "Logos, branding & marketing assets." },
  { title: "AI Services", href: "/services/ai-services", description: "Automation & data solutions." },
  { title: "Academic Support", href: "/services/academic-support", description: "Editing, proofreading & coaching." },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-border/40",
        scrolled ? "shadow-sm py-3" : "py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 mr-8">
          <div className="bg-blue-600 rounded-full p-1.5">
             <Image src="/globe.svg" alt="Kazi Logo" width={20} height={20} className="invert" />
          </div>
          <span className="text-2xl font-heading font-bold text-foreground tracking-tight">Kazi</span>
        </Link>

        {/* Desktop Navigation Links - Centered */}
        <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground text-muted-foreground")}>
            Home
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground text-muted-foreground">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover text-popover-foreground">
                    {servicesList.map((service) => (
                      <li key={service.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={service.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none text-foreground">{service.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="col-span-2 border-t border-border pt-3 mt-1">
                        <NavigationMenuLink asChild>
                            <Link href="/services" className="flex items-center justify-center text-sm font-medium text-blue-500 hover:underline">
                                View All Services →
                            </Link>
                        </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/portfolio" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground text-muted-foreground")}>
            Portfolio
          </Link>
          <Link href="/pricing" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground text-muted-foreground")}>
            Pricing
          </Link>
          <Link href="/faq" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground text-muted-foreground")}>
            FAQ
          </Link>
          <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground text-muted-foreground")}>
            Contact
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 ml-auto">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <Button asChild className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/20">
            <Link href="/contact">Get Started</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-muted-foreground hover:text-foreground" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-0 bg-background z-40 flex flex-col p-6 pt-28 space-y-6 lg:hidden overflow-y-auto h-screen animate-in slide-in-from-top-10 duration-200">
          <button
            onClick={() => {
              setIsSearchOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 text-xl font-semibold text-foreground border-b border-border pb-2 hover:text-primary transition-colors"
          >
            <Search className="h-5 w-5" />
            Search
          </button>
          <Link href="/" className="text-xl font-semibold text-foreground border-b border-border pb-2" onClick={toggleMobileMenu}>
            Home
          </Link>
          <div className="space-y-3 border-b border-border pb-4">
            <p className="text-xl font-semibold text-foreground mb-2">Services</p>
            {servicesList.map(service => (
                <Link key={service.title} href={service.href} className="block pl-4 text-muted-foreground hover:text-primary transition-colors" onClick={toggleMobileMenu}>
                    {service.title}
                </Link>
            ))}
          </div>
          <Link href="/portfolio" className="text-xl font-semibold text-foreground border-b border-border pb-2" onClick={toggleMobileMenu}>
            Portfolio
          </Link>
          <Link href="/pricing" className="text-xl font-semibold text-foreground border-b border-border pb-2" onClick={toggleMobileMenu}>
            Pricing
          </Link>
          <Link href="/faq" className="text-xl font-semibold text-foreground border-b border-border pb-2" onClick={toggleMobileMenu}>
            FAQ
          </Link>
          <Link href="/contact" className="text-xl font-semibold text-foreground border-b border-border pb-2" onClick={toggleMobileMenu}>
            Contact
          </Link>
          <Button asChild className="w-full rounded-full py-6 text-lg mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/contact" onClick={toggleMobileMenu}>Get Started</Link>
          </Button>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}