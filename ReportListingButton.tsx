'use client';

import { useState } from 'react';

export function ReportListingButton({ listingId }: { listingId: string }) {
  const [loading, setLoading] = useState(false);

  async function report() {
    const reason = window.prompt('Why are you reporting this listing?');
    if (!reason) return;
    setLoading(true);
    const res = await fetch(`/api/listings/${listingId}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    });
    const data = await res.json();
    setLoading(false);
    alert(data.message || data.error || 'Done');
  }

  return (
    <button onClick={report} disabled={loading} className="rounded-2xl border px-4 py-3 text-sm font-medium text-slate-700">
      Report listing
    </button>
  );
}
