# RAMCompare India

An SEO-driven React prototype for researching and comparing RAM prices in India. It is a price comparison and shopping-discovery site, not an e-commerce shop.

## Problem and audience

People researching a RAM upgrade often find isolated retailer pages rather than a comparison-first view. This project is for Indian PC builders, gamers, students, laptop users, upgraders and budget-conscious buyers.

## Features

- Search, capacity/type/device/brand/price filters
- DDR4, DDR5, laptop and capacity-led pages
- Reusable product comparison pages with outbound retailer listing links
- Clearly marked illustrative **Demo Data**; no live-price claim
- Responsive comparison tables, accessible navigation, FAQ and guide content
- Per-page client-side metadata, canonical-ready SEO component and JSON-LD WebSite infrastructure

## Stack and commands

React, Vite, JavaScript/JSX, Tailwind CSS and React Router.

```bash
npm install
npm run dev
npm run build
npm run preview
```

Copy `.env.example` to `.env` and set `VITE_SITE_URL` before a domain deployment. The static sitemap uses `https://yourdomain.com` as a deployment placeholder; replace it alongside the production domain.

## Structure

`src/data/products.js` contains the replaceable sample data model. `src/utils/priceUtils.js` calculates lowest, highest and average prices. Shared UI and metadata live in `src/components`; routes are composed in `src/App.jsx`.

## SEO approach

The information architecture maps keywords to intent-led pages and uses clean URLs, headings, internal links, FAQs, breadcrumbs, canonical-ready metadata, robots.txt and sitemap.xml. See [SEO-MAPPING.md](SEO-MAPPING.md) and [SEO-ROADMAP.md](SEO-ROADMAP.md).

Client-rendered Vite pages are a useful prototype but do not guarantee perfect SEO. A production launch should consider prerendering/SSR, verify canonicals and generate the sitemap dynamically.

## Future backend and deployment

Static records can later be replaced by `GET /api/products`, `GET /api/products/:id`, `GET /api/prices` and `GET /api/search`, backed by a verified data source. Future additions may include price history, analytics, Search Console and a VPS/CDN deployment.

### CSET489 deployment note

**Current prototype:** React + Vite + Tailwind, running locally.

**Future static deployment:** Vite production build can be hosted on a VPS/CDN with Nginx, Cloudflare and SSL.

**Milestone I requirement:** if the handbook requires VPS + Cloudflare + SSL + a functional WordPress deployment, that WordPress deployment must be separately documented and completed. This React project is not represented as a WordPress deployment.

## Data accuracy

All displayed prices are illustrative demo data, not live prices. Outbound URLs point to real retailer search/listing pages and are marked `nofollow sponsored noopener`. Verify specifications, availability and final price at the retailer.
