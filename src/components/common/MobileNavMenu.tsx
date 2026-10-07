'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Phone, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { scrollToSection } from '@/lib/scroll';

interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ label: string; href: string }>;
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ isOpen, onClose, navLinks }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    onClose();
    scrollToSection(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-green text-ivory flex flex-col justify-between p-6 md:p-10 lg:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-gold/30 pb-4">
            <span className="font-display italic text-lg text-gold">
              {siteConfig.venueName}
            </span>
            <button
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gold/40 text-ivory hover:bg-gold/20 focus-visible:outline-none min-w-[48px] min-h-[48px]"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="my-auto py-8 flex flex-col gap-6" aria-label="Mobile Menu Links">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 + 0.1, duration: 0.4 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-display text-4xl text-ivory hover:text-gold transition-colors block py-2 border-b border-ivory/10 font-medium"
                >
                  {link.label}
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex flex-col gap-4 border-t border-gold/30 pt-6">
            <button
              onClick={() => handleNavClick('#enquiry')}
              className="w-full h-14 rounded-pill bg-gold text-green font-sans font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gold/90 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Request a Date
            </button>
            <div className="grid grid-cols-2 gap-3 text-center">
              <a
                href={siteConfig.contact.phoneHref}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 rounded-pill border border-ivory/30 flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-ivory hover:bg-ivory/10"
              >
                <Phone className="w-4 h-4 text-gold" />
                Call Venue
              </a>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 rounded-pill border border-ivory/30 flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-ivory hover:bg-ivory/10"
              >
                <MessageSquare className="w-4 h-4 text-gold" />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
