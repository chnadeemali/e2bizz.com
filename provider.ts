import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';

export async function createFeaturedAdCheckout({
  listingId,
  userId,
  listingTitle,
}: {
  listingId: string;
  userId: string;
  listingTitle: string;
}) {
  const provider = process.env.PAYMENT_PROVIDER || 'stripe';

  if (provider === 'jazzcash') {
    return createJazzCashCheckout({ listingId, userId, listingTitle });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: process.env.FEATURED_AD_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: absoluteUrl(`/dashboard?payment=success&listing=${listingId}`),
    cancel_url: absoluteUrl(`/listings/${listingId}?payment=cancelled`),
    metadata: {
      action: 'feature_listing',
      listing_id: listingId,
      user_id: userId,
      provider: 'stripe',
      listing_title: listingTitle,
    },
  });

  return { url: session.url };
}

async function createJazzCashCheckout({ listingId }: { listingId: string; userId: string; listingTitle: string }) {
  return {
    url: absoluteUrl(`/dashboard?provider=jazzcash&listing=${listingId}&message=configure-jazzcash-merchant-credentials`)
  };
}
