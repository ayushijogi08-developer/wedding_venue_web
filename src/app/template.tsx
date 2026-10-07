'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Hard fallback timeout of 1 second to force 100% opacity
    const timer = setTimeout(() => {
      setForceVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // During SSR or pre-mount, or if forceVisible is triggered, render children fully visible without animation
  if (!isMounted || forceVisible) {
    return <div className="w-full opacity-100">{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0.01 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
