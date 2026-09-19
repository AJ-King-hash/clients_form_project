Markdown# Design System Prompt: Premium Dark Glassmorphism Marketing Quiz Platform (Arabic RTL)

You are a senior UI/UX engineer and front-end designer. Apply the exact visual language, spacing, motion, and decorative system described below to the existing project. Keep all current logic, structure, and functionality unchanged. Only restyle and decorate the UI to match this design system.

## 1. Overall Aesthetic
- Premium dark-mode marketing platform
- Heavy glassmorphism + soft gradients
- Clean, modern, high-end Arabic SaaS / diagnostic tool feel
- Calm, professional, and trustworthy (not playful or childish)
- Strong visual hierarchy with clear section differentiation by color

## 2. Direction & Typography
- Full RTL layout (`dir="rtl"`)
- Primary fonts: **Tajawal** + **Cairo** (Google Fonts)
  - Use weights: 400, 500, 600, 700, 800, 900
- Base font: `font-family: 'Tajawal', 'Cairo', sans-serif`
- Headings: bold to black (font-bold → font-black)
- Body text: medium weight, high readability
- Avoid system fonts

## 3. Color System
### Background
- Main page background:
  ```css
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);

Cards / panels: glass effectCSSbackground: rgba(30, 41, 59, 0.75);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.1);

Brand Accents (use consistently per section)

Section 1 (Content): Blue → Indigo → Purple
from-blue-600 via-indigo-600 to-purple-600

Section 2 (Visual): Purple → Pink → Rose
from-purple-600 via-pink-600 to-rose-600

Section 3 (SEO): Emerald → Teal → Cyan
from-emerald-600 via-teal-600 to-cyan-600

Section 4 (Web Dev): Amber → Orange → Amber
from-amber-600 via-orange-600 to-amber-700


Text Colors

Primary text: text-white / text-slate-100
Secondary: text-slate-300
Muted: text-slate-400 / text-slate-500
Success / positive: emerald
Warning: amber
Critical: rose
Info: blue

Status / Option Badges

🔴 Red: bg-rose-500/10 text-rose-400 border-rose-500/30
🟡 Yellow: bg-amber-500/10 text-amber-400 border-amber-500/30
🟢 Green: bg-emerald-500/10 text-emerald-400 border-emerald-500/30
🔵 Blue: bg-blue-500/10 text-blue-400 border-blue-500/30

4. Layout & Spacing

Container: centered, max-width ~7xl
Cards: rounded-3xl, generous padding (p-6 to p-8)
Consistent vertical rhythm: space-y-4 / space-y-6
Grid for main selection cards:
Mobile: 1 column
Tablet: 2 columns
Desktop: 2–4 columns

Modal: max-width max-w-2xl, max-height 92vh, centered with soft backdrop blur

5. Cards & Surfaces

Glass cards with subtle border and deep shadow
Hover state:
Slight lift (translateY(-2px))
Border color intensifies toward the section accent
Shadow grows softer and more colored

Header badges: small rounded pills with icon + text, low opacity background + matching border

6. Buttons

Primary CTA buttons:
Full-width or auto
Gradient background matching section
Rounded-xl or rounded-2xl
Soft colored shadow (shadow-lg shadow-{color}-500/30)
Hover: brighter gradient + stronger shadow + slight lift
Active: slight press down

Secondary / close buttons: dark slate background, subtle hover

7. Progress & Feedback

Thin progress bar (height 2px) with matching section gradient
Status dot: small pulsing circle
Score display: large gradient text (bg-clip-text text-transparent)
Diagnostic boxes: dark inner panels with colored left/top accent icons

8. Modal System

Backdrop: bg-slate-950/85 + backdrop-blur-md
Modal entrance: short fade + slight scale animation
Header: sticky-looking dark bar with close button
Smooth screen transitions between Intro → Questions → Lead Form → Final Report

9. Option Cards (Quiz Answers)

Full-width, right-aligned text
Soft dark background + border
Hover: border becomes accent color, background slightly lighter
Left (RTL visual) colored symbol badge
Clear visual feedback on selection

10. Icons

Use Font Awesome 6 (solid + brands)
Consistent sizing and color matching the section accent
Prefer icons that feel professional (pen-nib, eye, magnifying-glass, laptop-code, rocket, etc.)

11. Scrollbar & Micro-details

Custom thin scrollbar (dark track, slate thumb)
All interactive elements must have cursor-pointer and smooth transitions (duration-200–300)
Avoid harsh pure white or pure black; always use slate scale

12. Responsive Behavior

Mobile-first
Text sizes scale down gracefully on small screens
Buttons remain large enough for touch
Modal must scroll internally if content is long

13. Animation Principles

Subtle and fast only
Prefer transform and opacity
No heavy or distracting animations
Modal fade-in ~0.25s ease-out

14. Final Instruction
Restyle the entire interface (landing cards, modal, questions, lead form, results screen, buttons, progress, badges) to match this exact design language while preserving 100% of the existing business logic and Arabic content structure.
Do not invent new features. Only apply the visual system described above.
text