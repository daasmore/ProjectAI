# TOOLS.md — Frontend Frontend Notes

## Development Tools
- **Framework:** Next.js 14+ (App Router) — SSR untuk SEO undangan
- **Styling:** Tailwind CSS + shadcn/ui — rapid UI development
- **Animasi:** Framer Motion — smooth page transitions & micro-interactions
- **State:** Zustand — lightweight state management
- **Maps:** Leaflet (OpenStreetMap) — budget-friendly maps
- **Form:** React Hook Form + Zod — robust form validation
- **Testing:** Playwright (E2E), Vitest (unit), Storybook (component)

## Project Structure
```
frontend/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth group (login, register)
│   ├── (dashboard)/       # Dashboard group (admin)
│   ├── invite/[slug]/     # Public invitation page
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui base components
│   ├── forms/            # Form components
│   ├── maps/             # Map components
│   └── templates/        # Invitation templates
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities, API clients
├── stores/                # Zustand stores
├── templates/             # Wedding invitation templates
├── public/                # Static assets
├── styles/                # Global styles
├── .env.example           # Environment template
├── next.config.js         # Next.js config
├── tailwind.config.ts     # Tailwind config
└── tsconfig.json          # TypeScript config
```

## Key Conventions
- **Mobile-first CSS** — always start with mobile breakpoints
- **Component naming:** PascalCase for components, camelCase for utilities
- **File naming:** kebab-case for files, PascalCase for component exports
- **API calls:** centralized in `lib/api/` with TypeScript types
- **Environment vars:** `NEXT_PUBLIC_*` prefix for client-side

## Performance Targets
- Lighthouse score: 90+ (all categories)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## Browser Support
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile: iOS Safari, Chrome Android
- Minimum viewport: 320px
