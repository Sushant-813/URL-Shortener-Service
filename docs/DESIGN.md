# DESIGN.md

# URL Shortener SaaS Dashboard

Version: 1.0

---

# 1. Vision

Create a premium SaaS dashboard for managing shortened URLs.

The application should feel:

• Fast
• Professional
• Developer-focused
• Enterprise-grade
• Minimal
• Precise
• Modern

Users should immediately understand that this is a productivity tool rather than a marketing website.

The experience should resemble premium software such as:

- Linear
- Vercel Dashboard
- GitHub
- Stripe Dashboard
- Raycast
- Notion

while maintaining its own identity.

---

# 2. Design Principles

## Minimal

No unnecessary decoration.

Every component must exist because it improves usability.

---

## Functional

Function before beauty.

Beautiful interfaces emerge from good structure.

---

## Consistent

Spacing

Typography

Buttons

Cards

Forms

Tables

must behave consistently across every page.

---

## Fast

Animations should feel responsive.

Never delay user interaction.

---

## Data First

This application is built around user data.

Statistics

Tables

Charts

Filters

should always be the visual focus.

---

# 3. Color System

## Canvas

Background

#010102

---

## Surface Levels

Surface 1

#0F1011

Surface 2

#141516

Surface 3

#18191A

Surface 4

#1D1E20

---

## Borders

Hairline

#23252A

Strong

#34343A

---

## Text

Primary

#F7F8F8

Secondary

#D0D6E0

Muted

#8A8F98

Disabled

#62666D

---

## Brand

Primary

#5E6AD2

Hover

#828FFF

Focus

#5E69D1

---

## Success

#27A644

Warning

#D9A441

Danger

#E5484D

Info

#4C8BF5

---

# 4. Typography

Primary Font

Geist Sans

Fallback

Inter

Fallback

system-ui

---

Display

56

48

40

---

Heading

32

28

24

---

Body

18

16

14

---

Caption

12

---

Code

JetBrains Mono

---

# 5. Spacing Scale

4

8

12

16

24

32

48

64

96

128

Never invent custom spacing.

---

# 6. Border Radius

4

6

8

12

16

24

9999

---

# 7. Shadows

Avoid heavy shadows.

Prefer surface hierarchy.

Only floating elements may use subtle shadows.

---

# 8. Layout Rules

Maximum Width

1440px

Content Width

1280px

Dashboard Padding

32px

Card Gap

24px

Section Gap

48px

---

# 9. Navigation

Desktop

Sidebar

Top Navigation

Content Area

Mobile

Top Navigation

Drawer Sidebar

Content

Sidebar Width

260px

Collapsed

80px

---

# 10. Dashboard

Dashboard contains

• Greeting

• Statistics Cards

• Recent URLs

• Quick Actions

• Activity

• Analytics Preview

Priority

Statistics

↓

Charts

↓

Tables

↓

Everything Else

---

# 11. URL Table

Columns

Original URL

Short URL

Clicks

Created

Expiration

Status

Actions

Supports

Search

Pagination

Sorting

Responsive Collapse

Hover

Selection

---

# 12. Cards

Cards use

Surface 1

12px Radius

Hairline Border

24px Padding

Cards should never float excessively.

---

# 13. Buttons

Primary

Brand Color

Secondary

Surface

Ghost

Transparent

Danger

Red

Loading

Spinner

Disabled

Reduced Opacity

---

# 14. Forms

Compact

Labels always visible

Validation below input

Never placeholder-only labels.

---

# 15. Analytics

Charts

Line

Bar

Pie

Area

Cards

Total URLs

Clicks

CTR

Active URLs

Filters

Date Range

Search

Export

---

# 16. Empty States

Every page must have

Illustration

Title

Explanation

Primary CTA

Never show blank pages.

---

# 17. Loading States

Skeleton Cards

Skeleton Tables

Skeleton Charts

Skeleton Forms

Avoid spinners whenever possible.

---

# 18. Toasts

Top Right

Auto dismiss

Success

Error

Info

Warning

---

# 19. Motion

Duration

150ms–250ms

Hover

Scale 1.02

Buttons

Background Transition

Cards

Border Transition

Sidebar

Smooth Width Transition

Respect prefers-reduced-motion.

---

# 20. Responsive

Desktop

1440+

Laptop

1280

Tablet

1024

Mobile

768

Small Mobile

480

No horizontal scrolling.

---

# 21. Accessibility

Keyboard Navigation

Focus Rings

ARIA Labels

High Contrast

44px Touch Targets

Semantic HTML

---

# 22. AI Generation Rules

Whenever generating UI:

✔ Reuse existing components

✔ Never duplicate layouts

✔ Prefer composition

✔ Mobile first

✔ Use Tailwind utilities

✔ Use CSS variables

✔ Follow spacing scale

✔ Follow typography scale

✔ Do not hardcode colors

✔ Do not hardcode spacing

✔ Accessibility required

✔ Components should remain reusable

---

# 23. Do Not

Do not use glassmorphism.

Do not use neumorphism.

Do not use rainbow gradients.

Do not over animate.

Do not use more than one accent color.

Do not create decorative elements without purpose.

---

# 24. Visual Inspiration

Primary Inspiration

Linear

Secondary

Vercel Dashboard

GitHub

Stripe Dashboard

Raycast

Notion

The application should feel premium, technical, and intentionally minimal.

Never imitate directly.

Build an original experience inspired by these products.

---

# 25. Goal

Every page should make the user think:

"This feels like software professionals use every day."

The UI should prioritize clarity, speed, and confidence over decoration.
