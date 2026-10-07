import { IncludedService } from './types';

export const includedServicesData: IncludedService[] = [
  {
    id: 'inc-1',
    category: 'venue',
    title: '100% Uninterrupted Power Backup',
    description: 'Twin 125 kVA silent generator units supporting full AC, lighting, and sound.',
    isIncluded: true,
  },
  {
    id: 'inc-2',
    category: 'amenities',
    title: 'Complimentary Bridal Preparation Suite',
    description: 'Full-day access to air-conditioned suite with private washroom and vanity.',
    isIncluded: true,
  },
  {
    id: 'inc-3',
    category: 'amenities',
    title: 'On-Site Paved Guest Parking',
    description: 'Spacious parking bays for 250 cars with dedicated valet staging space.',
    isIncluded: true,
  },
  {
    id: 'inc-4',
    category: 'venue',
    title: 'Estate Security & Housekeeping Staff',
    description: '24/7 entry security officers and continuous common area maintenance team.',
    isIncluded: true,
  },
  {
    id: 'inc-5',
    category: 'catering',
    title: 'External Caterers Welcome',
    description: 'Bring your preferred catering team; access to commercial preparation kitchen.',
    isIncluded: false, // "Bring your own" policy note
  },
  {
    id: 'inc-6',
    category: 'decor',
    title: 'Flexible Decor Vendor Policy',
    description: 'Work with your chosen event stylist or select from our preferred vendor roster.',
    isIncluded: false, // "Bring your own" policy note
  },
];
