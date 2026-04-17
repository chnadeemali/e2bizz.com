'use client';

import { useState } from 'react';

export function ListingGallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[2rem] border bg-white shadow-sm">
        <img src={current} alt="Listing image" className="h-[420px] w-full object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image) => (
          <button key={image} onClick={() => setCurrent(image)} className="overflow-hidden rounded-2xl border bg-white">
            <img src={image} alt="Thumbnail" className="h-24 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
