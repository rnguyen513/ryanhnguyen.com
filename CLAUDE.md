# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Ryan Nguyen's personal portfolio website built with Next.js 13 (Pages Router), TypeScript, and TailwindCSS. The site includes a resume, contact page, and formerly had a reminders feature (currently disabled).

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint the codebase
npm run lint
```

## Architecture

### Framework & Routing
- **Next.js 13** with Pages Router (not App Router)
- Pages are in `src/pages/`, components in `src/components/`
- TypeScript path alias: `@/*` maps to `./src/*`

### Key Technologies
- **Styling**: TailwindCSS with custom config, NextUI components, Framer Motion for animations
- **3D Graphics**: Three.js via `@react-three/fiber` and `@react-three/drei`
- **Authentication**: NextAuth.js with Google OAuth provider (JWT strategy)
- **Database**: MongoDB via official driver (`mongodb` package)
- **Analytics**: Vercel Analytics

### File Structure
```
src/
├── pages/           # Next.js pages (index, about, resume, contact, etc.)
│   ├── api/        # API routes
│   │   ├── auth/   # NextAuth.js authentication
│   │   └── remindersapi.ts  # MongoDB reminders API (currently disabled)
│   ├── _app.tsx    # Global app wrapper with NextUI, SessionProvider, Analytics
│   └── _document.tsx
├── components/      # React components
│   ├── header.tsx  # Navigation header with mobile dropdown
│   ├── background.tsx
│   └── ui/         # UI components (Sparkles, GoogleIcon, etc.)
├── styles/         # Global styles and CSS modules
└── utils/          # Utility functions (cn.ts for classnames)

lib/
└── mongodb.ts      # MongoDB client singleton (dev/prod modes)

public/
└── resume_*.pdf    # Resume PDFs (latest is resume_12_16_24.pdf)
```

### Database Architecture
- **MongoDB Connection**: Singleton pattern in `lib/mongodb.ts`
  - Uses global variable in development for HMR compatibility
  - Creates new client in production
  - Requires `MONGODB_URI` environment variable
- **Database**: `live_rnguyencom`
- **Collections**: `reminders` (main), `history` (deleted reminders)
- **Reminders API**: POST endpoint currently returns 400 with special message for certain users

### Authentication Flow
- NextAuth.js configuration in `src/pages/api/auth/[...nextauth].js`
- Google OAuth provider (requires `GOOGLE_ID` and `GOOGLE_SECRET`)
- JWT session strategy
- Header component (`src/components/header.tsx`) has commented-out auth UI

### UI Patterns
- Responsive design with mobile dropdown menu in header
- TailwindCSS utilities with glass morphism effects (`bg-gray-100/5`, `ring-1`, `shadow-lg`)
- TypeAnimation for animated text on homepage
- SparklesCore for particle background effects
- Server-side props used for MongoDB connection status display

## Important Notes

1. **Reminders Feature**: The reminders API (`src/pages/api/remindersapi.ts`) is intentionally disabled. POST requests return 400 status with a special message for William Kaiser.

2. **Navigation**: Several menu items in the header are commented out (About, Projects, Reminders). Only Resume and Contact are active.

3. **Environment Variables Required**:
   - `MONGODB_URI` - MongoDB connection string
   - `GOOGLE_ID` - Google OAuth client ID
   - `GOOGLE_SECRET` - Google OAuth client secret

4. **Resume Management**: Multiple resume PDFs in `public/` directory. The latest version should be linked in the resume page.

5. **TypeScript Configuration**: Strict mode enabled, targets ES5 for broad compatibility.
