export interface VenueSpace {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  capacitySeated: number;
  capacityFloating: number;
  isAirConditioned: boolean;
  hasParking: boolean;
  hasBridalRoom: boolean;
  imageKey: string;
  aspectRatio: '4:5' | '16:9';
  featured: boolean;
}

export interface EventType {
  id: string;
  title: string;
  oneLiner: string;
  description: string;
  imageKey: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'catering' | 'decor' | 'logistics';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'spaces' | 'events' | 'decor' | 'lawns';
  aspectRatio: '3:4' | '4:3' | '1:1';
  imageKey: string;
  altText: string;
}

export interface IncludedService {
  id: string;
  category: 'venue' | 'catering' | 'decor' | 'amenities';
  title: string;
  description: string;
  isIncluded: boolean;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  tagline: string;
  description: string;
}

export interface SiteConfig {
  venueName: string;
  studioName: string;
  slogan: string;
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    zip: string;
    fullAddress: string;
  };
  contact: {
    phoneDisplay: string;
    phoneHref: string;
    whatsappDisplay: string;
    whatsappHref: string;
    email: string;
    timingHours: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    pinterest: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    noIndex: boolean;
  };
}

export interface ImageDefinition {
  key: string;
  title: string;
  alt: string;
  src?: string;
  mobileSrc?: string;
  svgType: 'hero_arch' | 'grand_lawn' | 'banquet_hall' | 'bridal_suite' | 'courtyard' | 'event_reception' | 'gallery_masonry';
  conceptPlaceholderText: string;
  objectPosition?: string;
}
