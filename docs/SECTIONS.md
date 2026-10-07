SECTIONS
1. Navbar: logo, Spaces, Events, Gallery, Plan Your Event, Contact, and a "Check Date" button. Transparent over the hero, solid on scroll, hide on scroll down. Mobile full-screen menu.
2. Hero: cinematic full-bleed image or video-style slideshow with a slow zoom, headline "Your Wedding Day, Beautifully Hosted." (or better), subline, buttons "Check Your Date" (primary) and "Explore Spaces" (secondary). A compact date + guest picker bar under the hero that scrolls to the enquiry form with values pre-filled.
3. Spaces: 3 to 4 spaces (e.g. Grand Banquet Hall, Open Lawn, Bridal Suite, Mini Hall). Each: photo gallery, capacity (seated and floating), AC or open-air, parking, short description. Layout: large alternating image and text with arched image masks.
4. "Which space fits?" helper: a guest-count slider that highlights the suitable space and shows seating capacity. No prices.
5. Events: wedding, engagement, reception, birthday, corporate. One line each. Present as an interactive horizontal list with image reveal on hover (tap on mobile).
6. Gallery: masonry or horizontal-scroll gallery with a keyboard-accessible lightbox (arrow keys, Esc, swipe), lazy loaded images.
7. What's included: a clean checklist of services (catering options, decor, rooms, parking, power backup, sound and lighting) plus "Bring your own" notes. Keep wording simple.
8. How it works: 4 steps: Enquire, Site Visit, Confirm, Event Day. Scroll-driven line.
9. Location: map embed placeholder, address, timings, directions button, WhatsApp and call buttons.
10. FAQ: advance payment, outside caterers, decor rules, timings, parking. Spring accordion.
11. Enquiry (final section): form with name, phone, event type, date, expected guests, space interest, message. Validation, success state that says what happens next ("We will call you to confirm the date"), and WhatsApp as an alternative. Honeypot field; the /api/enquiry route validates server-side and delivers via Resend or Formspree (configurable in env), never logs personal data.
12. Footer: nav, contact, socials (placeholders), concept note.

MOTION (different pattern per section; transform, opacity, clip-path only; prefers-reduced-motion respected)
- Load: soft curtain reveal; hero slow zoom; headline masked line reveal.
- Spaces: image parallax inside arch masks, text slides in.
- Events: hover image reveal following the cursor with lerp.
- Gallery: horizontal pinned scroll on desktop, swipe on mobile; lightbox spring transitions.
- Process: line draws with scroll.
- Date picker: smooth calendar popover; selected range animates.
- Custom cursor on desktop only (View / Open / Drag); magnetic primary button only.
- Page transitions between routes.

MOBILE
Design mobile separately: sticky bottom bar (Call, WhatsApp, Check Date), no hover-only features, touch targets 44px+, no horizontal overflow.

QUALITY
- Semantic HTML, alt text, keyboard access, visible focus, next/image with proper sizing, fonts via next/font.
- Lighthouse mobile: Performance 90+, Accessibility 95+, SEO 95+.
- Run build and lint with zero errors, test 1440, 1280, 768, 390px, click every button and link, and report results.