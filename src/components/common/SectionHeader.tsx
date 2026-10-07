'use client';
import { REVEAL_VIEWPORT } from '@/lib/motion/viewport';


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  eyebrowVariants,
  headingMaskVariants,
  paragraphVariants,
  sectionHeaderContainerVariants,
} from '@/lib/motion';

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  paragraph?: string;
  className?: string;
  eyebrowColorClass?: string;
  headingColorClass?: string;
  paragraphColorClass?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  heading,
  paragraph,
  className = 'max-w-3xl space-y-3 text-left',
  eyebrowColorClass = 'text-gold-text',
  headingColorClass = 'text-green',
  paragraphColorClass = 'text-green-soft',
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => {
      media.removeEventListener('change', listener);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (reducedMotion) {
    return (
      <div className={className}>
        <div className={`flex items-center gap-3 ${eyebrowColorClass}`}>
          <div className="h-px bg-gold w-8" />
          <span className="font-sans text-xs font-semibold uppercase tracking-widest block">
            {eyebrow}
          </span>
        </div>
        <h2 className={`font-display text-section-h2 font-medium ${headingColorClass}`}>
          {heading}
        </h2>
        {paragraph && (
          <p className={`font-sans text-lead ${paragraphColorClass}`}>
            {paragraph}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      variants={sectionHeaderContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      className={className}
    >
      <div className={`flex items-center gap-3 ${eyebrowColorClass}`}>
        <motion.div
          initial={{ scaleX: 0 }}
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
          }}
          className="h-px bg-gold origin-left w-8"
        />
        <motion.span
          variants={eyebrowVariants}
          className="font-sans text-xs font-semibold uppercase tracking-widest block"
        >
          {eyebrow}
        </motion.span>
      </div>

      <div className="overflow-hidden">
        <motion.h2
          variants={headingMaskVariants}
          className={`font-display text-section-h2 font-medium ${headingColorClass}`}
        >
          {heading}
        </motion.h2>
      </div>

      {paragraph && (
        <motion.p
          variants={paragraphVariants}
          className={`font-sans text-lead ${paragraphColorClass}`}
        >
          {paragraph}
        </motion.p>
      )}
    </motion.div>
  );
};
