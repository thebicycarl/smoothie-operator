# Smoothie Operator

A mobile-first online store for customisable performance smoothies. Built with Next.js (App Router), TypeScript, Tailwind CSS, Lucide icons, and Embla Carousel.

Live at [smoothieoperator.com.au](https://smoothieoperator.com.au).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.local.example` to `.env.local` and configure the Google Sheets webhook for order capture (see `google-apps-script/Code.gs`).

## Deployment (Vercel)

1. Import this repo at [vercel.com/new](https://vercel.com/new).
2. Add environment variables:
   - `GOOGLE_SHEETS_WEBHOOK_URL`
   - `GOOGLE_SHEETS_WEBHOOK_SECRET` (optional)
3. Deploy.
4. In Vercel → **Settings → Domains**, add `smoothieoperator.com.au` and `www.smoothieoperator.com.au`.
5. Update your domain registrar's DNS with the records Vercel provides (typically an `A` record and/or `CNAME`).

No `basePath` or platform-specific config is required — Vercel detects Next.js automatically.

## Project structure

```
app/                 Next.js App Router, server actions
components/          Page sections and configurator UI
hooks/               Order and nutrient stack state
lib/                 Products, pricing, and helpers
google-apps-script/  Order webhook for Google Sheets
public/images/       Product imagery
```
