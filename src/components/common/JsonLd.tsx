import React from 'react';
import { siteConfig } from '@/data/site';

export const JsonLd: React.FC = () => {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: siteConfig.venueName,
    description: siteConfig.seo.metaDescription,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    telephone: siteConfig.contact.phoneDisplay,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'US',
    },
    openingHours: siteConfig.contact.timingHours,
    isAccessibleForFree: false,
    maximumAttendeeCapacity: 1000,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
};
