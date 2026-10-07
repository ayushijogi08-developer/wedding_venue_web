'use client';

import React, { forwardRef, useId } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, required, ...props }, ref) => {
    const defaultId = useId();
    const inputId = id || defaultId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full space-y-1.5 text-left group">
        <label
          htmlFor={inputId}
          className="block font-sans text-xs font-semibold uppercase tracking-widest text-ivory/90 transition-colors duration-200 group-focus-within:text-gold-text"
        >
          {label} {required && <span className="text-error" aria-hidden="true">*</span>}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full h-[56px] px-4 bg-ivory-deep border-b-2 rounded-t-input font-sans text-[16px] text-green transition-colors duration-200 placeholder:text-green-soft/50 focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
              error
                ? 'border-error'
                : 'border-green-soft/40 hover:border-green-soft/60'
            } ${className}`}
            {...props}
          />
          <div 
            className={`absolute bottom-0 left-0 h-[2px] w-full scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 ease-out origin-center pointer-events-none ${error ? 'bg-error' : 'bg-green'}`} 
          />
          {error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-error pointer-events-none">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}
        </div>

        {error ? (
          <motion.p
            initial={false}
            animate={{ x: [-4, 4, -4, 4, 0] }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            id={errorId}
            role="alert"
            aria-live="polite"
            className="font-sans text-xs font-medium text-error flex items-center gap-1 mt-1"
          >
            {error}
          </motion.p>
        ) : helperText ? (
          <p id={helperId} className="font-sans text-xs text-green-soft/70 mt-1">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
