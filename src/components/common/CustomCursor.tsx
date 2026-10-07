'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Check if fine pointer and hover support exists
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || reducedMotion) {
      setIsDisabled(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        // Never show custom cursor over inputs, textareas, selects, nav, or text-selectable elements
        const isExcluded = target.closest(
          'form, iframe, input, textarea, select, nav, header, [contenteditable="true"], .no-custom-cursor'
        );

        if (isExcluded) {
          setIsVisible(false);
          setCursorLabel(null);
          return;
        }

        setIsVisible(true);

        // Check for data-cursor attribute ("View", "Open", "Drag")
        const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
        if (cursorTarget) {
          const label = cursorTarget.getAttribute('data-cursor');
          setCursorLabel(label);
        } else {
          setCursorLabel(null);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorLabel(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (isDisabled || !isVisible) {
    return null;
  }

  const isExpanded = !!cursorLabel;

  return (
    <div
      className="fixed pointer-events-none z-50 rounded-full transition-transform duration-75 ease-out hidden lg:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    >
      <motion.div
        animate={{
          width: isExpanded ? 72 : 12,
          height: isExpanded ? 72 : 12,
          backgroundColor: isExpanded ? '#14342B' : 'rgba(179, 139, 63, 0.2)',
          borderColor: isExpanded ? '#B38B3F' : 'rgba(179, 139, 63, 0.8)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="rounded-full border flex items-center justify-center text-center shadow-md overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {cursorLabel && (
            <motion.span
              key={cursorLabel}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gold select-none px-1"
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
