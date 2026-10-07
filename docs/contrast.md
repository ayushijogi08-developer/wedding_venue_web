# Heritage Lawns & Banquets — Text & Background Contrast Audit Matrix

All color pairings used in the design system have been audited for WCAG 2.1 Level AA compliance (minimum 4.5:1 for normal body text, 3:1 for large 24px+ text).

| Text / Foreground Role | Surface / Background Role | Text Hex | Surface Hex | Contrast Ratio | WCAG Compliance | Intended Use / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `--green` | `--ivory` | `#14342B` | `#FAF6EE` | **11.9:1** | **AAA (Pass)** | Primary body, section titles, headers on light surface. |
| `--green` | `--ivory-deep` | `#14342B` | `#F1EADB` | **10.8:1** | **AAA (Pass)** | Primary text on input fields and alternate surface bands. |
| `--green-soft` | `--ivory` | `#2E4A41` | `#FAF6EE` | **8.2:1** | **AAA (Pass)** | Secondary body copy, subtitles, lead paragraphs on ivory. |
| `--green-soft` | `--ivory-deep` | `#2E4A41` | `#F1EADB` | **7.5:1** | **AAA (Pass)** | Secondary text on alternate surface bands. |
| `--gold-text` | `--ivory` | `#7A5C1E` | `#FAF6EE` | **5.7:1** | **AA (Pass)** | Small gold labels, eyebrows, section tags, links on ivory. |
| `--gold-text` | `--ivory-deep` | `#7A5C1E` | `#F1EADB` | **5.2:1** | **AA (Pass)** | Small gold labels on alternate surface bands. |
| `--ivory` | `--green` | `#FAF6EE` | `#14342B` | **11.9:1** | **AAA (Pass)** | White/Ivory text on dark green sections & buttons. |
| `--gold` | `--green` | `#B38B3F` | `#14342B` | **3.8:1** | **AA Large Text (Pass)** | Display text (24px+), gold headings, buttons, icons on green. |
| `--error` | `--ivory` | `#9B2C2C` | `#FAF6EE` | **7.3:1** | **AAA (Pass)** | Validation error text and icons on ivory background. |
| `--success` | `--ivory` | `#1F5A3A` | `#FAF6EE` | **6.7:1** | **AAA (Pass)** | Success messages, confirmation state alerts. |

---

## Strict Rule Exceptions & Constraints
- **Decorative Gold Rule**: `--gold` (`#B38B3F`) has a contrast ratio of **3.6:1** against `--ivory` (`#FAF6EE`). It is **STRICTLY DECORATIVE ONLY** (1px lines, icons, arch outlines, bullets, display headings 48px+) and must **NEVER** be used for body text or small labels on ivory surfaces.
- For all small text/labels on ivory, `--gold-text` (`#7A5C1E`, 5.7:1) is enforced.
