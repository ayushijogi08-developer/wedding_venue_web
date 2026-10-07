'use client';
import { REVEAL_VIEWPORT } from '@/lib/motion/viewport';


import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { faqData } from '@/data/faq';
import { FaqAccordionItem } from './FaqAccordionItem';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EASE_CUSTOM, MOTION_TOKENS } from '@/lib/motion';

export const FaqSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="faq" className="surface-ivory py-24 md:py-36 border-t border-green/10">
      <div className="max-w-container mx-auto px-5 md:px-10 lg:px-16 space-y-12">
        <SectionHeader
          eyebrow="Estate Info"
          heading="Questions & Policies"
          paragraph="Details on payment schedules, caterer rules, decor setup hours, and music curfews."
        />

        {/* Accordion Panel Container Fade Up */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24, clipPath: 'inset(100% 0% 0% 0%)' }}
          whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: MOTION_TOKENS.duration.medium, ease: EASE_CUSTOM }}
          className="max-w-4xl mx-auto border-t border-green/15"
        >
          {faqData.map((faq) => (
            <FaqAccordionItem key={faq.id} faq={faq} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

