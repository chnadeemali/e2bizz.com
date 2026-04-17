'use client';

import { useState } from 'react';
import { categories, cities } from '@/lib/constants';

export function CreateListingForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage('');

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    setLoading(false);
    setMessage(data.message || (response.ok ? 'Saved successfully' : 'Failed'));
  }

  return (
    <form action={onSubmit} className="space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-black text-brand">Create listing</h2>
        <p className="text-sm text-slate-500">Add an ad, upload multiple images, and publish or save as draft.</p>
      </div>
      <input name="title" required placeholder="Title" className="w-full rounded-2xl border px-4 py-3" />
      <textarea name="description" required placeholder="Description" className="min-h-32 w-full rounded-2xl border px-4 py-3" />
      <div className="grid gap-4 md:grid-cols-2">
        <input name="price" type="number" required placeholder="Price" className="rounded-2xl border px-4 py-3" />
        <select name="category" className="rounded-2xl border px-4 py-3">
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <select name="city" className="rounded-2xl border px-4 py-3">
          {cities.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select name="status" className="rounded-2xl border px-4 py-3">
          <option value="pending">Submit for review</option>
          <option value="draft">Draft</option>
          <option value="published">Publish immediately</option>
        </select>
        <select name="condition" className="rounded-2xl border px-4 py-3">
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Used">Used</option>
        </select>
      </div>
      <input name="images" type="file" accept="image/*" multiple className="w-full rounded-2xl border px-4 py-3" />
      <button disabled={loading} className="rounded-2xl bg-brand px-5 py-3 font-semibold text-white disabled:opacity-60">
        {loading ? 'Saving...' : 'Save listing'}
      </button>
      {message && <p className="text-sm text-slate-600">{message}</p>}
    </form>
  );
}
