'use client';

import React, { forwardRef, useId } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = '', id, required, ...props }, ref) => {
    const defaultId = useId();
    const selectId = id || defaultId;
    const errorId = `${selectId}-error`;

    return (
      <div className="w-full space-y-1.5 text-left group">
        <label
          htmlFor={selectId}
          className="block font-sans text-xs font-semibold uppercase tracking-widest text-ivory/90 transition-colors duration-200 group-focus-within:text-gold-text"
        >
          {label} {required && <span className="text-error" aria-hidden="true">*</span>}
        </label>

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`w-full h-[56px] pl-4 pr-10 bg-ivory-deep border rounded-input font-sans text-[16px] text-green appearance-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-ivory disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
              error
                ? 'border-error focus:ring-error'
                : 'border-green-soft/40 focus:border-green'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold-text">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className="font-sans text-xs font-medium text-error flex items-center gap-1 mt-1"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
