---
trigger: always_on
---

# PROJECT RULES: Heritage Lawns & Banquets (concept site)

## 1. What this is
A portfolio design concept for my web studio. A FICTIONAL wedding hall and venue. Not a real business.
Read docs/DESIGN_SYSTEM.md and docs/SECTIONS.md before any UI work. Re-read them if unsure. Do not rely on memory of earlier chat.

## 2. Workflow (most important)
- Work in stages. Finish one stage, then STOP and wait for my approval.
- Stage 0 is always a plan: file structure, /data schema, component list. No code until I approve.
- Never start Phase 2 (admin, Prisma, auth) unless I explicitly say so.
- If a requirement is unclear or conflicts with another, ask once, briefly. Do not guess on brand or design decisions.
- Do not refactor or restyle approved work unless I ask.
- Commit-ready changes only: each stage should leave the project building.

## 3. Honesty rules
- Footer must say: "Concept design by [STUDIO NAME]. Not a real venue."
- Fictional name, address, phone, email (use example domains and 555-style numbers).
- No fake reviews, ratings, testimonials, awards, or "events hosted" numbers.
- Testimonials = an empty component, hidden by default, ready for real data.
- No real venue photos. Use only generated, licensed, or SVG placeholders, each labelled "Concept placeholder".
- Add noindex (meta + robots) until I say otherwise.

## 4. Stack
Next.js (App Router) + TypeScript (strict) + Tailwind + Framer Motion + Lenis.
Fonts via next/font only. Images via next/image with width/height or fill+sizes.
All copy and content lives in /data (typed, one file per domain: spaces, events, faq, gallery, site, images). No hard-coded content in components.
Server-side: metadata API, sitemap, robots, JSON-LD (EventVenue).

## 5. Design rules (summary; full detail in docs/DESIGN_SYSTEM.md)
- Use design tokens only. No stray hex values, px radii, shadows, or fonts in components.
- Palette: ivory, ivory-deep, deep green, green-soft, gold (decorative only), gold-text, error, success. No gradients, glassmorphism, neon, or coloured shadows.
- Fonts: Cormorant Garamond (display) + DM Sans (text). Nothing else.
- Icons: Lucide, 1.5px stroke only.
- Adjacent sections never share the same surface colour.
- Editorial, asymmetric layouts snapped to the 12-column grid. Prefer open layouts over card grids.

## 6. Accessibility (wins over everything else)
- Text contrast 4.5:1 minimum. Gold is never used for small text on ivory.
- Semantic HTML, landmarks, one h1, logical heading order.
- Every interactive element: visible focus, keyboard access, 44px minimum target.
- Form fields have visible labels, aria-describedby errors, aria-live messages.
- Lightbox: focus trap, Esc closes, arrow keys navigate, focus returns on close.
- Honour prefers-reduced-motion everywhere: content fully visible, no transforms.
- Never convey meaning by colour alone.

## 7. Performance and motion
- Animate only transform, opacity, clip-path.
- One smooth-scroll instance (Lenis), disabled under reduced motion.
- Lazy load below-the-fold images; priority only on the hero.
- Custom cursor: desktop, fine pointer only, never over inputs, nav, or selectable text.
- No hover-only functionality. Everything works by tap and keyboard.
- Mobile first: no horizontal overflow at 320px.
- Priority order when requirements conflict: accessibility, then performance, then motion.
- If a heavy effect hurts mobile performance, simplify it on mobile and tell me.

## 8. Forms and API
- /api/enquiry validates server-side (zod or similar), honeypot field, rate-limit-friendly.
- Delivery via Resend or Formspree, chosen by env vars.
- If no env keys are set, return a mocked success in development and say so in the UI log, not to the user.
- Never log personal data (name, phone, email, message). Provide .env.example.

## 9. Code quality
- No `any`, no unused code, no commented-out blocks, no console.log left behind.
- Small components, one responsibility each; folder per section.
- Lint and build must pass with zero errors and zero warnings before a stage is "done".

## 10. Reporting (honesty)
- Only report a check as passed if you actually ran it. Otherwise write UNVERIFIED.
- At the end of each stage report: what was built, what is placeholder, what was skipped, any deviations from the rules, and what you need from me.
- Do not claim Lighthouse scores, screenshots, or click-testing unless you actually produced them.

## 11. Definition of done (per stage)
[ ] Build and lint pass
[ ] Matches design tokens (no stray values)
[ ] Checked at 390, 768, 1280, 1440
[ ] Keyboard walkthrough done
[ ] Reduced-motion checked
[ ] Contrast pairs match docs/contrast.md
[ ] Report written with UNVERIFIED items flagged