'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { SpacesSection } from '@/components/sections/spaces/SpacesSection';
import { SpaceHelperSection } from '@/components/sections/helper/SpaceHelperSection';
import { EventsSection } from '@/components/sections/events/EventsSection';
import { GallerySection } from '@/components/sections/gallery/GallerySection';
import { IncludedSection } from '@/components/sections/included/IncludedSection';
import { ProcessSection } from '@/components/sections/process/ProcessSection';
import { LocationSection } from '@/components/sections/location/LocationSection';
import { FaqSection } from '@/components/sections/faq/FaqSection';
import { EnquirySection } from '@/components/sections/enquiry/EnquirySection';
import { TestimonialsSection } from '@/components/sections/testimonials/TestimonialsSection';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGuests, setSelectedGuests] = useState(250);
  const [selectedEventType, setSelectedEventType] = useState('wedding');

  const handleQuickCheckDate = (date: string, guests: number) => {
    setSelectedDate(date);
    setSelectedGuests(guests);
  };

  const handleSelectEventType = (eventType: string) => {
    setSelectedEventType(eventType);
  };

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section (Green surface overlay) */}
      <HeroSection />

      {/* 2. Spaces Section (Ivory surface) */}
      <SpacesSection />

      {/* 3. Helper Section (Ivory-Deep surface) */}
      <SpaceHelperSection />

      {/* 4. Events Section (Green surface) */}
      <EventsSection onSelectEventType={handleSelectEventType} />

      {/* 5. Gallery Section (Ivory surface) */}
      <GallerySection />

      {/* 6. What's Included Section (Ivory-Deep surface) */}
      <IncludedSection />

      {/* 7. Process Section (Ivory surface) */}
      <ProcessSection />

      {/* 8. Location Section (Green surface) */}
      <LocationSection />

      {/* 9. FAQ Section (Ivory surface) */}
      <FaqSection />

      {/* 10. Enquiry Section (Ivory-Deep surface with Green Form Panel) */}
      <EnquirySection
        initialDate={selectedDate}
        initialGuests={selectedGuests}
        initialEventType={selectedEventType}
      />

      {/* Testimonials (Empty shell component, hidden by default) */}
      <TestimonialsSection />
    </div>
  );
}
