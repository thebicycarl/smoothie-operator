# Smoothie Operator

A mobile-first storefront for the Smoothie Operator pilot. One flavour is on sale — Black Forest Powerhouse — on the Athlete stack, with an optional collagen add-on, sold in packs of 6 serves ($8.90/serve, $53.40/pack). Built with Next.js (App Router), TypeScript and Tailwind CSS.

Live at [smoothieoperator.com.au](https://smoothieoperator.com.au).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.local.example` to `.env.local` and configure the Google Sheets webhook for order capture (see `google-apps-script/Code.gs`). Checkout does not take payment.

## Orders

`google-apps-script/Code.gs` recomputes price and shipping, then appends a row. Replace the sheet header row before redeploying (old configurator columns will not line up):

Name | Email | Address | Suburb | Flavour | Stack | Chocolate WPI (g) | Creatine (g) | Collagen | Packs (×6) | Serves | Price per serve | Subtotal | Shipping | Shipping rule | Order total | Repeat order

Shipping is $14.50 flat, free when the serve subtotal reaches $100 (2 packs / 12 serves at $8.90 is $106.80), and free when the suburb or address includes Toowoomba (earlybird). One pack is $53.40 before shipping.

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
components/          Page sections and order UI
hooks/               Order selection state
lib/                 Catalogue, pricing, shipping, nutrition estimates
google-apps-script/  Order webhook for Google Sheets
public/images/       Product imagery
```
