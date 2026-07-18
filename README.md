# Smoothie Operator

A mobile-first online store for customisable performance smoothies. Built with Next.js (App Router), TypeScript, Tailwind CSS, Lucide icons, and Embla Carousel.

Live at [logicarl.com/smoothieoperator](https://logicarl.com/smoothieoperator).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/smoothieoperator](http://localhost:3000/smoothieoperator).

Copy `.env.local.example` to `.env.local` and configure the Google Sheets webhook for order capture (see `google-apps-script/Code.gs`).

## Deployment

This app is deployed as a standalone Netlify site and proxied through the main [logicarl.com](https://logicarl.com) portfolio at `/smoothieoperator`.

### Smoothie Operator (this repo)

1. Create a new site on Netlify connected to this GitHub repo.
2. Set the site name to `smoothie-operator` (or update the proxy URL in `web-portfolio/netlify.toml` to match).
3. Add environment variables in Netlify:
   - `GOOGLE_SHEETS_WEBHOOK_URL`
   - `GOOGLE_SHEETS_WEBHOOK_SECRET` (optional)
4. Deploy. The app uses `basePath: /smoothieoperator` and the Netlify Next.js plugin.

### logicarl.com proxy

The main portfolio repo (`web-portfolio`) proxies `/smoothieoperator` to this Netlify site. Redeploy the portfolio after updating `netlify.toml`.

## Project structure

```
app/                 Next.js App Router, server actions
components/          Page sections and configurator UI
hooks/               Order and nutrient stack state
lib/                 Products, pricing, and helpers
google-apps-script/  Order webhook for Google Sheets
public/images/       Product imagery
```
