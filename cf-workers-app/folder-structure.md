# Cloudflare Workers + Vite + TanStack Router + Neon PostgreSQL

```
cf-workers-app/
├── .gitignore
├── .env.example
├── lovable-migration/
│   └── README.md
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vite-env.d.ts
├── wrangler.toml
├── README.md
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx              # React entry point + CSS import
│   ├── App.tsx               # Root layout + RouterProvider
│   ├── router.tsx            # TanStack Router configuration + route definitions
│   ├── index.css             # Tailwind v4 entry point (@import "tailwindcss")
│   ├── db/
│   │   └── index.ts          # Neon Hyperdrive connection pool
│   ├── components/
│   │   └── ui/               # Shared UI primitives (header, footer)
│   ├── context/
│   │   └── auth.tsx          # Auth context provider
│   ├── lib/
│   │   └── utils.ts          # Shared utilities (cn, helpers)
│   ├── types/
│   │   └── index.ts          # Shared TypeScript types
│   └── pages/
│       ├── Home.tsx          # Landing page
│       └── NotFound.tsx      # 404 page
├── .claude/
│   └── CLAUDE.md             # Project context for Claude Code
└── AGENTS.md                 # Agent instructions for this project
```

## Key Decisions

- **Runtime**: Cloudflare Workers via `@cloudflare/vite-plugin` (not Vercel/Netlify)
- **Router**: TanStack Router v5 (type-safe, file-based routing support)
- **Database**: Neon PostgreSQL via Neon Serverless Driver + Cloudflare Hyperdrive
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Deployment**: `wrangler deploy` — no platform lock-in beyond Cloudflare
