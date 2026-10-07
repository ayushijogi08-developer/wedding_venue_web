import React from 'react';

interface PillProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ children, icon, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-2 h-8 px-3.5 rounded-pill border border-gold/70 bg-transparent text-gold-text font-sans text-[11px] md:text-xs font-semibold uppercase tracking-wider select-none shrink-0 ${className}`}
    >
      {icon && (
        <span className="w-4 h-4 text-gold flex items-center justify-center shrink-0 [&>svg]:w-4 [&>svg]:h-4">
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
};
