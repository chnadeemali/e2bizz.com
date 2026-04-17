create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null,
  price numeric(12,2) not null check (price >= 0),
  city text not null,
  category text not null,
  image_url text,
  condition text,
  status text not null default 'pending' check (status in ('draft','pending','published','rejected','sold')),
  moderation_notes text,
  is_featured boolean not null default false,
  featured_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  image_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  buyer_id uuid not null references auth.users(id) on delete cascade,
  seller_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (listing_id, buyer_id, seller_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.listing_reports (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reason text not null,
  status text not null default 'open' check (status in ('open','reviewed','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  listing_id uuid references public.listings(id) on delete set null,
  provider text not null default 'stripe',
  provider_session_id text not null unique,
  amount_total integer not null,
  currency text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create or replace view public.listings_with_primary_image as
select
  l.id,
  l.user_id,
  l.title,
  l.description,
  l.price,
  l.city,
  l.category,
  coalesce(l.image_url, li.image_url) as image_url,
  l.condition,
  l.status,
  l.is_featured,
  l.featured_until,
  l.created_at
from public.listings l
left join lateral (
  select image_url
  from public.listing_images
  where listing_id = l.id
  order by sort_order asc, created_at asc
  limit 1
) li on true;

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;
alter table public.favorites enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.listing_reports enable row level security;
alter table public.payments enable row level security;

create policy "public can view published or sold listings"
  on public.listings for select
  using (status in ('published','sold') or auth.uid() = user_id);

create policy "users can insert own listings"
  on public.listings for insert
  with check (auth.uid() = user_id);

create policy "users can update own listings"
  on public.listings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "public can view listing images for visible listings"
  on public.listing_images for select
  using (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and (l.status in ('published','sold') or l.user_id = auth.uid())
    )
  );

create policy "listing owners can insert images"
  on public.listing_images for insert
  with check (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and l.user_id = auth.uid()
    )
  );

create policy "users can manage own profile"
  on public.profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "users can view and manage own favorites"
  on public.favorites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "participants can view conversations"
  on public.conversations for select
  using (auth.uid() in (buyer_id, seller_id));

create policy "buyer can create conversation"
  on public.conversations for insert
  with check (auth.uid() = buyer_id);

create policy "participants can view messages"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id and auth.uid() in (c.buyer_id, c.seller_id)
    )
  );

create policy "participants can send messages"
  on public.messages for insert
  with check (
    auth.uid() = sender_id and
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id and auth.uid() in (c.buyer_id, c.seller_id)
    )
  );

create policy "users can create own reports"
  on public.listing_reports for insert
  with check (auth.uid() = reporter_id);

create policy "users can view own reports"
  on public.listing_reports for select
  using (auth.uid() = reporter_id);

create policy "users can view own payments"
  on public.payments for select
  using (auth.uid() = user_id);
