## Design Goals
- Mirror homepage storytelling, motion, and polish using Tailwind + Framer Motion + GSAP + Lenis
- Maintain visual continuity: typography (`font-playfair`, `font-inter`), gradients, spacing rhythm, and micro‑interactions
- Elevate responsiveness, accessibility, and performance while reusing shared components

## Current State (About)
- Cinematic hero: `src/pages/About.jsx:236–288`
- Founders dual section with parallax: `src/pages/About.jsx:291–353`
- Origin story cards: `src/pages/About.jsx:355–379`
- Why we started icons: `src/pages/About.jsx:381–402`
- Mission impact (10,000): `src/pages/About.jsx:405–488`
- Final CTA: `src/pages/About.jsx:490–522`
- Local `FluidButton` duplicates shared component

## Reference (Homepage)
- Modular sections composed in `src/pages/Home.jsx:25–49`
- Animations and transitions aligned across `src/sections/home/*`
- Page transitions + smooth scroll from `MainLayout`

## Content Structure (Target)
1. Cinematic Hero with word‑reveal and subtle sparkles
2. Founders Dual: parallax images + alternating text blocks
3. Origin Story Timeline: numbered cards with staggered entrance
4. Why We Started Grid: icon cards with hover micro‑interactions
5. Mission Impact: big number, supporting features, animated background
6. Social Proof/Testimonials: reuse homepage sections for trust continuity
7. Final CTA with shared button and motion variants

## Technical Implementation
- Create `src/sections/about/*` components: `Hero.jsx`, `Founders.jsx`, `OriginStory.jsx`, `WhyGrid.jsx`, `Mission.jsx`, `CTA.jsx` (and optionally `SocialProof.jsx`, `Testimonials.jsx` reused)
- Refactor `src/pages/About.jsx` to import and compose these sections (match `Home.jsx` pattern)
- Adopt shared components: import `AnimatedText` and `FluidButton` from `src/components/*`
- Motion patterns: define consistent variants, use `initial/animate/exit`, `whileInView`, and stagger for lists; add GSAP `ScrollTrigger` for parallax in Founders
- Accessibility: semantic headings, descriptive `alt`, logical `h1→h2→h3`, focus-visible styles
- Performance: `loading="lazy"` on images, optimize shadows, avoid heavy random animations, ensure transforms over layout properties

## Milestones
- Phase 1: Scaffold sections and move existing content into `src/sections/about/*`
- Phase 2: Align animations with homepage (variants, stagger, parallax)
- Phase 3: Visual polish: gradients, spacing, micro‑interactions, button consistency
- Phase 4: A11y + performance pass (contrast, keyboard focus, lazy images)
- Phase 5: QA: responsive checks at common breakpoints; reuse SocialProof/Testimonials if desired

## Deliverables
- Updated `src/pages/About.jsx` composing modular sections
- New `src/sections/about/*` files following project conventions
- Reused shared components; no new libraries
- Verified animations and responsiveness consistent with homepage
