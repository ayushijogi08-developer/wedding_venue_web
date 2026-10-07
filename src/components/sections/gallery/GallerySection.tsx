'use client';
import { REVEAL_VIEWPORT } from '@/lib/motion/viewport';


import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { galleryData } from '@/data/gallery';
import { ConceptPlaceholder } from '@/components/common/ConceptPlaceholder';
import { LightboxModal } from './LightboxModal';
import { Maximize2 } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EASE_CUSTOM, MOTION_TOKENS, imageRevealVariants } from '@/lib/motion';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'spaces' | 'lawns' | 'decor'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [scrollDistance, setScrollDistance] = useState(1200);
  const [mobileIndex, setMobileIndex] = useState(1);

  const pinnedContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  const filteredItems = galleryData.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const updateScrollDistance = useCallback(() => {
    if (trackRef.current && pinnedContainerRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = pinnedContainerRef.current.clientWidth;
      // 64px padding right after last tile
      const dist = Math.max(0, trackWidth - containerWidth + 64);
      setScrollDistance(dist);
    }
  }, []);

  useEffect(() => {
    updateScrollDistance();

    const timer = setTimeout(updateScrollDistance, 500);

    const handleResize = () => {
      updateScrollDistance();
    };

    window.addEventListener('resize', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (trackRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateScrollDistance();
      });
      resizeObserver.observe(trackRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [filteredItems.length, activeCategory, updateScrollDistance]);

  const handleMobileScroll = () => {
    if (mobileCarouselRef.current) {
      const { scrollLeft, clientWidth } = mobileCarouselRef.current;
      const itemWidth = clientWidth * 0.82;
      const index = Math.min(
        filteredItems.length,
        Math.max(1, Math.round(scrollLeft / itemWidth) + 1)
      );
      setMobileIndex(index);
    }
  };

  const { scrollYProgress } = useScroll({
    target: pinnedContainerRef,
    offset: ['start start', 'end end'],
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    <section id="gallery" className="relative surface-ivory py-24 md:py-36 border-t border-green/10">
      <div className="max-w-container mx-auto px-5 md:px-10 lg:px-16 space-y-12">
        {/* Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Visual Archives"
            heading="Estate Photography & Layout Details"
            paragraph="Explore the architectural highlights, floral mandaps, and evening lawn illuminations."
            className="max-w-2xl space-y-3 text-left"
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Media' },
              { id: 'spaces', label: 'Banquet & Suites' },
              { id: 'lawns', label: 'Outdoor Lawns' },
              { id: 'decor', label: 'Decor Styling' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as any);
                  setMobileIndex(1);
                }}
                className={`px-4 h-10 rounded-pill font-sans text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === tab.id
                    ? 'bg-green text-ivory shadow-sm'
                    : 'bg-ivory-deep text-green hover:bg-green/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Pinned Horizontal Scroll Track (lg:block) */}
        <div
          ref={pinnedContainerRef}
          style={{ height: `${scrollDistance + 800}px` }}
          className="hidden lg:block relative"
        >
          <div className="sticky top-28 overflow-hidden rounded-panel py-4">
            <motion.div
              ref={trackRef}
              style={{ x: xTransform }}
              className="flex items-start gap-6 w-max pr-16"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  data-cursor="Open"
                  initial={prefersReducedMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -8% 0px', amount: 0 }}
                  variants={imageRevealVariants}
                  onClick={() => setLightboxIndex(index)}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className="relative flex flex-col group cursor-pointer overflow-hidden rounded-gallery border border-green/15 shadow-sm min-w-[380px] w-[380px] shrink-0 bg-green h-auto"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open image lightbox: ${item.title}`}
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-green">
                    <ConceptPlaceholder
                      imageKey={item.imageKey}
                      aspectRatio="4:3"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] group-active:scale-[1.04]"
                    />
                  </div>
                  <div className="relative w-full bg-green p-4 md:p-5 flex items-center justify-between text-ivory border-t border-gold/20 shrink-0">
                    <div>
                      <span className="font-sans text-[11px] uppercase font-semibold text-gold tracking-widest block">
                        {item.category}
                      </span>
                      <h4 className="font-display text-xl font-medium text-ivory">
                        {item.title}
                      </h4>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-ivory/20 text-ivory flex items-center justify-center backdrop-blur-sm shrink-0">
                      <Maximize2 className="w-4 h-4 text-ivory" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile / Tablet Snap-Scroll Carousel with Counter Badge (lg:hidden) */}
        <div className="lg:hidden space-y-4">
          {/* Mobile Counter */}
          <div className="flex justify-between items-center px-1">
            <span className="font-sans text-xs uppercase font-semibold text-gold-text tracking-widest">
              Swipe Gallery
            </span>
            <span className="font-sans text-xs font-semibold text-green bg-ivory-deep px-3 py-1 rounded-pill border border-green/10 tabular-nums">
              {mobileIndex} / {filteredItems.length}
            </span>
          </div>

          {/* Snap-scroll container */}
          <div
            ref={mobileCarouselRef}
            onScroll={handleMobileScroll}
            className="flex items-start overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-5 px-5 scrollbar-none"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={prefersReducedMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -8% 0px', amount: 0 }}
                variants={imageRevealVariants}
                onClick={() => setLightboxIndex(index)}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.12 }}
                className="snap-start min-w-[82vw] sm:min-w-[320px] max-w-[85vw] relative flex flex-col group cursor-pointer overflow-hidden rounded-gallery border border-green/15 shadow-sm shrink-0 bg-green h-auto"
                role="button"
                tabIndex={0}
                aria-label={`Open image lightbox: ${item.title}`}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-green">
                  <ConceptPlaceholder
                    imageKey={item.imageKey}
                    aspectRatio="4:3"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] group-active:scale-[1.04]"
                  />
                </div>
                <div className="relative w-full bg-green p-4 flex items-center justify-between text-ivory border-t border-gold/20 shrink-0">
                  <div>
                    <span className="font-sans text-[10px] uppercase font-semibold text-gold tracking-widest block">
                      {item.category}
                    </span>
                    <h4 className="font-display text-lg font-medium text-ivory">
                      {item.title}
                    </h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-ivory/20 text-ivory flex items-center justify-center backdrop-blur-sm shrink-0">
                    <Maximize2 className="w-4 h-4 text-ivory" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal Trigger */}
      {lightboxIndex !== null && (
        <LightboxModal
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </section>
  );
};

