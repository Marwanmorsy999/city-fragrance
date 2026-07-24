# Agent Instructions

## Project
Cloudflare Workers React app with Vite, TanStack Router, and Neon PostgreSQL.

## Structure
- `src/db/index.ts` — DB connection (Neon + Hyperdrive)
- `src/router.tsx` — Route definitions and router setup
- `src/pages/` — Page components
- `src/components/ui/` — Shared UI primitives
- `src/lib/utils.ts` — `cn()` utility for class merging

## Conventions
- Use TypeScript strict mode. No `any` types.
- Use `getDb()` from `src/db/index.ts` for all database access — do not create new Neon connections.
- All routes must be registered in `src/router.tsx`.
- Use Tailwind CSS classes; no inline styles.
- Do not add Vercel or Netlify configuration files.

## Deployment
Run `npm run deploy` after setting `wrangler secret put NEON_DATABASE_URL`.
