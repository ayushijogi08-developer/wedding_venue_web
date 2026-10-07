'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ConceptPlaceholder } from '@/components/common/ConceptPlaceholder';
import { scrollToSection } from '@/lib/scroll';
import {
  EASE_CUSTOM,
  MOTION_TOKENS,
  heroContainerVariants,
  heroItemFadeVariants,
  headingMaskVariants,
} from '@/lib/motion';

export const HeroSection: React.FC = () => {
  const slides = ['hero_main', 'grand_lawn', 'banquet_hall'];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useReducedMotion();

  // Scroll parallax for hero background (8% desktop, 4% mobile)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    setIsMounted(true);

    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
      if (navigator.hardwareConcurrency <= 4) {
        setIsLowEnd(true);
      }
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (prefersReducedMotion) return () => window.removeEventListener('resize', checkMobile);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [slides.length, prefersReducedMotion]);

  // Parallax drift translation
  const parallaxOffset = isMobile ? '-4%' : '-8%';
  const rawParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', parallaxOffset]);
  const parallaxY = prefersReducedMotion || isLowEnd ? '0%' : rawParallaxY;

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-green surface-green pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden min-h-[620px]"
    >
      {/* Background Visual Slideshow with Slow Zoom & Parallax Drift */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 z-0 pointer-events-none bg-green">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide]}
            initial={isMounted && !prefersReducedMotion && currentSlide > 0 ? { opacity: 0, scale: 1.0 } : false}
            animate={{ opacity: 1, scale: prefersReducedMotion ? 1.0 : 1.08 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 7, ease: 'linear' },
            }}
            className="w-full h-full bg-green"
          >
            <ConceptPlaceholder
              imageKey={slides[currentSlide]}
              aspectRatio="16:9"
              className="w-full h-full object-cover"
              hideCaption={true}
              priority={currentSlide === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        {/* Flat green overlay at 35% general over image, up to 55% behind text block */}
        <div className="absolute inset-0 bg-green/35 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-green/55 via-green/20 to-transparent pointer-events-none z-[1]" />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-container mx-auto px-5 md:px-10 lg:px-16 text-center">
        <motion.div
          variants={heroContainerVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
          className="space-y-8"
        >
          {/* Eyebrow Badge */}
          <motion.div custom={isMobile} variants={heroItemFadeVariants} className="inline-block">
            <div className="px-4 py-1.5 rounded-pill border border-gold/40 bg-green/80 backdrop-blur-sm">
              <span className="font-sans text-xs uppercase font-semibold tracking-widest text-gold">
                Heritage Lawns &amp; Banquets
              </span>
            </div>
          </motion.div>

          {/* Headline Lines (Masked Reveal) */}
          <div className="max-w-4xl mx-auto space-y-2">
            <div className="overflow-hidden">
              <motion.h1
                variants={headingMaskVariants}
                className="font-display text-hero-h1 font-medium text-ivory tracking-tight"
              >
                Your Wedding Day,
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={headingMaskVariants}
                className="font-display text-hero-h1 font-medium text-gold italic"
              >
                Beautifully Hosted.
              </motion.h1>
            </div>
          </div>

          {/* Subline Paragraph */}
          <motion.p
            variants={heroItemFadeVariants}
            className="font-sans text-lead text-ivory/90 max-w-prose-custom mx-auto leading-relaxed"
          >
            A quiet garden estate for wedding ceremonies and banquets, framed by stone arches, manicured lawns, and climate-controlled halls.
          </motion.p>

          {/* Action Button Fade-Up */}
          <motion.div variants={heroItemFadeVariants} className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="dark-primary"
              size="lg"
              isMagnetic={true}
              onClick={() => scrollToSection('#spaces')}
            >
              Explore Spaces
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Scroll Cue Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-sans text-[10px] uppercase font-semibold tracking-widest text-ivory/60">
          Scroll
        </span>
        <motion.div
          animate={prefersReducedMotion ? {} : { opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: EASE_CUSTOM,
          }}
          className="w-[1.5px] h-6 bg-gold/70 rounded-full"
        />
      </div>
    </section>
  );
};

