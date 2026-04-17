'use client';

import { useState } from 'react';

export function MessageSellerButton({ listingId }: { listingId: string }) {
  const [loading, setLoading] = useState(false);

  async function startConversation() {
    setLoading(true);
    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId })
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok && data.id) window.location.href = `/conversations/${data.id}`;
    else alert(data.error || 'Please login first');
  }

  return (
    <button onClick={startConversation} disabled={loading} className="rounded-2xl border px-4 py-3 font-semibold text-slate-700">
      {loading ? 'Opening chat...' : 'Message seller'}
    </button>
  );
}
