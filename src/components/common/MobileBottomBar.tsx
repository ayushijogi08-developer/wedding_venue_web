'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { scrollToSection } from '@/lib/scroll';

export const MobileBottomBar: React.FC = () => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 400px is past hero threshold
      setIsPastHero(window.scrollY > 400);
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')
      ) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      setIsKeyboardOpen(false);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const isVisible = isPastHero && !isKeyboardOpen;

  return (
    <aside
      className={`fixed bottom-0 left-0 right-0 z-30 md:hidden bg-ivory text-green border-t border-green/15 shadow-lg pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-label="Mobile quick actions"
    >
      <div className="grid grid-cols-3 h-16 items-center divide-x divide-green/10">
        <motion.a
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.12 }}
          href={siteConfig.contact.phoneHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full gap-1 hover:bg-ivory-deep active:bg-green/10 text-green focus-visible:outline-none min-h-[48px] transition-all"
          aria-label="Call venue phone"
        >
          <Phone className="w-5 h-5 text-green-soft" />
          <span className="font-sans text-[12px] font-medium tracking-tight">Call</span>
        </motion.a>

        <motion.a
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.12 }}
          href={siteConfig.contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full gap-1 hover:bg-ivory-deep active:bg-green/10 text-green focus-visible:outline-none min-h-[48px] transition-all"
          aria-label="Open WhatsApp chat with venue"
        >
          <MessageSquare className="w-5 h-5 text-green-soft" />
          <span className="font-sans text-[12px] font-medium tracking-tight">WhatsApp</span>
        </motion.a>

        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.12 }}
          onClick={() => scrollToSection('#enquiry')}
          className="flex flex-col items-center justify-center h-full gap-1 bg-green text-ivory hover:bg-green-soft active:bg-green-soft focus-visible:outline-none min-h-[48px] transition-all"
          aria-label="Request a date"
        >
          <Calendar className="w-5 h-5 text-gold" />
          <span className="font-sans text-[12px] font-semibold tracking-tight text-ivory">Enquire</span>
        </motion.button>
      </div>
    </aside>
  );
};

