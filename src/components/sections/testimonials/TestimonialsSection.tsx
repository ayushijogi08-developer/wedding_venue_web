import React from 'react';

interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  quote: string;
  date: string;
}

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials = [],
}) => {
  // Honesty Rule: Hidden by default when no real testimonials exist
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="surface-ivory py-24 border-t border-green/10">
      <div className="max-w-container mx-auto px-5 md:px-10 lg:px-16 space-y-12">
        <div className="max-w-3xl space-y-3 text-left">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-text">
            Client Words
          </span>
          <h2 className="font-display text-section-h2 font-medium text-green">
            Couples & Event Hosts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="p-8 rounded-panel bg-ivory-deep border border-green/10 space-y-4">
              <p className="font-display italic text-xl text-green">&quot;{t.quote}&quot;</p>
              <div>
                <span className="font-sans text-sm font-semibold text-green block">{t.author}</span>
                <span className="font-sans text-xs text-green-soft/70">{t.role} • {t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
