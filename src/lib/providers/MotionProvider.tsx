'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showCurtain, setShowCurtain] = useState(false);

  useEffect(() => {
    // 1. Check reduced motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    // 2. Check session storage (show curtain only once per session)
    try {
      const hasSeen = sessionStorage.getItem('hasSeenCurtain');
      if (hasSeen === 'true') return;

      // Mark as seen immediately so reloads don't replay it
      sessionStorage.setItem('hasSeenCurtain', 'true');
      setShowCurtain(true);
    } catch {
      // If sessionStorage fails (e.g. privacy mode), do not block
      return;
    }

    // 3. Robust fallback timeout (max 2.0 seconds) to ensure unmount
    const fallbackTimer = setTimeout(() => {
      setShowCurtain(false);
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => setShowCurtain(false)}
      >
        {showCurtain && (
          <motion.div
            key="curtain-reveal"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: 'top' }}
            className="fixed inset-0 z-50 bg-green flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div className="text-center px-4 pointer-events-none">
              <span className="font-display italic text-2xl text-gold tracking-widest block mb-2">
                Heritage Lawns & Banquets
              </span>
              <div className="w-16 h-0.5 bg-gold/60 mx-auto" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="min-h-screen flex flex-col">{children}</div>
    </>
  );
};
