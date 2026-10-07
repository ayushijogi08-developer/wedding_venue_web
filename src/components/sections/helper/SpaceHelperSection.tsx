'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { spacesData } from '@/data/spaces';
import { VenueSpace } from '@/data/types';
import { GuestSlider } from './GuestSlider';
import { Button } from '@/components/ui/Button';
import { ConceptPlaceholder } from '@/components/common/ConceptPlaceholder';
import { SectionHeader } from '@/components/common/SectionHeader';
import { CountUp } from '@/components/common/CountUp';
import { scrollToSection } from '@/lib/scroll';
import { EASE_CUSTOM, MOTION_TOKENS } from '@/lib/motion';
import { CONTENT_VIEWPORT } from '@/lib/motion/viewport';

export const SpaceHelperSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [guestCount, setGuestCount] = useState(250);

  // Filter suited space based on capacity
  const getSuggestedSpace = (count: number): VenueSpace => {
    if (count <= 40) {
      return spacesData.find((s) => s.id === 'space-bridal-suite') || spacesData[3];
    } else if (count <= 250) {
      return spacesData.find((s) => s.id === 'space-courtyard-pavilion') || spacesData[2];
    } else if (count <= 450) {
      return spacesData.find((s) => s.id === 'space-archway-hall') || spacesData[1];
    } else {
      return spacesData.find((s) => s.id === 'space-grand-lawn') || spacesData[0];
    }
  };

  const suggestedSpace = getSuggestedSpace(guestCount);

  return (
    <section id="helper" className="relative surface-ivory-deep py-24 md:py-36 border-t border-green/10">
      <div className="max-w-container mx-auto px-5 md:px-10 lg:px-16 space-y-12">
        <SectionHeader
          eyebrow="Interactive Recommendation"
          heading="Which Space Fits Your Guest Count?"
          paragraph="Slide to your expected guest count to discover which setting comfortably accommodates your seated banquet and floating guest arrangements."
        />

        {/* Interactive Helper Box */}
        <motion.div 
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={CONTENT_VIEWPORT}
          transition={{ duration: MOTION_TOKENS.duration.medium }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-ivory rounded-panel p-6 md:p-10 shadow-soft border border-green/15 items-center"
        >
          {/* Slider & Filter Logic */}
          <div className="lg:col-span-6 space-y-8">
            <GuestSlider value={guestCount} onChange={setGuestCount} />

            {/* Live Region Status Summary with Cross-Fade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={suggestedSpace.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: MOTION_TOKENS.duration.fast, ease: EASE_CUSTOM }}
                role="region"
                aria-live="polite"
                aria-atomic="true"
                className="p-5 rounded-input bg-ivory-deep border border-green/10 space-y-2"
              >
                <div className="flex items-center gap-2 text-green">
                  <Check className="w-5 h-5 text-gold-text" />
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-gold-text">
                    Recommended Layout
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium text-green">
                  {suggestedSpace.name}
                </h3>
                <p className="font-sans text-sm text-green-soft">
                  {suggestedSpace.tagline}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Capacities with Ticking CountUp Numbers */}
            <div className="grid grid-cols-2 gap-4 font-sans text-sm border-t border-green/10 pt-4">
              <div>
                <span className="text-xs text-green-soft/70 uppercase block">Seated Limit</span>
                <span className="font-display text-2xl font-medium text-green tabular-nums">
                  Up to <CountUp end={suggestedSpace.capacitySeated} />
                </span>
              </div>
              <div>
                <span className="text-xs text-green-soft/70 uppercase block">Floating Limit</span>
                <span className="font-display text-2xl font-medium text-green tabular-nums">
                  Up to <CountUp end={suggestedSpace.capacityFloating} />
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto gap-2"
                onClick={() => scrollToSection('#enquiry')}
              >
                Enquire For {suggestedSpace.name}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Dynamic Suggested Space Preview Cross-Fade */}
          <div className="lg:col-span-6">
            <div className="relative w-full max-w-md lg:max-w-none mx-auto">
              {/* Gold double line frame behind arch */}
              <div
                className="absolute -inset-[12px] rounded-t-[9999px] border border-gold/40 pointer-events-none z-0"
                aria-hidden="true"
              >
                <div className="absolute inset-[3px] rounded-t-[9999px] border border-gold/30" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={suggestedSpace.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: MOTION_TOKENS.duration.fast, ease: EASE_CUSTOM }}
                  className="relative overflow-hidden rounded-t-[9999px] rounded-b-0 shadow-md border border-green/15 w-full aspect-[4/5] bg-green z-10"
                >
                  <div className="absolute -top-[6%] bottom-[-6%] left-0 right-0 w-full h-[112%]">
                    <ConceptPlaceholder
                      imageKey={suggestedSpace.imageKey}
                      aspectRatio="4:5"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
