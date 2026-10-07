'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FaqItem } from '@/data/types';
import { EASE_CUSTOM, MOTION_TOKENS } from '@/lib/motion';

interface FaqAccordionItemProps {
  faq: FaqItem;
}

export const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border-b border-green/15 text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full py-6 flex items-center justify-between gap-4 text-left focus-visible:outline-none min-h-[56px] group"
      >
        <span className="font-display text-xl md:text-2xl text-green font-medium group-hover:text-gold-text transition-colors">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.fast, ease: EASE_CUSTOM }}
          className="w-9 h-9 rounded-full border border-green/20 text-green flex items-center justify-center shrink-0 group-hover:border-gold-text group-hover:text-gold-text"
        >
          <Plus className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Height-free method: CSS Grid grid-template-rows (0fr to 1fr) */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="font-sans text-body text-green-soft leading-relaxed pr-8">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

