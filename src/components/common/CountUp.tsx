'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ end, duration = 0.8, className = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    if (isInView) {
      let startTime: number | null = null;
      let animationFrameId: number;

      const easeOutCustom = (t: number): number => {
        // Cubic-bezier (0.22, 1, 0.36, 1) approximation
        return 1 - Math.pow(1 - t, 3);
      };

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const currentCount = Math.floor(easeOutCustom(progress) * end);
        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };

      animationFrameId = requestAnimationFrame(step);

      return () => cancelAnimationFrame(animationFrameId);
    } else {
      setCount(0);
    }
  }, [isInView, end, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {(prefersReducedMotion ? end : count).toLocaleString()}
    </span>
  );
};
