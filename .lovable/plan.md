

# Language Society & Cultural Hub — Digital Experience

## Overview
A breathtaking, heavily animated 9-page website for "Language Society and Cultural Hub" — a language learning platform, cultural exchange space, and NGO founded by Iqra Siraj in Pakistan. Light, warm, editorial luxury theme with rich animations powered by Framer Motion.

## Design System
- **Theme**: Cream whites, warm ivories, deep charcoal text with jewel-tone accents per language (cobalt for French, emerald for Arabic, golden amber for Urdu, crimson for German, deep navy for English)
- **Typography**: Playfair Display (headings), DM Sans (body), Cormorant Garamond italic (accents)
- **Animations**: Framer Motion throughout — page transitions, scroll reveals, parallax, magnetic hover, character-stagger text, floating elements, counter animations, custom cursor, frosted glass navbar

## Pages

### 1. Home (`/`)
- Full-viewport hero with floating language glyphs, orbiting flag emojis, character-stagger headline ("Learn Languages. Explore Cultures. Empower Lives."), and dual CTAs
- Stats bar with animated counters (5 Languages, 4 Levels, Online Classes, Global Community)
- Language programs preview — 5-card grid with accent colors per language
- About teaser with editorial pull-quote and animated divider
- Empowering Nation teaser with uploaded charity photo and parallax
- Blog teaser with placeholder cards
- Full footer with brand, links, programs, social

### 2. About Us (`/about`)
- Decorative oversized "About" text behind heading
- Mission & Vision cards with animated icons
- Founder section: professional headshot (uploaded image), bio, and editorial letter
- Cultural Hub description with floating globe

### 3. Courses (`/courses`)
- Language programs as expandable accordion cards, each in its accent color
- Animated level pills (A1→B2) per language
- Enroll CTA per language + bottom registration CTA

### 4. Events & Workshops (`/events`)
- Timeline for past events, card grid for upcoming
- "Coming Soon" placeholders with animated pulsing borders
- Event cards with date badges and category tags

### 5. Blog & Articles (`/blog`)
- Magazine-style grid: featured post full-width, 3-column below
- Category filter pills (Language Tips, Cultural Stories, Education, Global Perspectives)
- "Contribute Your Story" CTA section

### 6. Gallery (`/gallery`)
- Masonry photo grid with hover zoom and lightbox
- Tab filters: All, Empowering Nation, Events, Classes
- Seeded with 2 uploaded photos in Empowering Nation tab
- Placeholder cards for "more coming soon"

### 7. Empowering Nation (`/empowering-nation`)
- Warm amber hero with floating light particles and large animated heading
- NGO mission description — education fee support through donations
- Impact section with both uploaded photos in styled frames with parallax
- 3-step visual flow: Donate → Identify Students → Education Unlocked
- Prominent donate CTA with heart pulse animation

### 8. Contact Us (`/contact`)
- Two-column: contact info + Facebook link (left), animated form (right)
- Floating label inputs for Name, Email, Subject, Message
- Decorative world map SVG background

### 9. Registration (`/register`)
- 3-step animated form with smooth progress bar
- Step 1: Personal Info → Step 2: Course Selection → Step 3: Confirmation
- Slide transitions between steps
- Confetti burst on final submission

## Shared Components
- **Navbar**: Sticky, frosted glass on scroll, animated logo with rotating globe SVG, nav links with sliding underlines, gold "Enroll Now" pill button, Facebook icon, mobile full-screen overlay menu
- **Footer**: 4-column layout, Facebook link, animated gradient top border
- **Custom Cursor**: Small circle that grows/changes color on hover targets
- **Page Transition Wrapper**: Fade + vertical slide between routes

## Assets
- 3 uploaded images embedded: founder headshot, charity distribution photo, school visit photo
- Google Fonts loaded via CSS @import
- react-icons for Facebook icon
- Framer Motion for all animations

