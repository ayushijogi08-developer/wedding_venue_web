import React from 'react';
import type { Metadata } from 'next';
import { ConceptPlaceholder } from '@/components/common/ConceptPlaceholder';

export const metadata: Metadata = {
  title: 'Styleguide & Tokens | Heritage Lawns',
  robots: {
    index: false,
    follow: false,
  },
};

export default function StyleguidePage() {
  return (
    <div className="pt-28 pb-20 px-6 max-w-container mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-green/15 pb-8 space-y-2">
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-text">
          Internal Architecture Preview
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-medium text-green">
          Design System & Tokens Styleguide
        </h1>
        <p className="font-sans text-lead text-green-soft max-w-prose-custom">
          Verification page displaying exact design tokens, typography fluid scale, color roles, contrast compliance, and UI component primitive states.
        </p>
      </div>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-medium text-green border-b border-green/10 pb-3">
          1. Color Palette Tokens
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-panel bg-ivory border border-green/15 space-y-2">
            <div className="h-16 rounded-input bg-[#FAF6EE] border border-green/20" />
            <div className="font-sans text-xs">
              <p className="font-semibold text-green">--ivory</p>
              <p className="text-green-soft">#FAF6EE (Page Surface)</p>
            </div>
          </div>

          <div className="p-4 rounded-panel bg-ivory-deep border border-green/15 space-y-2">
            <div className="h-16 rounded-input bg-[#F1EADB] border border-green/20" />
            <div className="font-sans text-xs">
              <p className="font-semibold text-green">--ivory-deep</p>
              <p className="text-green-soft">#F1EADB (Alt Surface / Inputs)</p>
            </div>
          </div>

          <div className="p-4 rounded-panel bg-green text-ivory space-y-2">
            <div className="h-16 rounded-input bg-[#14342B] border border-gold/40" />
            <div className="font-sans text-xs">
              <p className="font-semibold text-ivory">--green</p>
              <p className="text-ivory/80">#14342B (Primary Dark)</p>
            </div>
          </div>

          <div className="p-4 rounded-panel bg-ivory border border-green/15 space-y-2">
            <div className="h-16 rounded-input bg-[#2E4A41]" />
            <div className="font-sans text-xs">
              <p className="font-semibold text-green">--green-soft</p>
              <p className="text-green-soft">#2E4A41 (Secondary Text 6.5:1+)</p>
            </div>
          </div>

          <div className="p-4 rounded-panel bg-ivory border border-green/15 space-y-2">
            <div className="h-16 rounded-input bg-[#B38B3F]" />
            <div className="font-sans text-xs">
              <p className="font-semibold text-green">--gold</p>
              <p className="text-green-soft">#B38B3F (Decorative Only)</p>
            </div>
          </div>

          <div className="p-4 rounded-panel bg-ivory border border-green/15 space-y-2">
            <div className="h-16 rounded-input bg-[#7A5C1E]" />
            <div className="font-sans text-xs">
              <p className="font-semibold text-green">--gold-text</p>
              <p className="text-green-soft">#7A5C1E (Small Gold Text 5.7:1)</p>
            </div>
          </div>

          <div className="p-4 rounded-panel bg-ivory border border-green/15 space-y-2">
            <div className="h-16 rounded-input bg-[#9B2C2C]" />
            <div className="font-sans text-xs">
              <p className="font-semibold text-green">--error</p>
              <p className="text-green-soft">#9B2C2C (Error State 7:1)</p>
            </div>
          </div>

          <div className="p-4 rounded-panel bg-ivory border border-green/15 space-y-2">
            <div className="h-16 rounded-input bg-[#1F5A3A]" />
            <div className="font-sans text-xs">
              <p className="font-semibold text-green">--success</p>
              <p className="text-green-soft">#1F5A3A (Success State)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Fluid Typography Scale */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-medium text-green border-b border-green/10 pb-3">
          2. Typography Scale (Cormorant Garamond & DM Sans)
        </h2>
        <div className="space-y-6 bg-ivory-deep/60 p-6 md:p-8 rounded-panel">
          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-gold-text font-semibold">
              Hero H1 (44px - 96px)
            </span>
            <h1 className="font-display text-hero-h1 text-green font-medium">
              Your Wedding Day, <em className="italic font-normal">Beautifully Hosted</em>.
            </h1>
          </div>

          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-gold-text font-semibold">
              Section H2 (36px - 64px)
            </span>
            <h2 className="font-display text-section-h2 text-green font-medium">
              Curated Estate Grounds & Architectural Spaces
            </h2>
          </div>

          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-gold-text font-semibold">
              Heading H3 (24px - 36px)
            </span>
            <h3 className="font-display text-heading-h3 text-green font-medium">
              The Archway Banquet Hall & Lawn Gardens
            </h3>
          </div>

          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-gold-text font-semibold">
              Lead Paragraph (18px - 20px)
            </span>
            <p className="font-sans text-lead text-green-soft max-w-prose-custom">
              An estate designed for couples seeking an elevated, timeless backdrop framed by historic stone arches and manicured greenery.
            </p>
          </div>

          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-gold-text font-semibold">
              Body Text (16px - 18px)
            </span>
            <p className="font-sans text-body text-green-soft max-w-prose-custom">
              Every space is crafted with natural lighting, climate control options, dedicated vendor staging areas, and private bridal preparation suites.
            </p>
          </div>

          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-gold-text font-semibold">
              Eyebrow / Label (12px - 13px Uppercase)
            </span>
            <p className="font-sans text-eyebrow text-gold-text uppercase tracking-widest font-semibold block">
              Architectural Feature • Verified Token
            </p>
          </div>
        </div>
      </section>

      {/* 3. Button & Form Component Primitives */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-medium text-green border-b border-green/10 pb-3">
          3. Button & Input Primitive States
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Buttons */}
          <div className="p-6 rounded-panel border border-green/15 space-y-4">
            <h3 className="font-display text-lg font-medium text-green">Buttons</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="h-14 px-8 rounded-pill bg-green text-ivory font-sans text-sm font-semibold uppercase tracking-wider hover:bg-green-soft hover:ring-1 hover:ring-gold transition-all">
                Primary Button
              </button>
              <button className="h-14 px-8 rounded-pill border border-green text-green font-sans text-sm font-semibold uppercase tracking-wider hover:bg-green hover:text-ivory transition-colors">
                Secondary Button
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="p-6 rounded-panel border border-green/15 space-y-4">
            <h3 className="font-display text-lg font-medium text-green">Form Inputs</h3>
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-widest text-green">
                Full Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                defaultValue="Eleanor Vance"
                className="w-full h-14 px-4 bg-ivory-deep border border-green-soft/40 rounded-input font-sans text-base text-green focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-ivory"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Placeholder Image Component Test */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-medium text-green border-b border-green/10 pb-3">
          4. Concept Placeholder Component Test
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ConceptPlaceholder imageKey="hero_main" aspectRatio="16:9" />
          <ConceptPlaceholder imageKey="grand_lawn" aspectRatio="4:5" />
          <ConceptPlaceholder imageKey="banquet_hall" aspectRatio="4:3" />
        </div>
      </section>
    </div>
  );
}
