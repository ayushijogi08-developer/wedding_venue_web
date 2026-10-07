'use client';
import { REVEAL_VIEWPORT } from '@/lib/motion/viewport';


import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { EventType } from '@/data/types';
import { ConceptPlaceholder } from '@/components/common/ConceptPlaceholder';
import { scrollToSection } from '@/lib/scroll';
import { EASE_CUSTOM, MOTION_TOKENS, imageRevealVariants } from '@/lib/motion';

interface EventListItemProps {
  event: EventType;
  index?: number;
  onSelectEventType: (eventType: string) => void;
}

export const EventListItem: React.FC<EventListItemProps> = ({ event, index = 0, onSelectEventType }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const prefersReducedMotion = useReducedMotion();
  const [isMotionDone, setIsMotionDone] = useState(false);

  useEffect(() => {
    const motionTimer = setTimeout(() => {
      setIsMotionDone(true);
    }, 1200 + index * 100);
    return () => clearTimeout(motionTimer);
  }, [index]);

  const handleEnquireClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    const rawType = event.id.replace('event-', '');
    const eventTypeKey = rawType.endsWith('s') && rawType !== 'sangeet' ? rawType.slice(0, -1) : rawType;
    onSelectEventType(eventTypeKey);
    scrollToSection('#enquiry');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const focusDelay = reducedMotion ? 50 : 700;
    setTimeout(() => {
      const form = document.querySelector('form[aria-label="Date enquiry form"]');
      if (form) {
        const fields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
          'input:not([type="hidden"]):not([tabindex="-1"]), select, textarea'
        );
        let focused = false;
        for (const field of Array.from(fields)) {
          if (!field.value || field.value.trim() === '') {
            field.focus();
            focused = true;
            break;
          }
        }
        if (!focused && fields[0]) {
          fields[0].focus();
        }
      }
    }, focusDelay);
  };

  return (
    <motion.div
      tabIndex={0}
      role="region"
      aria-label={`Event details for ${event.title}`}
      initial={prefersReducedMotion ? false : { opacity: 0, x: isMobile ? (index % 2 === 0 ? -20 : 20) : 0, y: isMobile ? 32 : 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{
        duration: MOTION_TOKENS.duration.medium,
        delay: index * MOTION_TOKENS.stagger,
        ease: EASE_CUSTOM,
      }}
      className="relative py-6 md:py-8 min-h-[170px] cursor-pointer group focus-visible:outline-none flex flex-col justify-center"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
        {/* Left Block: Thumbnail + Title & One-Liner */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 flex-grow">
          {/* Desktop & Tablet Thumbnail: 120x150 (3:4), Arch-topped, Always visible */}
          <motion.div
            viewport={REVEAL_VIEWPORT}
            onAnimationComplete={() => setIsMotionDone(true)}
            style={{
              opacity: isMotionDone || prefersReducedMotion ? 1 : undefined,
              transform: isMotionDone || prefersReducedMotion ? 'none' : undefined,
            }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.1, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            className="sm:hidden w-full aspect-[16/9] rounded-[12px] overflow-hidden shrink-0 border border-gold/30 relative"
          >
            <div className="absolute inset-0 w-full h-full">
              <ConceptPlaceholder
                imageKey={event.imageKey}
                aspectRatio="16:9"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105 group-active:scale-105"
                sizes="100vw"
              />
            </div>
          </motion.div>

          {/* Title & One-Liner */}
          <div className="space-y-2">
            <h3 className="font-display text-2xl md:text-4xl text-ivory group-hover:text-gold group-focus-visible:text-gold group-active:text-gold active:text-gold transition-colors duration-300 font-medium">
              {event.title}
            </h3>
            <p className="font-sans text-sm md:text-lead text-ivory/80 max-w-xl leading-relaxed">
              {event.oneLiner}
            </p>
          </div>
        </div>

        {/* Right Block: Enquire Button with Arrow Nudge */}
        <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
          <motion.button
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.12 }}
            type="button"
            onClick={handleEnquireClick}
            aria-label={`Enquire about ${event.title}`}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-6 h-12 min-h-[44px] rounded-pill bg-green-soft/40 border border-ivory/80 text-ivory hover:bg-ivory hover:text-green hover:border-ivory transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-green"
          >
            <span className="font-sans text-xs uppercase font-semibold tracking-widest text-inherit">
              Enquire
            </span>
            <div className="w-7 h-7 rounded-full bg-ivory/20 flex items-center justify-center text-inherit transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 group-active:translate-x-1 active:translate-x-1 shrink-0">
              <ChevronRight className="w-4 h-4 text-inherit" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Left to Right Draw Line (ScaleX) */}
      <motion.div
        initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={REVEAL_VIEWPORT}
        transition={{
          duration: MOTION_TOKENS.duration.medium,
          delay: index * MOTION_TOKENS.stagger,
          ease: EASE_CUSTOM,
        }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-ivory/15 origin-left"
      />
    </motion.div>
  );
};

