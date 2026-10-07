'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { imagesMap } from '@/data/images';

interface ConceptPlaceholderProps {
  imageKey: string;
  aspectRatio?: '4:5' | '16:9' | '3:4' | '4:3' | '1:1';
  className?: string;
  priority?: boolean;
  hideCaption?: boolean;
  sizes?: string;
  onLoad?: () => void;
}

export const ConceptPlaceholder: React.FC<ConceptPlaceholderProps> = ({
  imageKey,
  aspectRatio = '4:5',
  className = '',
  priority = false,
  hideCaption = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const definition = imagesMap[imageKey] || {
    key: imageKey,
    title: 'Heritage Estate Visual',
    alt: 'AI-generated concept image.',
    src: '',
    svgType: 'hero_arch',
    conceptPlaceholderText: 'AI-generated concept image',
  };

  const getAspectClass = (aspect: string) => {
    switch (aspect) {
      case '16:9':
        return 'aspect-[16/9] min-h-[220px] md:min-h-[360px]';
      case '3:4':
        return 'aspect-[3/4] min-h-[300px] md:min-h-[400px]';
      case '4:3':
        return 'aspect-[4/3] min-h-[240px] md:min-h-[320px]';
      case '1:1':
        return 'aspect-square min-h-[260px] md:min-h-[340px]';
      case '4:5':
      default:
        return 'aspect-[4/5] min-h-[300px] md:min-h-[420px]';
    }
  };

  const renderSvgScene = (type: string) => {
    switch (type) {
      case 'grand_lawn':
        return (
          <>
            <path d="M 0 350 Q 150 320 300 340 T 600 330 L 600 500 L 0 500 Z" fill="#2E4A41" opacity="0.4" />
            <path d="M 0 380 Q 200 360 400 375 T 600 360 L 600 500 L 0 500 Z" fill="#14342B" />
            <path d="M 120 400 V 220 H 280 V 400" fill="none" stroke="#B38B3F" strokeWidth="2.5" />
            <path d="M 110 220 H 290" stroke="#B38B3F" strokeWidth="2" />
            <circle cx="200" cy="200" r="25" fill="none" stroke="#B38B3F" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="60" cy="260" r="55" fill="#2E4A41" opacity="0.3" />
            <circle cx="340" cy="250" r="65" fill="#2E4A41" opacity="0.3" />
          </>
        );
      case 'banquet_hall':
        return (
          <>
            <path d="M 60 500 V 160 A 80 80 0 0 1 220 160 V 500 Z" fill="none" stroke="#B38B3F" strokeWidth="2" />
            <path d="M 260 500 V 200 A 60 60 0 0 1 380 200 V 500 Z" fill="none" stroke="#FAF6EE" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 140 60 V 110 M 110 110 H 170 M 120 130 Q 140 145 160 130" stroke="#B38B3F" strokeWidth="1.5" fill="none" />
            <circle cx="110" cy="110" r="3" fill="#B38B3F" />
            <circle cx="140" cy="120" r="4" fill="#B38B3F" />
            <circle cx="170" cy="110" r="3" fill="#B38B3F" />
          </>
        );
      case 'courtyard':
        return (
          <>
            <path d="M 30 120 H 370 M 30 140 H 370" stroke="#B38B3F" strokeWidth="2" />
            <path d="M 60 100 V 420 M 140 100 V 420 M 220 100 V 420 M 300 100 V 420 M 340 100 V 420" stroke="#FAF6EE" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="80" cy="130" r="4" fill="#B38B3F" />
            <circle cx="160" cy="135" r="4" fill="#B38B3F" />
            <circle cx="240" cy="130" r="4" fill="#B38B3F" />
            <circle cx="320" cy="135" r="4" fill="#B38B3F" />
          </>
        );
      case 'bridal_suite':
        return (
          <>
            <path d="M 130 450 V 220 A 70 70 0 0 1 270 220 V 450 Z" fill="none" stroke="#B38B3F" strokeWidth="2" />
            <circle cx="130" cy="220" r="5" fill="#B38B3F" />
            <circle cx="200" cy="150" r="5" fill="#B38B3F" />
            <circle cx="270" cy="220" r="5" fill="#B38B3F" />
            <path d="M 70 420 C 70 380 110 380 110 420 H 70 Z" fill="none" stroke="#FAF6EE" strokeWidth="1.5" />
          </>
        );
      case 'event_reception':
        return (
          <>
            <ellipse cx="200" cy="360" rx="140" ry="40" fill="none" stroke="#B38B3F" strokeWidth="2" />
            <circle cx="120" cy="350" r="10" stroke="#FAF6EE" strokeWidth="1" fill="none" />
            <circle cx="200" cy="340" r="14" stroke="#FAF6EE" strokeWidth="1" fill="none" />
            <circle cx="280" cy="350" r="10" stroke="#FAF6EE" strokeWidth="1" fill="none" />
            <path d="M 180 300 V 340 M 200 290 V 340 M 220 300 V 340" stroke="#B38B3F" strokeWidth="1.5" />
          </>
        );
      case 'hero_arch':
      default:
        return (
          <>
            <path d="M 50 500 V 200 A 150 150 0 0 1 350 200 V 500 Z" fill="none" stroke="#B38B3F" strokeWidth="2" />
            <path d="M 80 500 V 210 A 120 120 0 0 1 320 210 Z" fill="none" stroke="#FAF6EE" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="200" cy="130" r="35" fill="none" stroke="#B38B3F" strokeWidth="1.5" />
          </>
        );
    }
  };

  const hasImage = !!definition.src && !hasError;
  const hasMobileImage = !!definition.mobileSrc && !hasError;

  return (
    <div
      className={`relative w-full overflow-hidden bg-ivory-deep text-ivory flex flex-col justify-end p-4 select-none ${getAspectClass(
        aspectRatio
      )} ${className}`}
      role="img"
      aria-label={definition.alt}
    >
      {/* Real next/image rendering */}
      {hasImage && (
        <>
          {hasMobileImage ? (
            <>
              {/* Mobile image: md:hidden */}
              <div className="absolute inset-0 md:hidden z-0">
                <Image
                  src={definition.mobileSrc!}
                  alt={definition.alt}
                  fill
                  sizes={sizes}
                  priority={priority}
                  loading={priority ? 'eager' : 'lazy'}
                  quality={90}
                  className="object-cover opacity-100"
                  style={{ objectPosition: definition.objectPosition || 'center' }}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setHasError(true)}
                />
              </div>
              {/* Desktop image: hidden md:block */}
              <div className="absolute inset-0 hidden md:block z-0">
                <Image
                  src={definition.src!}
                  alt={definition.alt}
                  fill
                  sizes={sizes}
                  priority={priority}
                  loading={priority ? 'eager' : 'lazy'}
                  quality={90}
                  className="object-cover opacity-100"
                  style={{ objectPosition: definition.objectPosition || 'center' }}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setHasError(true)}
                />
              </div>
            </>
          ) : (
            <div className="absolute inset-0 z-0">
              <Image
                src={definition.src!}
                alt={definition.alt}
                fill
                sizes={sizes}
                priority={priority}
                loading={priority ? 'eager' : 'lazy'}
                quality={90}
                className="object-cover opacity-100"
                style={{ objectPosition: definition.objectPosition || 'center' }}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
              />
            </div>
          )}

          {/* Light Flat Green Overlay: 35% general over image */}
          <div className="absolute inset-0 bg-green/35 z-[1] pointer-events-none" />
        </>
      )}

      {/* Fallback Gradient Scene if image fails or is missing */}
      {(!hasImage || hasError) && (
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-green via-[#1C4438] to-green flex flex-col justify-end p-6 border border-gold/30">
          <svg
            className="absolute inset-0 w-full h-full opacity-35 pointer-events-none z-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <rect width="100%" height="100%" fill="#14342B" />
            {renderSvgScene(definition.svgType)}
          </svg>
          <div className="relative z-10 space-y-1">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gold block">
              Concept Placeholder
            </span>
            <p className="font-display text-xl md:text-2xl text-ivory font-medium leading-tight">
              {definition.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
