# Hostinger deployment notes for E2BIZZ Classifieds Pro

## 1) Upload
Deploy this project as a **Node.js App** on Hostinger, not static shared hosting.

## 2) Build settings
- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm start`
- Node.js version: use a current LTS version supported by Hostinger

## 3) Environment variables
Copy the contents of `.env.hostinger.production` into Hostinger's environment variable panel.

## 4) Important URLs to update
Before going live, replace:
- `NEXT_PUBLIC_SITE_URL`
- Stripe webhook endpoint should be: `https://www.e2bizz.com/api/stripe-webhook`

## 5) Supabase
- Run `supabase/schema.sql`
- Create the storage bucket named by `SUPABASE_BUCKET`

## 6) Stripe
- Create a product and price for featured ads
- Put the live `price_...` into `FEATURED_AD_PRICE_ID`
- Add the webhook endpoint after deployment

## 7) AdSense
- Put your approved publisher id into `NEXT_PUBLIC_ADSENSE_CLIENT`

## 8) Domain
- Attach your custom domain in Hostinger
- Enable SSL
