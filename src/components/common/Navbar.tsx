'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Calendar } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { MobileNavMenu } from './MobileNavMenu';
import { scrollToSection } from '@/lib/scroll';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroThreshold = 400; // Past hero threshold

      if (currentScrollY > heroThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: 'Spaces', href: '#spaces' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'What\'s Included', href: '#included' },
    { label: 'Contact', href: '#enquiry' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled
            ? 'bg-ivory text-green border-b border-green/15 shadow-sm h-16 md:h-20'
            : 'bg-transparent text-ivory border-b border-gold/20 h-16 md:h-20'
        }`}
      >
        <div className="max-w-container mx-auto px-5 md:px-10 lg:px-16 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none"
            aria-label="Heritage Lawns & Banquets Homepage"
          >
            <svg
              className={`w-6 h-8 transition-colors ${
                isScrolled ? 'text-green' : 'text-gold'
              }`}
              viewBox="0 0 24 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 30V12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V30"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M7 30V14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14V30"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            </svg>
            <span
              className={`font-display font-medium text-lg md:text-xl tracking-tight ${
                isScrolled ? 'text-green' : 'text-ivory'
              }`}
            >
              {siteConfig.venueName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`font-sans text-sm font-medium transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${
                  isScrolled ? 'text-green hover:text-gold-text' : 'text-ivory hover:text-gold'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('#enquiry')}
              className={`hidden md:inline-flex items-center gap-2 px-6 h-11 rounded-pill font-sans text-xs font-semibold uppercase tracking-widest transition-all ${
                isScrolled
                  ? 'bg-green text-ivory hover:bg-green-soft shadow-sm'
                  : 'bg-ivory text-green hover:bg-ivory-deep hover:ring-1 hover:ring-gold shadow-sm'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Request a Date
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline-none"
              aria-label="Open Mobile Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-green' : 'text-ivory'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileNavMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};
