DESIGN SYSTEM (non-negotiable; build these as design tokens in tailwind.config + CSS variables, and use only the tokens)

BRAND
Heritage Lawns & Banquets feels like a quiet, old-money garden estate: calm, confident, tactile. Editorial like a printed invitation suite, never like SaaS. Pick DEEP GREEN as the single dark colour. No maroon.

COLOUR ROLES
- --ivory       #FAF6EE  page surface
- --ivory-deep  #F1EADB  alternate surface bands, input fills
- --green       #14342B  primary dark: text, dark sections, primary buttons
- --green-soft  #2E4A41  secondary text on ivory (6.5:1+)
- --gold        #B38B3F  DECORATIVE ONLY: 1px lines, icons, arch outlines, bullets, large display text (48px+), and text on green at 24px+. Never small text on ivory (it is ~2.9:1).
- --gold-text   #7A5C1E  gold for small text/links/labels on ivory (5.7:1)
- --error       #9B2C2C  errors (7:1 on ivory); always paired with an icon and text, never colour alone
- --success     #1F5A3A  success states
- No other colours. No gradients, glass, neon, or coloured shadows. Imagery overlays use flat green at 35 to 55% opacity.
- Verify every text/background pair at 4.5:1 (3:1 only for 24px+ text) and list the pairs in a /docs/contrast.md file.

SURFACE RHYTHM (top to bottom)
Hero: full-bleed image with green overlay. Spaces: ivory. Helper: ivory-deep. Events: green (ivory text, gold lines). Gallery: ivory. Included: ivory-deep. Process: ivory. Location: green. FAQ: ivory. Enquiry: ivory-deep with a green form panel on desktop. Footer: green. Never two adjacent sections with the same surface.

TYPOGRAPHY
- Display: Cormorant Garamond (500/600), via next/font. Text: DM Sans (400/500/600). Nothing else.
- Fluid scale with clamp():
  Hero H1: 44px mobile to 96px desktop, line-height 1.02, tracking -0.01em
  H2 (section): 36px to 64px, line-height 1.05
  H3: 24px to 36px, line-height 1.15
  Lead paragraph: 18px to 20px, line-height 1.6
  Body: 16px to 18px, line-height 1.65, max-width 62ch
  Label/eyebrow: 12px to 13px, uppercase, tracking 0.16em, weight 600, --gold-text on ivory
- Italic Cormorant is allowed for one emphasised word per heading.
- Numerals in capacities use tabular figures.

SPACING AND GRID
- 8px base unit. Spacing tokens: 8, 16, 24, 32, 48, 64, 96, 128, 160.
- Container: max 1320px, side padding 20px mobile / 40px tablet / 64px desktop.
- 12-column grid desktop, 8 tablet, 4 mobile, 24px gutter. Asymmetry must snap to this grid (for example 7/5, 5/7, 4/8 splits, with one element deliberately breaking the container by up to 1 column).
- Section vertical padding: 96px mobile / 160px desktop.

SHAPE, LINE, DEPTH
- Lines: 1px, gold at 100% on dark, gold at 60% on ivory (decorative only).
- Radii: arch mask (full top radius, flat bottom) for hero-supporting and space images; 24px for panels; 999px for pills and buttons; 4px for inputs; images in gallery 12px. Do not mix other radii.
- Shadow: one soft shadow only: 0 24px 48px -24px rgba(20,52,43,0.25). Nothing else.
- Corner ornaments: a thin 1px gold double-line frame offset 12px behind featured arch images.

IMAGERY (placeholders must look intentional)
- Use a /data/images.ts map so real photos swap in by changing one path.
- Placeholders: tonal SVG scenes (arches, lawn rows, chandeliers, marquee silhouettes) drawn in green/ivory/gold flats at consistent aspect ratios. Each carries descriptive alt text and a small "Concept placeholder" caption in label style.
- Aspect ratios: hero 16:9 (mobile 4:5), space arches 4:5, gallery tiles 3:4 / 4:3 / 1:1 mix, event reveal 3:4.
- Same tonal treatment on all images (flat green overlay or duotone green/ivory) so they feel like one set.

