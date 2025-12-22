# Copilot Instructions for Eliza Abing Portfolio

## Project Overview
Next.js 15 portfolio website built with TypeScript, Tailwind CSS v4, and Radix UI components. This is a personal portfolio featuring projects, journal entries, and certificates with a modern, responsive design using a pastel pink color palette.

## Architecture

### Core Stack
- **Framework**: Next.js 15.5.9 with App Router
- **Styling**: Tailwind CSS v4.1.9 + PostCSS v4 with custom OKLCH color palette
- **UI Framework**: Radix UI (28+ component libraries + custom wrapper components in `components/ui/`)
- **Form Handling**: React Hook Form v7.60 + Zod v3.25 for validation
- **Fonts**: Geist Sans/Mono + Playfair Display (Google Font)

### File Structure
- `app/` - Next.js App Router pages (root layout, home page, journal section with subsections)
- `components/` - React components:
  - `components/ui/` - Radix UI wrapper components (pre-styled, ready to use)
  - `components/navigation.tsx` - Main navigation with scroll-detection for active section highlighting
  - `components/sparkle-cursor.tsx` - Decorative client-side cursor effect
- `lib/utils.ts` - Utility function `cn()` for merging Tailwind classes
- `hooks/` - Custom React hooks (mobile detection, toast notifications)
- `styles/` - Global CSS (empty, all styling via Tailwind + inline)

### Page Structure
- Home page (`app/page.tsx`) - "use client" component with projects carousel, about, contact form
- Journal section (`app/journal/page.tsx`) - Blog-style entries
- Nested journal pages (`app/journal/[slug]/page.tsx`) - Individual journal articles

## Key Patterns & Conventions

### Component Patterns
1. **Radix UI Wrapper Pattern**: All Radix UI components are pre-wrapped in `components/ui/`. Always import from `@/components/ui/` rather than directly from Radix.
   ```tsx
   // ✅ Correct
   import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
   
   // ❌ Wrong
   import { Dialog } from "@radix-ui/react-dialog"
   ```

2. **Client Components**: Mark interactive components with `"use client"` directive (state, events, hooks).

3. **Layout Pattern**: Root layout includes Navigation component within Suspense boundary, with Vercel Analytics.

### Styling Approach
- **Color System**: OKLCH color space in CSS custom properties (root theme in `app/globals.css`)
  - Primary palette: `--primary` (soft pastel pink #C9A8D1)
  - Supports light/dark modes with `:dark` custom variant
  - Never hardcode colors; use CSS variables
  
- **Tailwind Configuration**: Standard v4 with animation plugins (`tw-animate-css`)
- **Class Utilities**: Use `cn()` from `@/lib/utils.ts` to merge conflicting Tailwind classes
  ```tsx
  import { cn } from "@/lib/utils"
  const buttonClass = cn("px-4 py-2", isActive && "bg-primary")
  ```

### Navigation & Routing
- Anchor-based navigation with scroll detection in `components/navigation.tsx`
- Active section highlighting based on scroll position (100px offset)
- Social links (GitHub, Facebook, LinkedIn) hardcoded in navigation component
- Mobile menu toggle with hamburger icon

### Data Structure Example
Projects are defined as static objects in `app/page.tsx`:
```tsx
const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "...",
    images: [{ src: "/path.png", description: "..." }],
    tags: ["Tech1", "Tech2"],
    github: "url",
    demo: "url",
  },
]
```

## Development Workflow

### Commands
```bash
pnpm dev      # Start dev server (localhost:3000)
pnpm build    # Build for production
pnpm start    # Run production server
pnpm lint     # Run ESLint (configured to ignore during build)
```

### Build Configuration
- **Lint**: ESLint errors are ignored during builds (`ignoreDuringBuilds: true`)
- **TypeScript**: Build errors ignored (`ignoreBuildErrors: true`)
- **Images**: Unoptimized mode enabled (`unoptimized: true`)
- **Path Aliases**: `@/*` maps to workspace root

### Development Notes
- No image optimization (for portfolio images served from `/public/`)
- Strict TypeScript mode enabled in `tsconfig.json`
- ESLint uses Next.js config with some flexibility for development speed

## External Dependencies & Integration Points

### Critical Packages
- **embla-carousel-react**: Image carousel on projects section (requires `useEmblaCarousel` hook)
- **recharts**: Chart components for data visualization (not heavily used yet)
- **sonner**: Toast notifications library with custom `use-toast` hook
- **lucide-react**: Icon library (used throughout: Github, Linkedin, Mail, ChevronLeft/Right, etc.)
- **class-variance-authority**: For building reusable component variants
- **react-resizable-panels**: Panel resize functionality
- **next-themes**: Dark mode management (imported but may not be actively used)

### Analytics
- Vercel Analytics integrated in root layout
- No database/backend (static portfolio)

## Common Tasks

### Add a New Project
1. Edit `app/page.tsx` → update `projects` array
2. Add image files to `public/[project-name]/`
3. Reference images in the `images` array of the project object

### Create a New Journal Entry
1. Create folder: `app/journal/[slug]/`
2. Create `page.tsx` with metadata and content
3. Add link in navigation if needed

### Modify Colors
1. Edit CSS variables in `app/globals.css` (root section)
2. Use variable names in components: `className="text-primary"`

### Add UI Components
1. If using Radix UI, add wrapper to `components/ui/[component].tsx`
2. Export from wrapper component
3. Use throughout app with consistent props/styling

## Important Gotchas

- Images must be placed in `public/` folder (no optimization)
- Always use `cn()` utility when conditionally applying Tailwind classes
- Social links are currently hardcoded; no dynamic linking system
- No form backend integration yet (contact form structure exists but no submission handling)
- Dark mode classes use custom `:dark` variant, not standard `dark:` prefix
- Sparkle cursor is decorative and runs on every mousemove event (consider performance on lower-end devices)

## Testing & Debugging

No explicit test framework configured. For debugging:
- React DevTools browser extension for component inspection
- VS Code debugger with Next.js (requires launch configuration)
- Browser console for client-side issues
- Build output for TypeScript/ESLint warnings (though ignored in CI)
