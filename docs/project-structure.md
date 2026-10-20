# HARIT Project Structure

## Overview

This document outlines the folder structure and organization of the HARIT frontend project.

## Directory Structure

```
harit/
├── public/                    # Static assets served directly
│   └── images/               # Images including logo
│       └── README.md        # Logo placement instructions
├── src/                      # Source code
│   ├── app/                  # Application-level components
│   │   ├── App.tsx          # Root app component with layout
│   │   └── router.tsx       # React Router configuration
│   ├── components/          # Reusable React components
│   │   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   │   ├── layout/         # Layout components (header, footer, sidebar)
│   │   └── common/         # Shared/common components
│   ├── layouts/            # Page layout wrappers
│   ├── pages/              # Page components (route-based)
│   │   ├── home/          # Home page
│   │   ├── about/         # About page
│   │   ├── green-roofs/   # Green Roofs page
│   │   ├── farmer-market/ # Farmer Market page
│   │   ├── eco-store/     # Eco Store page
│   │   ├── conservation/  # Conservation page
│   │   ├── education/     # Education page
│   │   ├── campaigns/     # Campaigns page
│   │   ├── contact/       # Contact page
│   │   ├── auth/          # Authentication pages
│   │   └── dashboards/    # Dashboard pages
│   ├── features/          # Feature-specific modules
│   │   ├── customer/     # Customer-related features
│   │   ├── farmer/       # Farmer-related features
│   │   ├── admin/        # Admin-related features
│   │   ├── products/     # Product-related features
│   │   └── contributions/ # Contribution-related features
│   ├── data/             # Mock data and data utilities
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries and helpers
│   │   └── utils.ts      # General utilities (cn function, etc.)
│   ├── store/            # Zustand state management
│   │   └── index.ts      # Global store configuration
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts      # Global type definitions
│   ├── styles/           # Global styles and design tokens
│   │   ├── globals.css   # Global CSS with Tailwind directives
│   │   └── tokens.css    # CSS custom properties (design tokens)
│   ├── assets/           # Asset imports (if needed)
│   ├── index.css         # Main CSS entry point
│   └── main.tsx          # Application entry point
├── docs/                 # Documentation
│   ├── design-system.md  # Design system documentation
│   ├── project-structure.md # This file
│   └── implementation-plan.md # Implementation roadmap
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # App-specific TypeScript config
├── tsconfig.node.json    # Node-specific TypeScript config
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── README.md             # Project README
```

## Directory Explanations

### `/public`
Static files that are served directly without processing. Ideal for images, fonts, and other assets that don't need bundling.

### `/src/app`
Application-level components and configuration:
- **App.tsx**: Root component with global layout structure
- **router.tsx**: React Router configuration with route definitions

### `/src/components`
Reusable React components organized by purpose:
- **ui/**: Base UI components (Button, Input, Card, etc.)
- **layout/**: Layout components (Header, Footer, Sidebar, etc.)
- **common/**: Shared components used across multiple pages

### `/src/layouts`
Page layout wrappers that provide consistent structure across different page types.

### `/src/pages`
Page components corresponding to application routes. Each page folder contains:
- `index.tsx`: Export for lazy loading
- `PageName.tsx`: Main page component

### `/src/features`
Feature-specific modules that group related functionality:
- **customer/**: Customer-facing features
- **farmer/**: Farmer-specific features
- **admin/**: Admin panel features
- **products/**: Product catalog and management
- **contributions/**: Donation and contribution features

### `/src/data`
Mock data files and data transformation utilities for frontend-only interactions.

### `/src/hooks`
Custom React hooks for reusable logic (e.g., `useAuth`, `useScroll`, etc.).

### `/src/lib`
Utility libraries and helper functions:
- **utils.ts**: General utilities including the `cn()` function for class merging

### `/src/store`
Zustand store configuration for global state management.

### `/src/types`
TypeScript type definitions used across the application.

### `/src/styles`
Global styles and design system:
- **globals.css**: Global CSS with Tailwind directives and custom component classes
- **tokens.css**: CSS custom properties defining the design system

### `/src/assets`
Asset imports (images, fonts, etc.) that need to be processed by the bundler.

### `/docs`
Project documentation including design system, structure, and implementation plans.

## File Naming Conventions

### Components
- PascalCase: `Button.tsx`, `Header.tsx`, `UserProfile.tsx`
- Index files for lazy loading: `index.tsx`

### Utilities
- camelCase: `utils.ts`, `formatDate.ts`, `apiClient.ts`

### Hooks
- camelCase with `use` prefix: `useAuth.ts`, `useScroll.ts`

### Types
- camelCase: `index.ts`, `userTypes.ts`

### Styles
- kebab-case: `globals.css`, `tokens.css`

## Import Patterns

### Absolute Imports
Use the `@/` alias for imports from the `src` directory:

```tsx
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store';
import { cn } from '@/lib/utils';
```

### Relative Imports
Use relative imports for files within the same directory:

```tsx
import { Header } from './Header';
import { Footer } from '../layout/Footer';
```

## Component Organization

### Component Structure
Each component should follow this structure:

```tsx
import { cn } from '@/lib/utils';

interface ComponentProps {
  // Props definition
}

export function Component({ prop }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### Feature-Based Organization
For complex features, organize files by feature rather than type:

```
features/
  farmer-market/
    components/
      ProductCard.tsx
      FilterBar.tsx
    hooks/
      useProducts.ts
      useFilters.ts
    types/
      product.ts
    index.ts
```

## Best Practices

1. **Keep it modular**: Each component should have a single responsibility
2. **Use absolute imports**: Leverage the `@/` alias for cleaner imports
3. **Organize by feature**: Group related files together
4. **Lazy load routes**: Use React Router's lazy loading for better performance
5. **Type everything**: Maintain strict TypeScript typing
6. **Document public APIs**: Add JSDoc comments for exported functions and components

## Adding New Pages

1. Create a new folder in `/src/pages/`
2. Add the main component file (e.g., `NewPage.tsx`)
3. Add an index file (`index.tsx`) for lazy loading
4. Add the route in `/src/app/router.tsx`

Example:
```tsx
// src/pages/new-page/index.tsx
export { NewPage as default } from './NewPage';

// src/app/router.tsx
{
  path: 'new-page',
  lazy: () => import('@/pages/new-page'),
}
```

## Adding New Components

1. Choose the appropriate folder (ui, layout, or common)
2. Create the component file with proper naming
3. Export the component
4. Use the `cn()` utility for conditional classes

Example:
```tsx
// src/components/ui/Button.tsx
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  return (
    <button className={cn('btn-base', variant === 'primary' && 'btn-primary')}>
      {children}
    </button>
  );
}
```
