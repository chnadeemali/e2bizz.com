'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { categories, cities } from '@/lib/constants';

export function SearchFilters() {
  const router = useRouter();
  const params = useSearchParams();

  function update(name: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === 'all') next.delete(name);
    else next.set(name, value);
    router.push(`/?${next.toString()}`);
  }

  return (
    <div className="grid gap-3 md:grid-cols-5">
      <input
        defaultValue={params.get('q') || ''}
        onBlur={(e) => update('q', e.target.value)}
        placeholder="Search listings"
        className="rounded-2xl border px-4 py-3"
      />
      <select defaultValue={params.get('category') || 'all'} onChange={(e) => update('category', e.target.value)} className="rounded-2xl border px-4 py-3">
        <option value="all">All categories</option>
        {categories.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <select defaultValue={params.get('city') || 'all'} onChange={(e) => update('city', e.target.value)} className="rounded-2xl border px-4 py-3">
        <option value="all">All cities</option>
        {cities.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <select defaultValue={params.get('sort') || 'latest'} onChange={(e) => update('sort', e.target.value)} className="rounded-2xl border px-4 py-3">
        <option value="latest">Latest</option>
        <option value="featured">Featured first</option>
        <option value="price_asc">Price low to high</option>
        <option value="price_desc">Price high to low</option>
      </select>
      <select defaultValue={params.get('status') || 'all'} onChange={(e) => update('status', e.target.value)} className="rounded-2xl border px-4 py-3">
        <option value="all">Any status</option>
        <option value="published">Published</option>
        <option value="sold">Sold</option>
      </select>
    </div>
  );
}
