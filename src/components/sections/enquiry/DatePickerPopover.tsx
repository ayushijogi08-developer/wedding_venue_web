'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerPopoverProps {
  selectedDate: string; // YYYY-MM-DD
  onChange: (dateStr: string) => void;
  label?: string;
  error?: string;
}

export const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({
  selectedDate,
  onChange,
  label = 'Preferred Date',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();

  const parseDateStr = (str: string) => {
    if (!str) return null;
    const parts = str.split('-');
    if (parts.length !== 3) return null;
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  };

  const selectedDateObj = parseDateStr(selectedDate);

  const formatDateDisplay = (str: string) => {
    const date = parseDateStr(str);
    if (!date) return 'Select preferred event date';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popoverHeight = 360;
    const popoverWidth = Math.min(340, window.innerWidth - 32);

    const spaceBelow = window.innerHeight - rect.bottom;
    const flipUp = spaceBelow < popoverHeight && rect.top > popoverHeight;

    const top = flipUp
      ? rect.top + window.scrollY - popoverHeight - 8
      : rect.bottom + window.scrollY + 8;

    let left = rect.left + window.scrollX;
    if (left + popoverWidth > window.innerWidth - 16) {
      left = Math.max(16, window.innerWidth - popoverWidth - 16);
    }

    setPopoverPos({ top, left });
  };

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDay = (dayNum: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const day = String(dayNum).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPastDate = (dayNum: number) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isTodayDate = (dayNum: number) => {
    return (
      today.getDate() === dayNum &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isSelectedDate = (dayNum: number) => {
    if (!selectedDateObj) return false;
    return (
      selectedDateObj.getDate() === dayNum &&
      selectedDateObj.getMonth() === currentMonth.getMonth() &&
      selectedDateObj.getFullYear() === currentMonth.getFullYear()
    );
  };

  const totalDays = daysInMonth(currentMonth);
  const startOffset = firstDayOfMonth(currentMonth);

  return (
    <div ref={containerRef} className="relative w-full space-y-1.5 text-left">
      <label htmlFor={triggerId} className="block font-sans text-xs font-semibold uppercase tracking-widest text-ivory/90">
        {label} <span className="text-error" aria-hidden="true">*</span>
      </label>

      {/* Trigger Button */}
      <button
        id={triggerId}
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Select preferred date, currently: ${formatDateDisplay(selectedDate)}`}
        className={`w-full h-[56px] px-4 bg-ivory-deep border rounded-input font-sans text-[16px] text-green flex items-center justify-between transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-ivory ${
          error ? 'border-error' : 'border-green-soft/40 hover:border-green'
        }`}
      >
        <span className={selectedDate ? 'text-green font-medium' : 'text-green-soft'}>
          {formatDateDisplay(selectedDate)}
        </span>
        <CalendarIcon className="w-5 h-5 text-gold-text" />
      </button>

      {error && (
        <p role="alert" className="font-sans text-xs font-medium text-error mt-1">
          {error}
        </p>
      )}

      {/* Calendar Popover via Portal */}
      {isOpen && isMounted && createPortal(
        <div
          ref={popoverRef}
          style={{
            position: 'absolute',
            top: `${popoverPos.top}px`,
            left: `${popoverPos.left}px`,
            width: 'calc(100vw - 32px)',
            maxWidth: '340px',
            zIndex: 9999,
          }}
          className="bg-ivory border border-green/15 rounded-panel p-5 shadow-lg surface-ivory animate-in fade-in zoom-in-95 duration-150 text-green"
        >
          <div className="flex items-center justify-between pb-3 border-b border-green/10 mb-4">
            <span className="font-display font-medium text-lg text-green">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-ivory-deep text-green min-w-[36px] min-h-[36px]"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-ivory-deep text-green min-w-[36px] min-h-[36px]"
                aria-label="Next Month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <span key={day} className="font-sans text-[11px] font-semibold uppercase tracking-wider text-green-soft/70">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`blank-${i}`} className="w-10 h-10" />
            ))}

            {Array.from({ length: totalDays }).map((_, i) => {
              const dayNum = i + 1;
              const disabled = isPastDate(dayNum);
              const selected = isSelectedDate(dayNum);
              const todayMark = isTodayDate(dayNum);

              return (
                <button
                  key={`day-${dayNum}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelectDay(dayNum)}
                  className={`w-10 h-10 rounded-full text-sm font-sans font-medium flex items-center justify-center transition-all min-w-[40px] min-h-[40px] ${
                    selected
                      ? 'bg-green text-ivory font-semibold shadow-sm'
                      : disabled
                      ? 'opacity-30 cursor-not-allowed text-green-soft/40'
                      : todayMark
                      ? 'ring-1 ring-gold font-semibold text-green hover:bg-ivory-deep'
                      : 'hover:bg-ivory-deep text-green'
                  }`}
                  aria-label={`${dayNum} ${currentMonth.toLocaleDateString('en-US', {
                    month: 'long',
                  })}`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-green/10 flex items-center justify-between text-xs font-sans">
            <span className="text-green-soft">Single preferred date</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gold-text font-semibold uppercase tracking-wider hover:underline"
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
