export type Category =
  | 'Mobiles'
  | 'Cars'
  | 'Property'
  | 'Electronics'
  | 'Furniture'
  | 'Fashion'
  | 'Jobs'
  | 'Bikes'
  | 'Services';

export type ListingStatus = 'draft' | 'pending' | 'published' | 'rejected' | 'sold';

export type Listing = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  category: Category;
  image_url: string | null;
  image_urls?: string[];
  status: ListingStatus;
  condition?: string | null;
  is_featured: boolean;
  featured_until?: string | null;
  created_at: string;
  profiles?: {
    full_name: string | null;
    phone: string | null;
  } | null;
};

export type ConversationSummary = {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  created_at: string;
  listing?: Pick<Listing, 'id' | 'title' | 'price' | 'image_url'> | null;
};
