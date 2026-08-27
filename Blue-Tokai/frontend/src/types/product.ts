export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface ProductVariant {
  size: string;
  price: number;
  stock: number;
  sku: string;
}

export interface Ratings {
  average?: number;
  count?: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  category?: Category | string | null;
  images?: string[];
  basePrice?: number;
  variants: ProductVariant[];
  grindOptions?: string[];
  roastLevel?: string;
  tastingNotes?: string[];
  isSubscriptionEligible?: boolean;
  isActive?: boolean;
  ratings?: Ratings;
}
