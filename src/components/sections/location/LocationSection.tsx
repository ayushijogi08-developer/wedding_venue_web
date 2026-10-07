import { REVEAL_VIEWPORT } from '@/lib/motion/viewport';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, MessageSquare, ExternalLink, Clock } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EASE_CUSTOM, MOTION_TOKENS } from '@/lib/motion';

export const LocationSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="location" className="surface-green py-24 md:py-36 border-t border-gold/30">
      <div className="max-w-container mx-auto px-5 md:px-10 lg:px-16 space-y-12">
        <SectionHeader
          eyebrow="Estate Location"
          heading="Visiting Heritage Lawns"
          paragraph="Located in the Garden Estate District with highway access and on-site guest parking."
          eyebrowColorClass="text-gold"
          headingColorClass="text-ivory"
          paragraphColorClass="text-ivory/80"
        />

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Details Panel Fade Up */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24, clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: MOTION_TOKENS.duration.medium, ease: EASE_CUSTOM }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="p-6 rounded-panel bg-green-soft/40 border border-gold/20 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-2xl font-medium text-ivory">
                    Estate Address
                  </h3>
                  <p className="font-sans text-sm text-ivory/80 mt-1">
                    {siteConfig.address.fullAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-sans text-xs uppercase font-semibold text-gold tracking-widest">
                    Office &amp; Tour Hours
                  </h4>
                  <p className="font-sans text-sm text-ivory/80 mt-1">
                    {siteConfig.contact.timingHours}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address.fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-pill bg-gold text-green font-sans text-xs font-semibold uppercase tracking-widest hover:bg-gold/90 transition-colors"
              >
                Get Directions
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-pill border border-ivory/40 text-ivory font-sans text-xs font-semibold uppercase tracking-widest hover:bg-ivory/10 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-gold" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          {/* Map Vector SVG Placeholder Panel Fade Up */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24, clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={REVEAL_VIEWPORT}
            transition={{
              duration: MOTION_TOKENS.duration.medium,
              delay: 0.1,
              ease: EASE_CUSTOM,
            }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-panel border border-gold/30 aspect-[16/10] bg-green-soft flex flex-col justify-between p-6">
              <svg
                className="absolute inset-0 w-full h-full opacity-30"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 600 400"
                aria-hidden="true"
              >
                <path d="M 0 100 Q 200 150 400 80 T 600 200" fill="none" stroke="#B38B3F" strokeWidth="3" />
                <path d="M 100 0 Q 150 200 300 400" fill="none" stroke="#FAF6EE" strokeWidth="2" strokeDasharray="6 6" />
                <circle cx="300" cy="200" r="16" fill="#B38B3F" />
                <circle cx="300" cy="200" r="32" fill="none" stroke="#B38B3F" strokeWidth="1.5" />
              </svg>

              <div className="relative z-10 flex items-center justify-between border-b border-gold/30 pb-3">
                <span className="font-sans text-[11px] font-semibold text-gold uppercase bg-green/80 px-3 py-1 rounded-pill">
                  Concept placeholder
                </span>
              </div>

              <div className="relative z-10 text-center my-auto px-4">
                <h3 className="font-display text-2xl text-ivory font-medium">
                  {siteConfig.venueName}
                </h3>
                <p className="font-sans text-xs text-gold tracking-widest uppercase mt-1">
                  100 Heritage Manor Drive, Metropolis, NY
                </p>
              </div>

              <div className="relative z-10 text-center text-xs text-ivory/70 border-t border-gold/30 pt-3">
                Parking for 250 vehicles • Dedicated coach turnaround
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

