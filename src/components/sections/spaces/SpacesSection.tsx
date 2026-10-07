import React from 'react';
import { spacesData } from '@/data/spaces';
import { SpaceCard } from './SpaceCard';
import { SectionHeader } from '@/components/common/SectionHeader';

export const SpacesSection: React.FC = () => {
  return (
    <section id="spaces" className="surface-ivory py-24 md:py-36 border-t border-green/10">
      <div className="max-w-container mx-auto px-5 md:px-10 lg:px-16 space-y-16">
        <SectionHeader
          eyebrow="Architectural Settings"
          heading="Four Distinct Spaces for Your Celebration"
          paragraph="From expansive manicured lawns under historic oak canopy to climate-controlled banquet archways, discover space tailored to your event layout."
        />

        {/* Alternating Spaces List */}
        <div className="space-y-8">
          {spacesData.map((space, index) => (
            <SpaceCard key={space.id} space={space} isReversed={index % 2 === 1} priority={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
