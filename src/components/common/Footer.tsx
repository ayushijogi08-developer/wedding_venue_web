'use client';

import React from 'react';
import { siteConfig } from '@/data/site';
import { scrollToSection } from '@/lib/scroll';


export const Footer: React.FC = () => {
  return (
    <footer className="surface-green pt-20 pb-28 md:pb-20 border-t border-gold/30">
      <div className="max-w-container mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-ivory/10">
          {/* Brand Info Column */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-display text-2xl md:text-3xl text-ivory font-medium block">
              {siteConfig.venueName}
            </span>
            <p className="font-sans text-sm text-ivory/80 max-w-sm leading-relaxed">
              {siteConfig.slogan} A design portfolio concept demonstrating accessible web craftsmanship for wedding and event venues.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold block">
              Navigation
            </span>
            <ul className="text-sm text-ivory/80 font-sans flex flex-col items-start gap-1">
              <li>
                <a
                  href="#spaces"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#spaces');
                  }}
                  className="inline-flex items-center min-h-[44px] min-w-[44px] hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green rounded-sm"
                >
                  Our Venue Spaces
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#events');
                  }}
                  className="inline-flex items-center min-h-[44px] min-w-[44px] hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green rounded-sm"
                >
                  Events Hosted
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#gallery');
                  }}
                  className="inline-flex items-center min-h-[44px] min-w-[44px] hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green rounded-sm"
                >
                  Photo Gallery
                </a>
              </li>
              <li>
                <a
                  href="#included"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#included');
                  }}
                  className="inline-flex items-center min-h-[44px] min-w-[44px] hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green rounded-sm"
                >
                  Services &amp; Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#faq');
                  }}
                  className="inline-flex items-center min-h-[44px] min-w-[44px] hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green rounded-sm"
                >
                  Questions &amp; Policies
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column with Placeholder Note */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold block">
              Estate Contact Details
            </span>
            <address className="not-italic font-sans text-sm text-ivory/80 space-y-2">
              <p>{siteConfig.address.fullAddress}</p>
              <p>Phone: {siteConfig.contact.phoneDisplay}</p>
              <p>Email: {siteConfig.contact.email}</p>
              <p className="text-xs text-gold/80 pt-2">{siteConfig.contact.timingHours}</p>
            </address>
            <p className="font-sans text-[11px] text-ivory/60 italic pt-1">
              * Example contact numbers and placeholder address for demonstration concept.
            </p>
          </div>
        </div>

        {/* Mandatory Honesty Rule Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/70 font-sans">
          <p className="text-center md:text-left">
            Concept design by <strong className="text-gold font-medium">{siteConfig.studioName}</strong>. Not a real venue.
          </p>
          <p>© {new Date().getFullYear()} {siteConfig.venueName}. Fictional concept site for demonstration purposes.</p>
        </div>
      </div>
    </footer>
  );
};
