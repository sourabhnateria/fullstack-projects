// src/app/shop/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductBySlug,
  getAllProducts,
  categoryNameOf,
  categorySlugOf,
} from "../../../lib/products";
import ProductDetailContent from "../../../components/shop/ProductDetailContent";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found | Five Roam Coffee" };
  return {
    title: `${product.name} | Five Roam Coffee`,
    description: product.shortDescription ?? product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const categoryName = categoryNameOf(product);
  const categorySlug = categorySlugOf(product);

  const allProducts = await getAllProducts();
  const related = allProducts
    .filter(
      (p) => p.slug !== product.slug && categorySlugOf(p) === categorySlug,
    )
    .slice(0, 4);

  return (
    <div className="px-4 py-16 mx-auto max-w-7xl">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/shop" className="hover:text-amber-600">
          Our Coffee
        </Link>
        {categoryName && (
          <>
            <span className="mx-2">/</span>
            <span>{categoryName}</span>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <ProductDetailContent
        product={product}
        categoryName={categoryName}
        related={related}
      />
    </div>
  );
}
