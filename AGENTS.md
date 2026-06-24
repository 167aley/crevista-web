<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CREVISTA — Commercial Real Estate platform (front-end)

Public-facing front-end for CREVISTA, a commercial real estate marketplace
(office, retail, industrial, multifamily, 1031 exchange, etc.). Built from the
Figma file `CREVISTA  UI UX` (raw export kept in `/figma-export`, gitignored).

## Stack
- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` in `src/app/globals.css`)
- **lucide-react** icons · **class-variance-authority** for component variants
- **Leaflet + react-leaflet** for the map view (OpenStreetMap / Carto tiles, no API key)

## Design tokens (from Figma)
- Navy `#002147` (primary), navy-700 `#0d2b52`, gold `#c8a14b` (accent/CTA),
  brand-green `#2e9e5b` (logo), surface `#f9f9f9`, muted `#6c6c6c`
- Fonts: **Inter** (body, `font-sans`), **Poppins** (headings, `font-display`)
- Utilities exposed via `@theme`: `bg-navy`, `text-gold`, `shadow-card`, etc.

## Structure
- `src/app/(site)/` — main pages with shared Navbar + Footer
  - `/` homepage · `/search` results · `/search/map` map view
  - `/listings/[slug]` detail (SSG) · `/pricing` · `/tools`
- `src/app/(auth)/` — split-screen auth layout: `/login`, `/signup`, `/forgot-password`
- `src/components/` — `ui/` primitives, `layout/`, `listings/`, `search/`, `pricing/`, `tools/`, `auth/`
- `src/lib/` — `data.ts` (mock listings + property types + pricing + tools),
  `search.ts` (filter/sort), `assets.ts` (curated photo mapping), `utils.ts` (cn, money fmt)
- `public/assets/` — real CRE photography extracted from the Figma export

## Conventions
- Server Components by default; `"use client"` only where interactive
  (search/filter bar, map, gallery lightbox, forms, save button).
- Mock data drives all listings — no backend yet. `filterListings()` reads URL
  search params (`deal`, `type`, `q`, `minPrice`, `minSize`, `sort`, `exchange1031`).
- Leaflet components are loaded via `next/dynamic({ ssr: false })` inside a
  client wrapper (server components can't use `ssr: false`).

## Run
- `npm run dev` (defaults to :3000) · `npm run build` · `npm start`
