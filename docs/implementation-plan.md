# HARIT Implementation Plan

## Project Status

**Current Phase**: Project Setup Complete ✅
**Next Phase**: UI Implementation (by Antigravity)

## Completed Setup Tasks

- [x] Initialize Vite + React + TypeScript project
- [x] Install all required dependencies
- [x] Configure Tailwind CSS v3
- [x] Configure absolute imports using `@/`
- [x] Set up React Router DOM
- [x] Create complete folder structure
- [x] Define design system CSS variables
- [x] Configure TypeScript in strict mode
- [x] Set up ESLint with oxlint
- [x] Create placeholder pages for all routes
- [x] Prepare public/images/ directory for logo
- [x] Create documentation files

## Technology Stack

### Core Framework
- **React 19.2.8** - UI library
- **Vite 8.3.0** - Build tool and dev server
- **TypeScript 6.0.2** - Type safety (strict mode enabled)

### Styling
- **Tailwind CSS 4.3.3** - Utility-first CSS framework
- **PostCSS 8.5.30** - CSS processing
- **Autoprefixer 10.6.1** - CSS vendor prefixing

### Routing
- **React Router DOM 7.18.4** - Client-side routing with lazy loading

### Animation
- **Framer Motion 14.3.0** - Animation library

### Icons
- **Lucide React 1.59.0** - Icon library

### Data Visualization
- **Recharts 3.10.1** - Chart library for dashboards

### State Management
- **Zustand 5.0.15** - Lightweight state management

### Utilities
- **clsx 2.1.1** - Conditional class names
- **tailwind-merge 3.7.0** - Tailwind class merging

### Linting
- **oxlint 1.81.0** - Fast linting tool

## Future UI Implementation (by Antigravity)

### Phase 1: Core Layout Components
- **Header/Navigation**
  - Logo placeholder (ready for official logo)
  - Navigation links (Home, About, Green Roofs, Farmer Market, Eco Store, etc.)
  - Mobile responsive menu
  - User authentication state display

- **Footer**
  - Navigation links
  - Social media links
  - Contact information
  - Copyright notice

### Phase 2: Page Implementations

#### Home Page
- Hero section with tagline
- Feature highlights
- Call-to-action sections
- Quick navigation to key sections

#### About Page
- Mission statement
- Vision and values
- Team section (mock data)
- History and timeline

#### Green Roofs Page
- Introduction to green roofs
- Benefits section
- Image gallery (mock data)
- Installation process steps
- Contact form for inquiries

#### Farmer Market Page
- Product listings (mock data)
- Filter and search functionality
- Product cards with images
- Farmer profiles (mock data)
- Cart functionality (local state)

#### Eco Store Page
- Eco-friendly products catalog
- Product categories
- Product details pages
- Shopping cart (local state)
- Checkout flow (mock, no real payment)

#### Conservation Page
- Conservation projects
- Impact statistics (Recharts)
- Donation options (mock)
- Progress tracking
- Success stories

#### Education Page
- Educational articles (mock data)
- Video tutorials (mock)
- Resource downloads
- Quiz/assessment features
- Progress tracking

#### Campaigns Page
- Active campaigns list
- Campaign details
- Participation options
- Impact statistics
- Progress indicators

#### Contact Page
- Contact form
- Location information
- Social media links
- FAQ section

#### Authentication Pages
- Login form
- Registration form
- Password reset (mock)
- Form validation

#### Dashboards
- **Customer Dashboard**
  - Profile management
  - Order history
  - Donation history
  - Settings

- **Farmer Dashboard**
  - Product management
  - Sales analytics (Recharts)
  - Order management
  - Profile settings

- **Admin Dashboard**
  - User management
  - Product moderation
  - Campaign management
  - Analytics and reports (Recharts)

### Phase 3: Features

#### Customer Features
- Product browsing and filtering
- Shopping cart (local state)
- Order placement (mock)
- Profile management
- Donation tracking

#### Farmer Features
- Product listing
- Inventory management
- Order processing
- Sales analytics
- Communication tools

#### Admin Features
- User administration
- Content moderation
- Campaign management
- System analytics
- Report generation

#### Product Features
- Product catalog with categories
- Search and filter
- Product comparisons
- Reviews and ratings (mock)

#### Contribution Features
- Donation forms
- Recurring donations (mock)
- Impact tracking
- Donation history
- Tax receipt generation (mock)

### Phase 4: Data & State

#### Mock Data Structure
- Users (customers, farmers, admins)
- Products with categories
- Orders and transactions
- Campaigns and donations
- Educational content
- Conservation projects

#### State Management
- Global store with Zustand
- Local component state where appropriate
- Context providers for shared state
- Form state management

### Phase 5: UI Components

#### Base UI Components
- Button (primary, secondary, variants)
- Input (text, email, password, etc.)
- Card (various styles)
- Modal/Dialog
- Dropdown
- Tabs
- Accordion
- Badge
- Avatar
- Loading states
- Error boundaries

