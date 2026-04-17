'use client';

export function FeatureAdButton({ listingId }: { listingId: string }) {
  async function handleClick() {
    const response = await fetch(`/api/listings/${listingId}/feature`, { method: 'POST' });
    const data = await response.json();
    if (data.url) window.location.href = data.url;
    else alert(data.error || 'Unable to start payment');
  }

  return (
    <button onClick={handleClick} className="rounded-xl bg-brand-gold px-4 py-2 text-sm font-bold text-brand">
      Feature this ad
    </button>
  );
}
