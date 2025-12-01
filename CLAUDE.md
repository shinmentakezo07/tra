# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DRA is a full-stack educational platform built with Next.js that provides an interactive learning experience with courses, lessons, code editors, and exercise tracking. The project uses TypeScript, React 19, and Tailwind CSS for the frontend, with a Neon PostgreSQL database backed by Drizzle ORM.

**Key Tech Stack:**
- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion
- Database: Neon PostgreSQL with Drizzle ORM
- Auth: NextAuth v5 with credential-based authentication
- Monorepo: Turbo for build orchestration
- Code Execution: xterm for terminal emulation

## Common Development Commands

```bash
# Development
npm run dev                 # Start all dev servers (uses Turbo)

# Building
npm run build              # Build all apps in monorepo

# Linting
npm run lint               # Run ESLint across all apps

# Code Formatting
npm run format             # Format all TS/TSX/MD files with Prettier
```

**For web app only:**
```bash
cd apps/web
npm run dev                # Start Next.js dev server (port 3000)
npm run build              # Build for production
npm run lint               # Run Next.js ESLint
```

## Architecture & Data Flow

### App Structure

The web app uses Next.js App Router with the following layout:

```
apps/web/
├── app/                   # Next.js App Router
│   ├── layout.tsx         # Root layout with MainLayout wrapper
│   ├── page.tsx           # Home page
│   ├── login/             # Auth pages
│   ├── signup/
│   ├── dashboard/         # User dashboard
│   ├── courses/           # Course listing
│   ├── learn/[...slug]/   # Dynamic lesson viewer
│   ├── exercises/         # Exercise page
│   ├── playground/        # Code playground
│   ├── api/auth/          # NextAuth handlers
│   └── lib/               # Server actions
├── components/            # React components
├── db/                    # Database setup
├── lib/                   # Utilities
├── auth.ts                # NextAuth configuration & handlers
├── auth.config.ts         # Auth config
├── next.config.ts         # Next.js config
└── tailwind.config.ts     # Tailwind setup
```

### Database Schema

Core entities (see `db/schema.ts`):
- **users** – User accounts with email/password auth
- **courses** – Course metadata (title, slug, level, published status)
- **lessons** – Individual lessons within courses (markdown content, code snippets, exercises, quiz)
- **enrollments** – Track which users are enrolled in which courses
- **progress** – Track lesson completion status per user

Relations are defined in the schema for efficient querying via Drizzle.

### Authentication Flow

1. User submits credentials via login form
2. NextAuth Credentials provider validates against DB (bcrypt password comparison)
3. Session established with `auth()` server function
4. Protected routes/components check session via `await auth()`
5. Session user data passed to components via props (see `layout.tsx`)

### Component Hierarchy

- **MainLayout** – Top-level wrapper (header + routing logic)
- **Header** – Navigation with user menu
- **DashboardClient** – Dashboard view component
- **LessonView** – Lesson display with code editor integration
- **CodeEditor** – Monaco editor wrapper for code execution
- **Hero** – Landing page hero section
- **CyberpunkLogo** – Branding component

Most components in `components/` are client-side utilities for UI. Server-side logic lives in route handlers and `app/lib/actions.ts`.

### Key Libraries & Patterns

- **Framer Motion** – Animations for hero and transitions
- **Monaco Editor** – In-browser code editing in playground
- **xterm** – Terminal emulation for code execution output
- **Class Variance Authority** – Type-safe Tailwind component variants
- **React Hook Form + Zod** – Form validation (used in auth flows)
- **Drizzle ORM** – Type-safe database queries with relations support

## Important Files & Patterns

### Database Access

All DB queries flow through `db/index.ts` which exports a Drizzle client initialized with Neon. Example query:

```typescript
const user = await db.query.users.findFirst({
  where: eq(users.email, email),
});
```

**Environment:**
- `DATABASE_URL` – Neon connection string (required, throws if missing)

### Authentication & Authorization

- Session retrieval: `const session = await auth()` in Server Components
- Protected routes: Redirect if `!session?.user` in layout/page
- User data: Passed via component props (e.g., `user={session?.user}`)

### API Routes

- Auth endpoints at `app/api/auth/[...nextauth]/route.ts` (re-exports from `auth.ts`)
- Pattern: All NextAuth routes go through the catch-all handler

### Server Actions

`app/lib/actions.ts` contains server-side functions callable from client components. Used for DB mutations, auth state changes, etc.

## Configuration Files

- **turbo.json** – Monorepo task configuration; `dev` and `build` tasks defined with cache settings
- **tsconfig.json** – Path alias `@/*` maps to app root for clean imports
- **next.config.ts** – Next.js build & runtime options
- **tailwind.config.ts** – Tailwind theme customization
- **auth.config.ts** – Auth provider & session config (pages, callbacks)
- **.eslintrc.json** – Extends `next/core-web-vitals`

## Development Workflow

1. **Feature branches**: Work on feature branches and keep `main` deployable
2. **Database changes**: Use Drizzle migrations when schema changes; seed via `db/seed.ts` if needed
3. **Component dev**: Use `npm run dev` for hot reload; test components in isolation
4. **Type safety**: Strict TypeScript enabled; leverage Drizzle types for DB queries
5. **Styling**: Use Tailwind classes directly; custom colors in `tailwind.config.ts`
6. **Testing**: No test runner configured yet; add Jest or Vitest if needed
7. **Linting**: Run `npm run lint` before committing; ESLint catches Next.js-specific issues

## Performance & Build Considerations

- **Turbo cache**: Build cache stored in `.turbo/`; use `npm run build` to leverage cache
- **Next.js output**: `.next/` contains build artifacts; excluded from git
- **Large seed data**: `db/seed.ts` contains 81KB of seed data; only run in dev/preview
- **Monaco Editor**: Loaded dynamically in playground; check bundle impact
- **xterm**: Terminal emulation adds ~100KB; only used in playground/execution contexts

## Environment Setup

Required `.env.local` variables:
- `DATABASE_URL` – Neon PostgreSQL connection string
- `NEXTAUTH_SECRET` – Secret key for NextAuth session signing (generate via `openssl rand -base64 32`)
- `NEXTAUTH_URL` – For production (e.g., `https://yourdomain.com`)

Check `.env.example` or auth.config.ts for other optional variables.

## Debugging Tips

- **Session issues**: Verify `DATABASE_URL` is set; check if user exists in DB
- **TypeScript errors**: Run `npm run lint` to catch build-time issues
- **Database queries**: Use Drizzle's logging; add `.get()` to see raw SQL
- **Component hydration**: Watch for mismatch between server/client rendering; use `suppressHydrationWarning` carefully
- **Auth redirects**: Check `auth.config.ts` pages config for correct redirect URLs
