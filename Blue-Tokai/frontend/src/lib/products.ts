import { Product } from "../types/product";

const API_URL =
  process.env.NEXT_API_URL ?? "http://localhost:5000/api/v1";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products?limit=100`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.products) ? data.products : [];
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product ?? null;
  } catch {
    return null;
  }
}

export function categoryNameOf(product: Product): string | null {
  if (product.category && typeof product.category === "object") {
    return product.category.name ?? null;
  }
  return null;
}

export function categorySlugOf(product: Product): string | null {
  if (product.category && typeof product.category === "object") {
    return product.category.slug ?? null;
  }
  return null;
}

export function startingPrice(product: Product): number | null {
  if (product.variants && product.variants.length > 0) {
    return Math.min(...product.variants.map((v) => v.price));
  }
  return product.basePrice ?? null;
}
