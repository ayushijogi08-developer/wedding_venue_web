import { REVEAL_VIEWPORT } from '@/lib/motion/viewport';
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { includedServicesData } from '@/data/included';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EASE_CUSTOM, MOTION_TOKENS } from '@/lib/motion';

export const IncludedSection: React.FC = () => {
  const includedItems = includedServicesData.filter((i) => i.isIncluded);
  const byoItems = includedServicesData.filter((i) => !i.isIncluded);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="included" className="surface-ivory-deep py-24 md:py-36 border-t border-green/10">
      <div className="max-w-container mx-auto px-5 md:px-10 lg:px-16 space-y-16">
        {/* Header */}
        <SectionHeader
          eyebrow="Transparent Provisions"
          heading="What's Included & Venue Policies"
          paragraph="Clear guidelines on what our estate provides directly versus flexible rules for external vendors."
        />

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Column 1: Venue Inclusions */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: MOTION_TOKENS.duration.medium, ease: EASE_CUSTOM }}
            className="lg:col-span-6 bg-ivory p-8 rounded-panel border border-green/15 shadow-soft space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-green/10 pb-4">
              <CheckCircle className="w-6 h-6 text-success" />
              <h3 className="font-display text-2xl font-medium text-green">
                Provided by Heritage Estate
              </h3>
            </div>
            <div className="space-y-6">
              {includedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: isMobile ? 32 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={REVEAL_VIEWPORT}
                  transition={{
                    duration: MOTION_TOKENS.duration.medium,
                    delay: index * 0.1,
                    ease: EASE_CUSTOM,
                  }}
                  className="flex items-start gap-3"
                >
                  {/* Tick icon clip-path reveal (NO stroke-dashoffset) */}
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { clipPath: 'inset(0% 0% 0% 0%)' }
                        : { clipPath: 'inset(0% 100% 0% 0%)' }
                    }
                    whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                    viewport={REVEAL_VIEWPORT}
                    transition={{
                      duration: MOTION_TOKENS.duration.medium,
                      delay: index * 0.1,
                      ease: EASE_CUSTOM,
                    }}
                    className="mt-0.5 shrink-0"
                  >
                    <CheckCircle className="w-5 h-5 text-success" />
                  </motion.div>
                  <div className="space-y-1">
                    <h4 className="font-sans text-base font-semibold text-green">
                      {item.title}
                    </h4>
                    <p className="font-sans text-sm text-green-soft leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: BYO Policy & Vendor Guidelines */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{
              duration: MOTION_TOKENS.duration.medium,
              delay: 0.15,
              ease: EASE_CUSTOM,
            }}
            className="lg:col-span-6 bg-ivory p-8 rounded-panel border border-green/15 shadow-soft space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-green/10 pb-4">
              <AlertCircle className="w-6 h-6 text-gold-text" />
              <h3 className="font-display text-2xl font-medium text-green">
                Bring Your Own (BYO Rules)
              </h3>
            </div>
            <div className="space-y-6">
              {byoItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: isMobile ? 32 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={REVEAL_VIEWPORT}
                  transition={{
                    duration: MOTION_TOKENS.duration.medium,
                    delay: index * 0.1,
                    ease: EASE_CUSTOM,
                  }}
                  className="space-y-1"
                >
                  <h4 className="font-sans text-base font-semibold text-green">
                    {item.title}
                  </h4>
                  <p className="font-sans text-sm text-green-soft leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

