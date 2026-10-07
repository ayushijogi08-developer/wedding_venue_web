'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark-primary' | 'dark-secondary';
  size?: 'md' | 'lg';
  isMagnetic?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  isMagnetic = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsFinePointer(mediaQuery.matches && !reducedMotion.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isMagnetic || !isFinePointer || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    if (isMagnetic) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-transparent border border-green text-green hover:bg-green hover:text-ivory';
      case 'dark-primary':
        return 'bg-ivory text-green hover:bg-ivory-deep hover:ring-1 hover:ring-gold';
      case 'dark-secondary':
        return 'bg-transparent border border-ivory/40 text-ivory hover:bg-ivory/10 hover:border-ivory';
      case 'ghost':
        return 'bg-transparent text-green hover:bg-green/10';
      case 'primary':
      default:
        return 'bg-green text-ivory hover:bg-green-soft hover:ring-1 hover:ring-gold hover:-translate-y-0.5 active:scale-[0.98]';
    }
  };

  const getSizeStyles = () => {
    return size === 'lg'
      ? 'h-[52px] md:h-[56px] px-8 text-[15px]'
      : 'h-[44px] md:h-[48px] px-6 text-[14px]';
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={isMagnetic && isFinePointer ? { x: position.x, y: position.y } : {}}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1, duration: 0.12 }}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center rounded-pill font-sans font-semibold tracking-wider uppercase transition-all duration-200 focus-visible:outline-none min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed ${getVariantStyles()} ${getSizeStyles()} ${className}`}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
};
