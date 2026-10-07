import { SiteConfig } from './types';

export const siteConfig: SiteConfig = {
  venueName: 'Heritage Lawns & Banquets',
  studioName: 'Apex Web Studio',
  slogan: 'Your Wedding Day, Beautifully Hosted.',
  address: {
    street: '100 Heritage Manor Drive',
    area: 'Garden Estate District',
    city: 'Metropolis',
    state: 'NY',
    zip: '10001',
    fullAddress: '100 Heritage Manor Drive, Metropolis, NY 10001',
  },
  contact: {
    phoneDisplay: '+1 (555) 234-5678',
    phoneHref: 'tel:+15552345678',
    whatsappDisplay: '+1 (555) 234-5679',
    whatsappHref: 'https://wa.me/15552345679',
    email: 'enquiries@example.com',
    timingHours: 'Mon - Sun: 9:00 AM - 7:00 PM EST',
  },
  socials: {
    instagram: 'https://example.com/instagram',
    facebook: 'https://example.com/facebook',
    pinterest: 'https://example.com/pinterest',
  },
  seo: {
    metaTitle: 'Heritage Lawns & Banquets | Concept Venue Portfolio',
    metaDescription: 'A fictional wedding venue concept design featuring grand outdoor lawns, climate-controlled banquet halls, and editorial event spaces.',
    noIndex: true,
  },
};
