import { clsx } from 'clsx';

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export function cn(...values: Array<string | false | null | undefined>) {
  return clsx(values);
}

export function absoluteUrl(path = '/') {
  return `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${path}`;
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
