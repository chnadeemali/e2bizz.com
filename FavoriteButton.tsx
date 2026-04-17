'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

export function FavoriteButton({ listingId, initialIsFavorite = false }: { listingId: string; initialIsFavorite?: boolean }) {
  const [active, setActive] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    const res = await fetch(`/api/listings/${listingId}/favorite`, { method: 'POST' });
    const data = await res.json();
    if (res.ok) setActive(data.isFavorite);
    else alert(data.error || 'Please login first');
    setLoading(false);
  }

  return (
    <button onClick={toggle} disabled={loading} className="rounded-full bg-white/90 p-2 shadow">
      <Heart className={active ? 'h-4 w-4 fill-red-500 text-red-500' : 'h-4 w-4 text-slate-700'} />
    </button>
  );
}