ICONS
Lucide, stroke 1.5px, 24px, green or gold per the colour rules. No filled or mixed icon sets.

COMPONENT SPECS
- Primary button: green fill, ivory text, 999px radius, 56px height desktop / 52px mobile, 32px horizontal padding, label 15px weight 600. Hover: gold 1px inner ring and 2px lift. Pressed: scale 0.98. On dark sections: ivory fill, green text.
- Secondary button: transparent, 1px green border, green text. Hover: fills green, text ivory.
- Text link: --gold-text, 1px underline offset 4px, underline thickens on hover.
- Inputs: 56px height, --ivory-deep fill, 1px green-soft border, 4px radius, 16px text (never smaller, to avoid iOS zoom), floating or top-aligned label always visible (never placeholder-only labels).
  Focus: 2px --green outline plus 4px ivory gap ring, never removed.
  Error: 1px --error border, error icon, message in --error under the field with aria-describedby and aria-live="polite".
  Disabled: 50% opacity plus not-allowed cursor and a text reason where relevant.
- Focus ring (global): 2px solid --green with 3px offset on light, 2px solid ivory on dark. Visible on every interactive element.
- Date picker: popover with 24px radius, shadow token, Monday or Sunday start configurable. Day cells 44px minimum. States: default, hover (ivory-deep), today (gold 1px ring), selected (green fill, ivory text), range middle (green at 12%), unavailable (strikethrough plus tooltip "Not available", never colour alone), disabled past dates. Support single date by default with an optional multi-day mode.
- Guest slider: 44px thumb, green track with gold thumb ring, value label with aria-valuetext ("120 guests"), keyboard step 10, live region announcing the suggested space.
- Accordion: 1px bottom lines, plus/minus icon rotating 45 degrees, 24px vertical padding, full-row 56px+ hit area, aria-expanded.
- Chips/pills (AC, Open-air, Parking): 32px height, 1px gold border, label style, no fill.
- Cards: avoided by default. Prefer ruled lists and open layouts. Where a panel is needed, use 24px radius, ivory-deep fill, shadow token.
- Toasts and success state: --success with a check icon, short copy, focus moved to the message.

NAVBAR
Height 80px desktop / 64px mobile. Transparent with ivory text over hero; on scroll becomes ivory with green text and a 1px bottom line, hides on scroll down and returns on scroll up. Logo: wordmark in Cormorant plus a small arch glyph in SVG. Active link: 1px gold underline. Mobile menu: full-screen green, 40px display-serif links, staggered reveal, close button 48px.

MOBILE BAR
Sticky bottom bar, 64px plus safe-area inset, ivory with a 1px top line, three equal 48px+ targets (Call, WhatsApp, Check Date), icon plus label 12px. Hidden while the keyboard or lightbox is open.

CURSOR RULES
Custom cursor is desktop and fine-pointer only (@media (hover:hover) and (pointer:fine)). It must never replace the native cursor on inputs, textareas, selects, the nav, or selectable text. 12px ring, grows to 72px with a label (View / Open / Drag), mix-blend disabled, plain flat colours.

STATES AND CONTENT RULES
- Every interactive element defines default, hover, focus-visible, active, disabled.
- Empty states (testimonials hidden, no images) are designed, not blank.
- Copy: short, warm, plain English. No exclamation marks, no filler superlatives ("world-class", "unforgettable"), no invented statistics.
- Minimum touch target 44px; no horizontal overflow at 320px.

DESIGN QA (report each as pass/fail with evidence, and mark anything not actually run as UNVERIFIED)
1. Contrast table matches /docs/contrast.md.
2. Only token colours, radii, shadows and fonts appear in the CSS (grep for stray hex and px radii).
3. Type scale matches at 390, 768, 1280, 1440.
4. Each section's surface differs from its neighbours.
5. Focus ring is visible on every interactive element via keyboard walkthrough.
6. Reduced-motion mode shows all content with no transforms.
7. No hover-only functionality on touch.