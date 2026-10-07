'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '@/data/types';
import { ConceptPlaceholder } from '@/components/common/ConceptPlaceholder';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  triggerRef?: React.RefObject<HTMLElement>;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
  triggerRef,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const currentItem = items[currentIndex];

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(1);
  const [loadedIndex, setLoadedIndex] = useState(currentIndex);
  const prefersReducedMotion = useReducedMotion();

  const handlePrev = useCallback(() => {
    setDirection(-1);
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    setDirection(1);
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Focus trap & focus return
  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement | null;
    const currentTriggerRef = triggerRef?.current;
    document.body.style.overflow = 'hidden';

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      if (currentTriggerRef) {
        currentTriggerRef.focus();
      } else if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [currentIndex, items.length, onClose, onNavigate, triggerRef, handlePrev, handleNext]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStart(null);
  };

  if (!currentItem) return null;

  return (
    <motion.div
      ref={modalRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-green/95 text-ivory backdrop-blur-md flex flex-col justify-between p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo gallery lightbox viewing ${currentItem.title}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-gold/30 pb-4">
        <div>
          <span className="font-sans text-xs uppercase font-semibold text-gold tracking-widest block">
            Gallery Lightbox ({currentIndex + 1} of {items.length})
          </span>
          <h4 className="font-display text-2xl font-medium text-ivory">
            {currentItem.title}
          </h4>
        </div>

        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-ivory hover:bg-gold/20 focus-visible:outline-none min-w-[48px] min-h-[48px]"
          aria-label="Close Lightbox Modal"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Center Viewer with Spring Scale & Slide Entrance */}
      <div className="relative flex-grow flex items-center justify-center py-6">
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-6 z-10 w-12 h-12 rounded-full border border-gold/40 bg-green/80 text-ivory flex items-center justify-center hover:bg-gold hover:text-green transition-colors min-w-[48px] min-h-[48px]"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative max-w-4xl max-h-[70vh] w-full aspect-[4/3] flex items-center justify-center">
          {/* Preload adjacent images */}
          <div className="hidden">
            <ConceptPlaceholder imageKey={items[(currentIndex - 1 + items.length) % items.length].imageKey} />
            <ConceptPlaceholder imageKey={items[(currentIndex + 1) % items.length].imageKey} />
            <ConceptPlaceholder 
              imageKey={items[currentIndex].imageKey} 
              onLoad={() => setLoadedIndex(currentIndex)} 
            />
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={items[loadedIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ConceptPlaceholder
                imageKey={items[loadedIndex].imageKey}
                aspectRatio={items[loadedIndex].aspectRatio}
                className="w-full h-full max-h-[70vh] object-contain rounded-panel border border-gold/30"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-2 md:right-6 z-10 w-12 h-12 rounded-full border border-gold/40 bg-green/80 text-ivory flex items-center justify-center hover:bg-gold hover:text-green transition-colors min-w-[48px] min-h-[48px]"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Footer Instructions */}
      <div className="text-center border-t border-gold/30 pt-4">
        <p className="font-sans text-xs text-ivory/80 font-medium">
          Use Arrow keys or swipe left/right to navigate • Esc to close.
        </p>
      </div>
    </motion.div>
  );
};
