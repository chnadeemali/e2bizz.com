# E2BIZZ Classifieds Pro

A deployable OLX-style classifieds marketplace built with **Next.js App Router**, **Supabase**, **Stripe**, and **AdSense-ready** page structure.

## Included in this upgraded build

- Email/password auth with Supabase
- Seller dashboard
- Multi-image listings
- Favorites / saved items
- Buyer-seller messaging
- Featured ad checkout flow
- Admin moderation queue
- Listing reports
- SEO-ready metadata and sitemap support hooks
- AdSense script slot and reusable ad blocks
- Payment provider abstraction with Stripe enabled and JazzCash starter adapter

## Recommended deployment stack

- Frontend + server routes: Vercel
- Database + auth + storage: Supabase
- Payments: Stripe for live featured-ad purchases
- Monetization: Google AdSense Auto ads or manual units

## Local setup

1. `npm install`
2. `cp .env.example .env.local`
3. Fill all environment variables
4. In Supabase, run `supabase/schema.sql`
5. Create a public storage bucket matching `SUPABASE_BUCKET`
6. In Stripe, create a Checkout product for featured ads and set `FEATURED_AD_PRICE_ID`
7. Configure Stripe webhook to `/api/stripe-webhook`
8. `npm run dev`

## What is live-ready vs account-dependent

This repository contains the code required for a real featured-ad payment flow using Stripe Checkout and webhook confirmation. Live charging still requires your own Stripe merchant account, webhook secret, and product/price configuration.

AdSense support is included through site-wide script injection and reusable ad blocks, but ad serving depends on your own approved AdSense publisher account and site review.

JazzCash and Easypaisa each require merchant onboarding, KYC, and credentials. This build includes a provider abstraction and a JazzCash starter adapter path so you can extend the same promotion flow after onboarding.

## Main routes

- `/` marketplace feed
- `/listings/[id]` listing detail + gallery + contact
- `/dashboard` seller dashboard
- `/my-favorites` saved listings
- `/conversations` inbox
- `/admin/moderation` admin review queue
- `/login` and `/register`

## Suggested next production upgrades

- Search indexing with Meilisearch or Algolia
- SMS/WhatsApp verification
- Redis rate limits
- Abuse heuristics and ML moderation
- Invoice history
- Geo-search and maps
- Separate buyer checkout and escrow flows
