'use client';
import { REVEAL_VIEWPORT } from '@/lib/motion/viewport';


import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, MessageSquare, Send, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { DatePickerPopover } from './DatePickerPopover';
import { siteConfig } from '@/data/site';
import { EASE_CUSTOM, MOTION_TOKENS } from '@/lib/motion';

interface EnquiryFormProps {
  initialDate?: string;
  initialGuests?: number;
  initialEventType?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialDate = '',
  initialGuests = 250,
  initialEventType = 'wedding',
}) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState(initialEventType);
  const [eventDate, setEventDate] = useState(initialDate);
  const [expectedGuests, setExpectedGuests] = useState(initialGuests);
  const [spaceInterest, setSpaceInterest] = useState('grand-estate-lawn');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (initialDate) setEventDate(initialDate);
    if (initialGuests) setExpectedGuests(initialGuests);
    if (initialEventType) {
      const normalized = initialEventType.endsWith('s') && initialEventType !== 'sangeet'
        ? initialEventType.slice(0, -1)
        : initialEventType;
      setEventType(normalized);
    }
  }, [initialDate, initialGuests, initialEventType]);

  useEffect(() => {
    if (isSuccess && successHeadingRef.current) {
      successHeadingRef.current.focus();
    }
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError('');

    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required.';
    if (!eventDate) newErrors.eventDate = 'Please select a date.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          eventType,
          eventDate,
          expectedGuests: Number(expectedGuests),
          spaceInterest,
          message,
          honeypot,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        if (resData.errors) {
          const fieldErr: Record<string, string> = {};
          Object.keys(resData.errors).forEach((k) => {
            fieldErr[k] = resData.errors[k][0];
          });
          setErrors(fieldErr);
        } else {
          setSubmitError(resData.message || 'Submission failed. Please try again.');
        }
      } else {
        setIsSuccess(true);
      }
    } catch {
      setSubmitError('Network error. Please contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: isMobile ? 32 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: MOTION_TOKENS.duration.medium, ease: EASE_CUSTOM }}
        className="bg-ivory text-green p-8 md:p-12 rounded-panel border border-gold/40 shadow-soft text-center space-y-6"
      >
        {/* Clip-Path Reveal Check Icon */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { clipPath: 'inset(0% 0% 0% 0%)' }
              : { clipPath: 'inset(0% 100% 0% 0%)' }
          }
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: MOTION_TOKENS.duration.medium, delay: 0.15, ease: EASE_CUSTOM }}
          className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>

        <div className="space-y-3">
          <h3
            ref={successHeadingRef}
            tabIndex={-1}
            className="font-display text-3xl font-medium text-green focus:outline-none"
          >
            Enquiry Sent
          </h3>
          <p className="font-sans text-body text-green-soft max-w-md mx-auto leading-relaxed">
            We received your request for <strong className="text-green">{eventDate}</strong>. We will call you to confirm the date and arrange a private tour.
          </p>
        </div>

        <div className="pt-4 border-t border-green/10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={siteConfig.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 rounded-pill border border-green text-green font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-green hover:text-ivory transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-gold-text" />
            WhatsApp Us
          </a>
          <button
            onClick={() => {
              setIsSuccess(false);
              setFullName('');
              setMessage('');
            }}
            className="h-12 px-6 rounded-pill bg-ivory-deep text-green font-sans text-xs font-semibold uppercase tracking-wider hover:bg-green/10"
          >
            Send Another Enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  const getStaggerProps = (idx: number) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y: isMobile ? 32 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { ...REVEAL_VIEWPORT, amount: 0.15 },
    transition: {
      duration: MOTION_TOKENS.duration.medium,
      delay: idx * MOTION_TOKENS.stagger,
      ease: EASE_CUSTOM,
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-green text-ivory p-6 md:p-10 rounded-panel border border-gold/30 shadow-soft space-y-6 surface-green"
      noValidate
      aria-label="Date enquiry form"
    >
      <motion.div {...getStaggerProps(0)} className="border-b border-gold/30 pb-4">
        <h3 className="font-display text-2xl md:text-3xl font-medium text-ivory">
          Request a Date
        </h3>
        <p className="font-sans text-xs text-gold uppercase tracking-widest mt-1">
          We will call you to confirm the date.
        </p>
      </motion.div>

      {/* Honeypot Field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website-field">Leave blank</label>
        <input
          id="website-field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {submitError && (
        <div role="alert" className="p-4 rounded-input bg-error/20 border border-error text-ivory text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-error shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Contact Name & Phone */}
      <motion.div {...getStaggerProps(1)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          required
          placeholder="Eleanor Vance"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
        />
        <Input
          label="Phone Number"
          required
          type="tel"
          placeholder="+1 (555) 234-5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
        />
      </motion.div>

      {/* Email & Event Type */}
      <motion.div {...getStaggerProps(2)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          required
          type="email"
          placeholder="eleanor@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Select
          label="Event Type"
          required
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          options={[
            { value: 'wedding', label: 'Wedding Ceremony' },
            { value: 'reception', label: 'Evening Reception' },
            { value: 'engagement', label: 'Engagement Gathering' },
            { value: 'sangeet', label: 'Sangeet & Cocktail' },
            { value: 'milestone', label: 'Milestone Party' },
          ]}
        />
      </motion.div>

      {/* Date & Guest Count */}
      <motion.div {...getStaggerProps(3)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DatePickerPopover
          selectedDate={eventDate}
          onChange={setEventDate}
          label="Preferred Date"
          error={errors.eventDate}
        />

        <Input
          label="Expected Guests"
          required
          type="number"
          min={10}
          max={1000}
          value={expectedGuests}
          onChange={(e) => setExpectedGuests(Number(e.target.value))}
          error={errors.expectedGuests}
        />
      </motion.div>

      {/* Space Interest Select */}
      <motion.div {...getStaggerProps(4)}>
        <Select
          label="Preferred Space Interest"
          required
          value={spaceInterest}
          onChange={(e) => setSpaceInterest(e.target.value)}
          options={[
            { value: 'grand-estate-lawn', label: 'Grand Estate Lawn (650+ Guests)' },
            { value: 'archway-banquet-hall', label: 'The Archway Banquet Hall (400 Guests)' },
            { value: 'courtyard-pavilion', label: 'The Courtyard Pavilion (200 Guests)' },
            { value: 'bridal-sanctuary-suite', label: 'Bridal Sanctuary Suite' },
          ]}
        />
      </motion.div>

      {/* Message Textarea */}
      <motion.div {...getStaggerProps(5)}>
        <Textarea
          label="Questions or Notes (Optional)"
          placeholder="Share catering preferences or special requests..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
      </motion.div>

      {/* Submit CTA with Quick Press State */}
      <motion.div {...getStaggerProps(6)} className="pt-2">
        <motion.div whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}>
          <Button
            type="submit"
            variant="dark-primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full h-14 text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send className="w-4 h-4 text-gold-text" />
                Send Enquiry
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </form>
  );
};

