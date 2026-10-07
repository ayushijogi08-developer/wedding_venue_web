'use client';

import React from 'react';

interface GuestSliderProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const GuestSlider: React.FC<GuestSliderProps> = ({
  value,
  onChange,
  min = 25,
  max = 850,
  step = 10,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <div className="w-full space-y-4 text-left">
      <div className="flex items-center justify-between">
        <label htmlFor="guest-count-slider" className="font-sans text-xs font-semibold uppercase tracking-widest text-green">
          Adjust Expected Guest Count
        </label>
        <span
          className="font-display text-2xl font-medium text-green tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          {value} Guests
        </span>
      </div>

      <div className="relative flex items-center">
        <input
          id="guest-count-slider"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={`${value} guests expected`}
          className={`w-full h-3 bg-green/20 rounded-pill appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 accent-green [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:h-11 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-gold [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200 [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-200 ${
            isDragging
              ? '[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:scale-110'
              : '[&::-webkit-slider-thumb]:scale-100 [&::-moz-range-thumb]:scale-100'
          }`}
        />
      </div>

      <div className="flex justify-between font-sans text-xs text-green-soft/70">
        <span>25 (Intimate)</span>
        <span>400 (Banquet)</span>
        <span>850+ (Grand Estate)</span>
      </div>
    </div>
  );
};
