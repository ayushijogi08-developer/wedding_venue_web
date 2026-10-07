'use client';

import React, { forwardRef, useId } from 'react';
import { AlertCircle } from 'lucide-react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, required, rows = 4, ...props }, ref) => {
    const defaultId = useId();
    const inputId = id || defaultId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full space-y-1.5 text-left group">
        <label
          htmlFor={inputId}
          className="block font-sans text-xs font-semibold uppercase tracking-widest text-ivory/90 transition-colors duration-200 group-focus-within:text-gold-text"
        >
          {label} {required && <span className="text-error" aria-hidden="true">*</span>}
        </label>

        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`w-full p-4 bg-ivory-deep border rounded-input font-sans text-[16px] text-green transition-all duration-200 placeholder:text-green-soft/50 focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-ivory disabled:opacity-50 disabled:cursor-not-allowed ${
              error
                ? 'border-error focus:ring-error'
                : 'border-green-soft/40 focus:border-green'
            } ${className}`}
            {...props}
          />
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

Textarea.displayName = 'Textarea';