#### Layout Components
- Container
- Grid
- Flex layouts
- Section wrappers
- Spacing utilities

#### Specialized Components
- Product card
- Campaign card
- Donation progress bar
- Chart components (Recharts)
- Timeline
- Image gallery
- Table with sorting/filtering

### Phase 6: Animations & Interactions

#### Animations
- Page transitions (Framer Motion)
- Scroll animations
- Hover effects
- Loading animations
- Micro-interactions

#### Interactions
- Form validation
- Search with suggestions
- Filter updates
- Cart updates
- Real-time feedback

### Phase 7: Accessibility & Performance

#### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast compliance

#### Performance
- Code splitting (already configured with lazy loading)
- Image optimization
- Lazy loading components
- Memoization where needed
- Bundle size optimization

### Phase 8: Testing & Polish

#### Testing
- Component testing (to be determined)
- Integration testing (to be determined)
- End-to-end testing (to be determined)

#### Polish
- Responsive design verification
- Cross-browser testing
- Error handling
- Loading states
- Empty states
- 404 page

## Development Workflow

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Code Style
- TypeScript strict mode enabled
- Prettier (if added later)
- ESLint with oxlint
- Tailwind CSS for styling
- Absolute imports with `@/` alias

### Git Workflow
- Create feature branches from main
- Commit with clear messages
- Use semantic commit messages
- Pull requests for review

## Design System Integration

### Using Design Tokens

```tsx
// CSS custom properties
<div style={{ color: 'var(--text-primary)' }}>

// Tailwind classes
<div className="bg-forest-green text-ivory">

// Combined
<div className="bg-forest-green text-ivory shadow-nature">
```

### Component Examples

```tsx
import { cn } from '@/lib/utils';

// Button with variants
<button className={cn(
  'btn-primary',
  variant === 'secondary' && 'btn-secondary'
)}>
  Click me
</button>

// Card with design system
<div className="card shadow-nature">
  <h2 className="font-serif text-2xl text-ivory">Title</h2>
</div>
```

## Mock Data Guidelines

### Data Structure
- Place mock data in `/src/data/`
- Use TypeScript interfaces for type safety
- Keep data realistic but clearly marked as mock
- Use JSON or TypeScript files

### Example Structure

```typescript
// src/data/products.ts
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  farmer: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    category: 'vegetables',
    price: 50,
    image: '/images/products/tomatoes.jpg',
    farmer: 'farmer-1',
  },
  // ... more products
];
```

## 3D Integration (Conditional)

### When to Use Three.js
- Only add if specific 3D scenes are needed
- Examples: 3D logo display, product visualization
- Install only when required:
  ```bash
  npm install three @react-three/fiber @react-three/drei
  ```

### Implementation Approach
- Use React Three Fiber for React integration
- Keep 3D components isolated
- Provide fallbacks for performance
- Consider accessibility

## Deployment Considerations

### Build Optimization
- Code splitting is configured via React Router lazy loading
- Analyze bundle size during development
- Optimize images before deployment
- Consider CDN for static assets

### Environment Variables
- Add `.env` file for environment-specific config
- Use `VITE_` prefix for variables accessible in client code
- Never commit secrets to repository

## Notes for Antigravity

1. **Logo**: Place the official logo in `public/images/` and reference it as `/images/logo.svg` (or appropriate extension)
2. **Images**: Use placeholder images initially, replace with real assets later
3. **Mock Data**: All data should be mock/local for now - no API integration
4. **Authentication**: Mock authentication only - no real backend
5. **Payments**: Mock checkout flow only - no real payment processing
6. **Design System**: Follow the design system in `docs/design-system.md`
7. **Structure**: Maintain the folder structure outlined in `docs/project-structure.md`
8. **TypeScript**: Maintain strict mode and proper typing
9. **Performance**: Leverage the configured lazy loading and code splitting
10. **Responsive**: Ensure all components are mobile-responsive

## Timeline Estimates

*(These are rough estimates for Antigravity's reference)*

- Phase 1 (Layout): 1-2 weeks
- Phase 2 (Pages): 3-4 weeks
- Phase 3 (Features): 2-3 weeks
- Phase 4 (Data & State): 1-2 weeks
- Phase 5 (UI Components): 2-3 weeks
- Phase 6 (Animations): 1-2 weeks
- Phase 7 (Accessibility & Performance): 1 week
- Phase 8 (Testing & Polish): 1-2 weeks

**Total Estimated Time**: 12-19 weeks

## Next Steps

1. Verify the setup by running the development server
2. Review the design system documentation
3. Begin implementing Phase 1 (Core Layout Components)
4. Iterate through phases according to timeline
5. Regular testing and verification at each phase

## Support Resources

- **Design System**: `docs/design-system.md`
- **Project Structure**: `docs/project-structure.md`
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Router**: https://reactrouter.com/
- **Framer Motion**: https://www.framer.com/motion/
- **Recharts**: https://recharts.org/
- **Zustand**: https://zustand-demo.pmnd.rs/
- **Lucide Icons**: https://lucide.dev/icons/
