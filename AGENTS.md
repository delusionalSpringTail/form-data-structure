<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Commands

- Package manager is **pnpm** (pinned via `packageManager`; `pnpm-lock.yaml` is the only lockfile — ignore the README's npm/yarn examples).
- `pnpm dev` — dev server (Turbopack, port 3000).
- `pnpm build` — production build; also regenerates type stubs.
- `pnpm lint` — ESLint 9 flat config (`eslint.config.mjs`).
- Typecheck: `pnpm exec tsc --noEmit` (no `typecheck` script; `tsconfig` includes generated types under `.next/types/`, so run a build or `next dev` first if they're missing).
- No tests exist; don't invent a test runner.

# Project specifics

- Next.js **16.4.6** with App Router; code lives in `src/app`. Path alias `@/*` → `src/*`.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`: any page/component that reads dynamic data (`cookies`, `headers`, uncached fetch) must wrap async content in `<Suspense>` or the build fails.
- Tailwind v4 is wired through the Turbopack loader in `next.config.ts` (not PostCSS) — config is CSS-based in `src/app/globals.css`, there is no `tailwind.config.js`.
- `next-env.d.ts` is gitignored but required in tsconfig — don't delete it or try to commit it.
- The `LayoutProps<"/">` type in `layout.tsx` is a globally available generated type, not an import — don't add an import for it.

