import React from 'react';
import { MessageSquare, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { EnquiryForm } from './EnquiryForm';
import { SectionHeader } from '@/components/common/SectionHeader';

interface EnquirySectionProps {
  initialDate?: string;
  initialGuests?: number;
  initialEventType?: string;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({
  initialDate,
  initialGuests,
  initialEventType,
}) => {
  return (
    <section id="enquiry" className="surface-ivory-deep pt-24 pb-24 md:pt-36 md:pb-32 border-t border-green/10">
      <div className="max-w-container mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & WhatsApp Option */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <SectionHeader
              eyebrow="Direct Contact"
              heading="Request a date"
              paragraph="Send your date and guest count to arrange a site tour and confirm date details."
            />

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-panel bg-ivory border border-green/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green/10 text-green flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gold-text" />
                </div>
                <div>
                  <span className="font-sans text-xs uppercase font-semibold text-gold-text tracking-wider block">
                    Estate Office
                  </span>
                  <a
                    href={siteConfig.contact.phoneHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl text-green hover:underline"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <p className="font-sans text-xs text-green-soft/70 mt-0.5">{siteConfig.contact.timingHours}</p>
                </div>
              </div>

              <div className="p-5 rounded-panel bg-ivory border border-green/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green/10 text-green flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold-text" />
                </div>
                <div>
                  <span className="font-sans text-xs uppercase font-semibold text-gold-text tracking-wider block">
                    Address
                  </span>
                  <p className="font-sans text-sm font-medium text-green">{siteConfig.address.fullAddress}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Alternative */}
            <div className="p-6 rounded-panel bg-ivory border border-gold/40 space-y-3">
              <span className="font-sans text-xs uppercase font-semibold tracking-widest text-gold-text block">
                Prefer WhatsApp?
              </span>
              <p className="font-sans text-sm text-green-soft">
                Message our team directly on WhatsApp with your preferred date.
              </p>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-pill bg-green text-ivory font-sans text-xs font-semibold uppercase tracking-wider hover:bg-green-soft transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-gold" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Desktop Green Form Panel */}
          <div className="lg:col-span-7">
            <EnquiryForm
              initialDate={initialDate}
              initialGuests={initialGuests}
              initialEventType={initialEventType}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
