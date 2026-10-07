import { NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validations/enquiry';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod Validation
    const validationResult = enquirySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Honeypot check (Silent discard for bot spam)
    if (data.honeypot && data.honeypot.trim().length > 0) {
      // Return 200 success to trick bots without logging or dispatching
      return NextResponse.json({
        success: true,
        message: 'Enquiry received successfully.',
      });
    }

    // 3. Email Dispatcher (Resend vs Formspree vs Development Mock)
    const resendApiKey = process.env.RESEND_API_KEY;
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    if (resendApiKey) {
      // Resend API delivery
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Heritage Lawns Enquiries <onboarding@resend.dev>',
          to: process.env.RESEND_TO_EMAIL || 'admin@example.com',
          subject: `New Venue Enquiry: ${data.eventType} on ${data.eventDate}`,
          text: `New venue enquiry received for date ${data.eventDate}. Guests: ${data.expectedGuests}. Space: ${data.spaceInterest}.`,
        }),
      });

      if (!resendResponse.ok) {
        return NextResponse.json(
          { success: false, message: 'Failed to deliver email via Resend provider.' },
          { status: 500 }
        );
      }
    } else if (formspreeEndpoint) {
      // Formspree API delivery
      const formspreeResponse = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          eventType: data.eventType,
          eventDate: data.eventDate,
          expectedGuests: data.expectedGuests,
          spaceInterest: data.spaceInterest,
        }),
      });

      if (!formspreeResponse.ok) {
        return NextResponse.json(
          { success: false, message: 'Failed to deliver email via Formspree provider.' },
          { status: 500 }
        );
      }
    } else {
      // Mocked Success Mode (No keys configured) - Never log PII
      if (process.env.NODE_ENV !== 'production') {
        // Safe non-PII log for UI developer verification
        console.log(
          `[ENQUIRY MOCK SUCCESS] Non-PII Event Log: Type=${data.eventType}, Date=${data.eventDate}, Guests=${data.expectedGuests}`
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully. We will call you to confirm date availability.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error processing enquiry.' },
      { status: 500 }
    );
  }
}
