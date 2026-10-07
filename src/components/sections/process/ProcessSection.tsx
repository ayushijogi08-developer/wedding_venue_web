'use client';
import { REVEAL_VIEWPORT } from '@/lib/motion/viewport';


import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { processStepsData } from '@/data/process';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EASE_CUSTOM, MOTION_TOKENS } from '@/lib/motion';

const ProcessStepItem: React.FC<{
  step: (typeof processStepsData)[0];
  idx: number;
  scrollYProgress: any;
  prefersReducedMotion: boolean | null;
}> = ({ step, idx, scrollYProgress, prefersReducedMotion }) => {
  // Thresholds for step green fill
  const threshold = 0.15 + idx * 0.2;
  const isGreen = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold],
    ['#B38B3F', '#1E3D2F']
  );

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{
        duration: MOTION_TOKENS.duration.medium,
        delay: idx * 0.1,
        ease: EASE_CUSTOM,
      }}
      className="space-y-4 text-left border-l lg:border-l-0 lg:border-t-0 border-green/15 pl-6 lg:pl-0 pt-2 lg:pt-0 relative"
    >
      <motion.span
        style={{ color: prefersReducedMotion ? '#1E3D2F' : isGreen }}
        className="font-display font-medium text-3xl block transition-colors duration-300"
      >
        0{step.stepNumber}
      </motion.span>
      <h3 className="font-display text-2xl font-medium text-green">
        {step.title}
      </h3>
      <p className="font-sans text-xs uppercase font-semibold text-gold-text tracking-wider">
        {step.tagline}
      </p>
      <p className="font-sans text-sm text-green-soft leading-relaxed pt-1">
        {step.description}
      </p>
    </motion.div>
  );
};

export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rawScaleX = useTransform(scrollYProgress, [0.15, 0.8], [0, 1]);
  const rawScaleY = useTransform(scrollYProgress, [0.15, 0.8], [0, 1]);

  const scaleX = prefersReducedMotion ? 1 : rawScaleX;
  const scaleY = prefersReducedMotion ? 1 : rawScaleY;

  return (
    <section id="process" ref={containerRef} className="surface-ivory py-24 md:py-36 border-t border-green/10">
      <div className="max-w-container mx-auto px-5 md:px-10 lg:px-16 space-y-16">
        {/* Header */}
        <SectionHeader
          eyebrow="Four Steps"
          heading="How It Works"
          paragraph="A step-by-step guide from your initial date enquiry to your event day."
        />

        {/* Timeline Container with Open Ruled Layout */}
        <div className="relative border-t border-b border-green/15 py-12">
          {/* Desktop ScaleX Progress Line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-[2px] bg-green/10 z-0">
            <motion.div
              style={{ scaleX, transformOrigin: 'left' }}
              className="h-full bg-gold"
            />
          </div>

          {/* Mobile ScaleY Vertical Progress Line */}
          <div className="lg:hidden absolute top-12 bottom-12 left-3 w-[2px] bg-green/10 z-0">
            <motion.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="w-full bg-gold h-full"
            />
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
            {processStepsData.map((step, idx) => (
              <ProcessStepItem
                key={step.stepNumber}
                step={step}
                idx={idx}
                scrollYProgress={scrollYProgress}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

