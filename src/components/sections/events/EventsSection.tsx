import React from 'react';
import { eventsData } from '@/data/events';
import { EventListItem } from './EventListItem';
import { SectionHeader } from '@/components/common/SectionHeader';

interface EventsSectionProps {
  onSelectEventType: (eventType: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onSelectEventType }) => {
  return (
    <section id="events" className="relative surface-green py-24 md:py-36 border-t border-gold/30">
      <div className="max-w-container mx-auto px-5 md:px-10 lg:px-16 space-y-12">
        <SectionHeader
          eyebrow="Celebration Horizons"
          heading="Events Hosted at the Estate"
          paragraph="Select your event type to preview spatial arrangements, staging capabilities, and custom layout setups."
          eyebrowColorClass="text-gold"
          headingColorClass="text-ivory"
          paragraphColorClass="text-ivory/80"
        />

        {/* Interactive List */}
        <div className="border-t border-ivory/15 relative">
          {eventsData.map((event, idx) => (
            <EventListItem key={event.id} index={idx} event={event} onSelectEventType={onSelectEventType} />
          ))}
        </div>
      </div>
    </section>
  );
};
