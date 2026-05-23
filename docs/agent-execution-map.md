# Daily Word Categories Agent Execution Map

## Operating Rules

- Default path: execute locally first, verify, then mutate external systems.
- Stop and ask the user only for passwords, 2FA, CAPTCHA, paid purchases, OAuth approval, or irreversible production changes.
- Keep static puzzles as the launch baseline. Use dynamic trend ingestion only as an optional bonus path.
- Prefer CLI for GitHub, Vercel, Supabase, and local builds. Use browser only for account pages and visual checks.

## Skill Map

| Task type | Local skill/source | Use when | Verification |
| --- | --- | --- | --- |
| Long multi-phase coordination | `agent-chassis` | Phase tracking, handoff packets, evidence receipts | `docs/agent-execution-map.md` stays current |
| Surgical coding | `karpathy-skill` | Editing app code, keeping MVP scoped | `npm run build` passes |
| Frontend design | `frontend-design` | Game UI, responsive layout, visual differentiation | Browser/local screenshot or manual UI check |
| Browser checks | `chrome` / manual browser guidance | Logged-in Cloudflare, Vercel, GitHub, Replicate, Supabase | User confirms screen or CLI/API confirms result |
| Frontend QA | `webapp-testing` or browser screenshot | After local dev server starts | Page loads, no console/runtime errors |
| Spreadsheet/doc/ppt work | Not needed for MVP | Only if user asks for docs/decks/sheets | Generated artifact renders |

## Phase Status

| Phase | Status | Evidence | Next action |
| --- | --- | --- | --- |
| Phase 1 Account matrix | Mostly complete | GitHub CLI logged in, Supabase project created by user, Replicate dashboard reached, Vercel logged in, Cloudflare DNS available | Record account status in final launch receipt |
| Phase 2 Toolchain | Partial | Node, npm, Git present. `pnpm`, `vercel`, `supabase` missing | Install only needed CLIs before deployment |
| Phase 3 Open Design | Skipped by user direction | User chose static MVP + API hook path | Do not block launch on Open Design |
| Phase 4 Full-stack MVP | Complete for launch MVP | Next.js app, static puzzles, `/api/bonus`, metadata, sitemap, robots; `npm run build` passes | Optional Supabase/Replicate automation later |
| Phase 5 Deploy/SEO | Deployed, SEO submit pending | GitHub repo pushed, Vercel production ready, `daily.alantern.com` returns 200 | Optional Google Search Console submission |

## Current Product Plan

### Launch MVP

- Next.js App Router.
- Static daily puzzle pack in `src/data/puzzles.ts`.
- Playable board: select 4, submit, solved groups, mistakes, reset, reveal.
- `/api/bonus` reserved for trend-generated puzzles. It returns no content until a real generator exists, so the frontend falls back to static daily puzzle.
- Viral loop: spoiler-free emoji result sharing via `Copy result`.
- Retention loop: local browser streak and best streak stored in LocalStorage.
- Monetization hook: `$1 Revive` reads `NEXT_PUBLIC_REVIVE_CHECKOUT_URL`; if absent, it grants one launch-promo revive and explains that paid checkout is not connected yet.
- Ad hook: sponsor slot in the side rail for early newsletter/app/course ads.

### Differentiation For US/EU Market

- Theme: editorial minimal puzzle page, sharper than a clone, lightweight enough for mobile.
- Content: classic English categories mixed with US culture, tech, sports, streaming, office, campus, and phrase-trap groups.
- Growth hook: later daily "Hot Bonus" puzzle generated from trends.
- Monetization test: keep main puzzle free, monetize frustration/urgency with `$1 Revive`, then add sponsor inventory once traffic exists.

## Precise Task Packets

### Frontend MVP Packet

Goal: produce a playable static Daily Word Categories website.

Inputs:
- `src/data/puzzles.ts`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`

Steps:
1. Complete UI and game state.
2. Add metadata and SEO basics.
3. Build locally.

Verify:
- `npm run build`
- Optional: `npm run dev` and browser check.

Stop if:
- Build fails due to framework/package conflict after one repair attempt.

### GitHub Packet

Goal: create `aDragon0707/daily-word-categories` and push code.

Steps:
1. `git init`
2. commit app files only
3. `gh repo create aDragon0707/daily-word-categories --public --source . --remote origin --push`

Verify:
- `gh repo view aDragon0707/daily-word-categories --json url`

Stop if:
- GitHub asks for new auth, organization, or paid feature.

### Vercel Packet

Goal: deploy production site and bind `daily.alantern.com`.

Steps:
1. Install/use Vercel CLI.
2. Link project.
3. Deploy production.
4. Add domain `daily.alantern.com`.

Verify:
- Vercel production URL works.
- `daily.alantern.com` shows site.

Current evidence:
- GitHub: `https://github.com/aDragon0707/daily-word-categories`
- Vercel production: `https://daily-word-categories-alpha.vercel.app`
- Custom domain: `https://daily.alantern.com`
- DNS: `daily.alantern.com` CNAMEs to `cname.vercel-dns.com`

Stop if:
- Vercel asks for paid plan, billing, or manual account approval.

### Dynamic Bonus Packet

Goal: leave a clean future path for trend-generated puzzles.

Current state:
- `/api/bonus` exists as a reserved endpoint.

Future steps:
1. Add Replicate API key to Vercel env.
2. Add scheduled job.
3. Fetch trend inputs from a compliant source.
4. Validate generated JSON before serving.

Stop if:
- Trend source requires bypassing access controls, CAPTCHA, or paid scraping approval.
