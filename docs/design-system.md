# HARIT Design System

## Brand Identity

HARIT (India's Green Mission) is inspired by a sculpted 3D logo featuring nature, birds, trees, a house, and Indian tricolour-inspired motifs.

## Color Palette

### Primary Colors
- **Forest Green** (`#1a4d2e`) - Deep, natural background
- **Forest Green Dark** (`#0f2d1a`) - Darker accents
- **Emerald** (`#2ecc71`) - Vibrant primary accent
- **Emerald Light** (`#58d68d`) - Lighter emerald shades
- **Leaf Green** (`#27ae60`) - Organic green tones
- **Leaf Green Light** (`#52be80`) - Lighter leaf shades

### Accent Colors
- **Golden Yellow** (`#f1c40f`) - Premium accent
- **Golden Yellow Light** (`#f4d03f`) - Lighter gold
- **Warm Ivory** (`#fef9e7`) - Primary text on dark backgrounds
- **Warm Ivory Dark** (`#f9e79f`) - Secondary text
- **River Blue** (`#3498db`) - Water accents
- **River Blue Light** (`#5dade2`) - Lighter blue
- **River Blue Dark** (`#2980b9`) - Darker blue

### Usage Guidelines
- Forest Green: Primary backgrounds, hero sections
- Emerald: Primary CTAs, interactive elements
- Golden Yellow: Highlights, important accents
- Warm Ivory: Typography on dark backgrounds
- River Blue: Water-related elements, links

## Typography

### Font Families
- **Sans**: Inter, system-ui (body text, UI elements)
- **Serif**: Playfair Display, Georgia (headings, display text)
- **Mono**: Fira Code (code, technical content)

### Type Scale
- **XS**: 0.75rem (12px)
- **SM**: 0.875rem (14px)
- **Base**: 1rem (16px)
- **LG**: 1.125rem (18px)
- **XL**: 1.25rem (20px)
- **2XL**: 1.5rem (24px)
- **3XL**: 1.875rem (30px)
- **4XL**: 2.25rem (36px)
- **5XL**: 3rem (48px)
- **6XL**: 3.75rem (60px)

### Font Weights
- Light: 300
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

### Typography Guidelines
- Use serif fonts for headings (H1-H6)
- Use sans-serif for body text and UI elements
- Use mono fonts for code and technical content
- Maintain proper line heights for readability

## Spacing

### Spacing Scale
- **XS**: 0.25rem (4px)
- **SM**: 0.5rem (8px)
- **MD**: 1rem (16px)
- **LG**: 1.5rem (24px)
- **XL**: 2rem (32px)
- **2XL**: 3rem (48px)
- **3XL**: 4rem (64px)
- **4XL**: 6rem (96px)

### Spacing Guidelines
- Use 8px base grid (multiples of 0.5rem)
- Maintain consistent spacing throughout
- Use larger spacing for section breaks

## Shadows

### Shadow Scale
- **SM**: Subtle elevation (small components)
- **MD**: Medium elevation (cards, buttons)
- **LG**: Large elevation (modals, dropdowns)
- **XL**: Extra large elevation (popovers)
- **2XL**: Maximum elevation (highest z-index elements)
- **Nature**: Organic shadow with green tint
- **Gold**: Premium shadow with gold tint

### Shadow Guidelines
- Use nature shadows for organic, nature-themed elements
- Use gold shadows for premium, highlighted elements
- Maintain consistent elevation hierarchy

## Border Radius

### Radius Scale
- **SM**: 0.25rem (4px) - Small elements
- **MD**: 0.5rem (8px) - Default buttons, inputs
- **LG**: 0.75rem (12px) - Cards
- **XL**: 1rem (16px) - Large cards
- **2XL**: 1.5rem (24px) - Hero elements
- **Full**: 9999px - Pills, badges

## Transitions

### Transition Durations
- **Fast**: 150ms - Micro-interactions
- **Base**: 200ms - Standard interactions
- **Slow**: 300ms - Complex animations
- **Slower**: 500ms - Page transitions

### Transition Timing
- Use cubic-bezier(0.4, 0, 0.2, 1) for natural motion
- Maintain consistent transition speeds

## Visual Direction

### Design Principles
- **Premium & Organic**: High-quality, nature-inspired aesthetics
- **Dimensional**: Use shadows, gradients, and depth
- **Natural**: Avoid generic SaaS styling
- **Indian Elements**: Incorporate tricolour-inspired motifs
- **3D Elements**: Sculpted, dimensional feel

### Do's
- Use organic shapes and natural imagery
- Implement subtle animations and transitions
- Maintain premium, high-quality feel
- Use the brand colors consistently
- Create depth with shadows and layers

### Don'ts
- Avoid flat, generic designs
- Don't use arbitrary colors outside the palette
- Avoid harsh, jarring transitions
- Don't use generic stock imagery
- Avoid cluttered layouts

## Component Guidelines

### Buttons
- Primary: Emerald background, dark text
- Secondary: Transparent with border
- Use golden accents for CTAs
- Rounded corners (md-lg)

### Cards
- White background on green backgrounds
- Subtle shadows
- Rounded corners (lg-xl)
- Nature or gold shadows for emphasis

### Inputs
- Clean, minimal design
- Focus states with emerald borders
- Proper spacing and labels

## Accessibility

### Color Contrast
- Ensure WCAG AA compliance
- Minimum 4.5:1 contrast for normal text
- Minimum 3:1 contrast for large text

### Focus States
- Visible focus indicators
- Keyboard navigation support
- Screen reader compatibility

## Implementation

### CSS Variables
All design tokens are defined in `src/styles/tokens.css` and can be used as CSS custom properties:

```css
background: var(--color-forest-green);
color: var(--text-primary);
```

### Tailwind Classes
Design tokens are integrated into Tailwind config:

```jsx
<div className="bg-forest-green text-ivory">
  <h1 className="font-serif text-4xl">HARIT</h1>
</div>
```

### Utility Functions
Use the `cn()` utility from `@/lib/utils` for conditional class merging:

```jsx
import { cn } from '@/lib/utils';

<div className={cn('btn-primary', isActive && 'btn-active')} />
```
