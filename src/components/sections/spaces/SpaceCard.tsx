'use client';
import { REVEAL_VIEWPORT } from '@/lib/motion/viewport';


import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Wind, Car, Sparkles, Image as ImageIcon } from 'lucide-react';
import { VenueSpace } from '@/data/types';
import { Pill } from '@/components/ui/Pill';
import { ConceptPlaceholder } from '@/components/common/ConceptPlaceholder';
import { CountUp } from '@/components/common/CountUp';
import { archRevealVariants, EASE_CUSTOM, MOTION_TOKENS } from '@/lib/motion';

interface SpaceCardProps {
  space: VenueSpace;
  isReversed?: boolean;
  priority?: boolean;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space, isReversed = false, priority = false }) => {
  const [activeTab, setActiveTab] = useState<'main' | 'gallery'>('main');
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSmall, setIsMobileSmall] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [isMotionDone, setIsMotionDone] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
      if (navigator.hardwareConcurrency <= 4) {
        setIsLowEnd(true);
      }
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsMobileSmall(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const motionTimer = setTimeout(() => {
      setIsMotionDone(true);
    }, 1200);

    return () => {
      clearTimeout(motionTimer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Parallax strictly capped: max 6% range on desktop (+3% to -3%), 3% range on mobile (+1.5% to -1.5%)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const desktopParallaxY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);
  const mobileParallaxY = useTransform(scrollYProgress, [0, 1], ['1.5%', '-1.5%']);

  const imageParallaxY = prefersReducedMotion || isLowEnd
    ? '0%'
    : isMobile
    ? mobileParallaxY
    : desktopParallaxY;

  // Text animation: staggered 120ms after image reveal
  const textInitialState = prefersReducedMotion
    ? { opacity: 1, x: 0, y: 0 }
    : isMobile
    ? { opacity: 0, y: isMobileSmall ? 32 : 20, x: 0 }
    : { opacity: 0, x: isReversed ? -24 : 24, y: 0 };

  const textAnimateState = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.medium,
      delay: 0.12,
      ease: EASE_CUSTOM,
      staggerChildren: 0.08,
    },
  };

  const secondaryImageMap: Record<string, string> = {
    'space-grand-lawn': 'gallery_lawn',
    'space-archway-hall': 'gallery_banquet',
    'space-courtyard-pavilion': 'gallery_arch',
    'space-bridal-suite': 'gallery_diya',
  };

  const secondaryKey = secondaryImageMap[space.id] || space.imageKey;

  return (
    <div
      ref={cardRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-12 md:py-20 border-b border-green/10 last:border-b-0"
    >
      {/* Arch Image Column */}
      <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="relative w-full max-w-md lg:max-w-none mx-auto">
          {/* Fixed Decorative Gold Double-Line Frame (12px offset behind wrapper, does NOT move with parallax) */}
          <div
            className="absolute -inset-[12px] rounded-t-[9999px] border border-gold/40 pointer-events-none z-0"
            aria-hidden="true"
          >
            <div className="absolute inset-[3px] rounded-t-[9999px] border border-gold/30" />
          </div>

          {/* Arch Wrapper: relative, aspect 4/5, overflow hidden, top fully rounded, flat bottom */}
          <motion.div
            custom={isMobile}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={archRevealVariants}
            onAnimationComplete={() => setIsMotionDone(true)}
            style={{
              opacity: isMotionDone || prefersReducedMotion ? 1 : undefined,
              transform: isMotionDone || prefersReducedMotion ? 'none' : undefined,
            }}
            className="relative group overflow-hidden rounded-t-[9999px] rounded-b-0 shadow-soft border border-green/15 w-full aspect-[4/5] bg-green z-10"
          >
            {/* Inner Oversized Image: height 112%, top -6% (inset: -6% 0) for safe parallax shift */}
            <motion.div
              style={{ y: imageParallaxY }}
              className="absolute -top-[6%] bottom-[-6%] left-0 right-0 w-full h-[112%]"
            >
              {activeTab === 'main' ? (
                <ConceptPlaceholder
                  imageKey={space.imageKey}
                  aspectRatio="4:5"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={priority}
                />
              ) : (
                <ConceptPlaceholder
                  imageKey={secondaryKey}
                  aspectRatio="4:5"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={priority}
                />
              )}
            </motion.div>

            {/* Mini Gallery Switcher Pills */}
            <div className="absolute bottom-4 left-4 z-20 flex gap-2">
              <button
                onClick={() => setActiveTab('main')}
                className={`px-3 py-1.5 rounded-pill text-xs font-sans font-semibold uppercase tracking-widest transition-all ${
                  activeTab === 'main'
                    ? 'bg-green text-ivory shadow-sm'
                    : 'bg-ivory/80 text-green backdrop-blur-sm hover:bg-ivory'
                }`}
              >
                Main View
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-3 py-1.5 rounded-pill text-xs font-sans font-semibold uppercase tracking-widest transition-all flex items-center gap-1 ${
                  activeTab === 'gallery'
                    ? 'bg-green text-ivory shadow-sm'
                    : 'bg-ivory/80 text-green backdrop-blur-sm hover:bg-ivory'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Layout Details
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Column */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{ hidden: textInitialState as any, visible: textAnimateState }}
        viewport={REVEAL_VIEWPORT}
        className={`lg:col-span-6 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="space-y-2">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-text">
            Venue Space
          </span>
          <h3 className="font-display text-3xl md:text-4xl text-green font-medium">
            {space.name}
          </h3>
          <p className="font-display italic text-lg text-green-soft">
            &quot;{space.tagline}&quot;
          </p>
        </motion.div>
        <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-body text-green-soft leading-relaxed">
          {space.description}
        </motion.p>

        {/* Feature Pills */}
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } } }} className="flex flex-wrap gap-2 pt-2">
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}><Pill icon={<Wind />}>
            {space.isAirConditioned ? 'Air Conditioned' : 'Open Air Lawn'}
          </Pill></motion.div>
          {space.hasParking && (
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
              <Pill icon={<Car />}>Parking Included</Pill>
            </motion.div>
          )}
          {space.hasBridalRoom && (
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
              <Pill icon={<Sparkles />}>Bridal Suite Access</Pill>
            </motion.div>
          )}
        </motion.div>

        {/* Capacities Grid with CountUp */}
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-2 gap-4 p-5 rounded-panel bg-ivory-deep/60 border border-green/10">
          <div>
            <span className="block font-sans text-xs font-semibold uppercase tracking-wider text-green-soft/70">
              Seated Capacity
            </span>
            <span className="font-display text-3xl font-medium text-green tabular-nums">
              <CountUp end={space.capacitySeated} />
            </span>
            <span className="block font-sans text-[11px] text-green-soft/70">Guests Seated</span>
          </div>

          <div>
            <span className="block font-sans text-xs font-semibold uppercase tracking-wider text-green-soft/70">
              Floating Capacity
            </span>
            <span className="font-display text-3xl font-medium text-green tabular-nums">
              <CountUp end={space.capacityFloating} />
            </span>
            <span className="block font-sans text-[11px] text-green-soft/70">Floating Guests</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

