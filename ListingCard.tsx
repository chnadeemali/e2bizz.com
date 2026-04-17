import Link from 'next/link';
import { Listing } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { FavoriteButton } from './FavoriteButton';

export function ListingCard({ listing, isFavorite = false }: { listing: Listing; isFavorite?: boolean }) {
  const gallery = listing.image_urls?.length ? listing.image_urls : listing.image_url ? [listing.image_url] : [];
  const image = gallery[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';

  return (
    <article className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-slate-100">
        <img src={image} alt={listing.title} className="h-full w-full object-cover" />
        <div className="absolute right-3 top-3">
          <FavoriteButton listingId={listing.id} initialIsFavorite={isFavorite} />
        </div>
        {listing.is_featured && <span className="absolute left-3 top-3 rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-brand">Featured</span>}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-2xl font-black text-brand">{formatCurrency(listing.price)}</p>
            <h3 className="mt-1 line-clamp-1 text-lg font-bold">{listing.title}</h3>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-600">{listing.category}</span>
        </div>
        <p className="line-clamp-2 text-sm text-slate-600">{listing.description}</p>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{listing.city}</span>
          <span className="capitalize">{listing.status}</span>
        </div>
        <Link href={`/listings/${listing.id}`} className="inline-flex rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white">
          View details
        </Link>
      </div>
    </article>
  );
}
