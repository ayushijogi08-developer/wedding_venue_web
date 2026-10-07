import { z } from 'zod';

export const enquirySchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  phone: z.string().min(7, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  eventType: z.string().min(1, { message: 'Please select an event type.' }),
  eventDate: z.string().min(1, { message: 'Please select a preferred event date.' }),
  expectedGuests: z.number().min(10, { message: 'Expected guests must be at least 10.' }),
  spaceInterest: z.string().min(1, { message: 'Please select a space interest.' }),
  message: z.string().optional(),
  honeypot: z.string().optional(), // Must be empty
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
