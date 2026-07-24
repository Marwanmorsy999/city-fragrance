# Cloudflare Workers + Vite + TanStack Router + Neon PostgreSQL

Production-ready scaffold for a React SPA running entirely on Cloudflare Workers with a Neon PostgreSQL database.

## Getting Started

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run deploy
```

Set these secrets before deploying:

```bash
wrangler secret put NEON_DATABASE_URL
```

## Tech Stack

- **Runtime**: Cloudflare Workers (`@cloudflare/vite-plugin`)
- **Router**: TanStack Router (Type-safe, file-based)
- **Database**: Neon PostgreSQL via Hyperdrive bindings
- **Styling**: Tailwind CSS v4
- **Build**: Vite 6
