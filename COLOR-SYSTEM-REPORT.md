# Crestpane colour system v5: implementation report

Everything below was verified in a real browser (Chromium) against the 52 generated pages, in light and dark, at 1440 px and 390 px.
Source of truth: tokens at the top of `_generator/css.py`. Rebuild with `python3 build.py` inside `_generator`.

## What was implemented

| Spec section | Result |
|---|---|
| 1 Announcement bar | #0B0B0D, text #FAF7F3, link #FFB48A (hover #F36B21), separator #29292E |
| 2 Header + nav | Ivory at 90%, nav #0B0B0D, hover #F36B21, active #E0540A, primary button #F36B21 with #0B0B0D text (it was black before), submenu white / #E9DFD6 / hover #F8EEE8 |
| 3 Hero | Flat #FBEDE2, H1 #0B0B0D, accent #E0540A, lead #4F4C53, label #6A676E, outline button #0B0B0D |
| 4 Portfolio | Ivory section, white cards, #E9DFD6 border, #F8EEE8 hover, category #E0540A, desc #6A676E, black "view" button with ivory icon. The old one-off dark featured card was removed to follow the "white cards" spec |
| 5 Services | Cream section, white cards, #FCE6DC icon frame with #F36B21 icon, desc #77747A, links #B0430A, hover #FFF9F5 |
| 6 Design that does its job | #0B0B0D, #17191B cards, #2A2C30 lines, #FF8A4D accents and numbers, #C9C6CC text |
| 7 Industries | Ivory, white cards, first card featured in #FCE6DC, #E0540A numbers, #F8EEE8 hover |
| 8 Process | #FCE6DC, ivory step cards, #F36B21 numbers with #0B0B0D text, #E8BBA6 connectors |
| 9 Second dark section | Same black system as 6 |
| 10 How the work comes together | Ivory, white cards, #E9DFD6 lines, #77747A text |
| 11 Pricing | Cream, white cards, featured card #0B0B0D with #FF8A4D price, black buttons with white text, featured button #F36B21 |
| 12 Insights | Ivory, white article cards, #E0540A category, #77747A date and text, #E9DFD6 divider, #B0430A link, #F8EEE8 hover, no image filter |
| 13 FAQ | Cream, white question cards, #FFF9F5 when open, #F36B21 icon, #6A676E answers |
| 14 Final CTA | Full black section, #FF8A4D accent word, charcoal ornament, 12% orange glow. The old solid orange circle was removed |
| 15 Footer | Flat #0B0B0D, headings #FAF7F3, links #C9C6CC (hover #FF8A4D), copyright #77747A, legal links #9C99A1, #2A2C30 divider |
| Internal pages | All 13 page types checked against your hero / section / accent table: 13 of 13 match |
| Forms | Input white, focus border #F36B21, error #FFF0EF / #B42318, success #EDF8F0 / #187A43, disabled #E9DFD6 / #77747A, hover #FF7D3A on the primary button. Triggered the real error state and measured it |
| Dark mode | Own token set: #0D0D0F / #131316 / #181513, cards #1B1B1F, borders #35353A, hover #222226, inputs #18181C. Measured in the browser |

Homepage order is now ivory, cream, black, ivory, peach, black, ivory, cream, ivory, cream, black, which gives the rhythm the spec describes.

## Cleanup
- Removed every gradient background (section washes, dot textures, hero wash, footer glow, pricing featured card, progress bar).
- Removed the off-palette orange and black scales (`--o-50..700`, `--k-0..4`) and about 40 hard-coded hex values; all now resolve to tokens.
- Removed three duplicated header backgrounds and two duplicated dark-mode overrides.
- Fixed an existing bug: the active nav link was output as `aria-current=page"` (stray quote), so it was never a valid attribute.

## QA performed
- 52 pages x light/dark x 1440/390: 0 JavaScript errors, 0 horizontal overflow.
- Computed colours read back from the browser for every homepage section in both themes and compared with the spec.
- Screenshot review of the homepage (light and dark) and 9 internal pages (light, dark, mobile).
- Automated text-contrast scan (WCAG AA) on every text element.
- Not done: no real-device testing, no screen-reader pass, and tablet width was reviewed only through the layout rules (no 768 px screenshots).

## Remaining issues (please read)

**1. Contrast: spec colours that fail WCAG AA 4.5:1 for small text.** I kept your exact values as requested. Each is a one-line token change if you want them fixed.

| Where | Colour pair | Ratio |
|---|---|---|
| Project/blog category labels, service numbers (12-14 px) | #E0540A on white | 3.86 |
| Active nav item (15 px) | #E0540A on ivory | 3.61 |
| Nav hover text | #F36B21 on ivory | 2.83 (hover only) |
| Featured industry card description | #77747A on #FCE6DC | 3.83 |
| Footer copyright | #77747A on #0B0B0D | 4.27 |
| Large accent words in headlines | #E0540A on #FBEDE2 | 3.37, passes the 3:1 large-text rule |

Using #B0430A (5.75:1 on white) for the first two rows would fix them without leaving your palette.

**2. Values I had to choose because the spec was silent or ambiguous**
- Dark-mode black sections use #09090A (a deeper step of the brand black), so they stay distinct from the #0D0D0F page background. Dark-mode error and success tints are also my derivations.
- Input border uses #E9DFD6; I read "#0B0B0D" in your form table as the text colour.
- Per-page "accent" colour drives the eyebrow rule and list markers. Buttons stay #F36B21 everywhere, and accent words stay #E0540A, as in the homepage spec.
- Pages not in your table (Industries, legal pages) use the Services palette.

**3. Not controllable from CSS**
- The hero ribbon and device mockup use raster and illustration colours (`hero-ribbon.webp`, the `.dm-*` device frame greys). They sit in the hero and were left as they are.
- Project screenshots keep their own client colours.


## Follow-up accessibility refinements (v6)
- Small accent text in navigation and project/article category labels now uses the deeper brand accent token.
- The featured industry card description now uses the stronger semantic text token.
- Footer legal/copyright text now uses the lighter muted token.
- A global reduced-motion fallback now disables non-essential transitions and animations.
- These are CSS-level refinements; a fresh automated browser contrast scan is still required before claiming full WCAG AA conformance.
