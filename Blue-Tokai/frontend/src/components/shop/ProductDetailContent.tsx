import { Product } from "../../types/product";
import ProductDetailClient from "./ProductDetailClient";
import ProductCard from "./ProductCard";

export default function ProductDetailContent({
  product,
  categoryName,
  related,
}: {
  product: Product;
  categoryName?: string | null;
  related: Product[];
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-center bg-gray-100 rounded-lg h-96">
            {product.images && product.images.length > 0 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <span className="text-sm text-gray-400">{product.name}</span>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {product.images.slice(1, 5).map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt={`${product.name} ${i + 2}`}
                  className="object-cover w-full h-20 rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {categoryName && (
              <span className="px-2 py-0.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-full">
                {categoryName}
              </span>
            )}
            {product.roastLevel && (
              <span className="px-2 py-0.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-full">
                {product.roastLevel} Roast
              </span>
            )}
            {product.isSubscriptionEligible && (
              <span className="px-2 py-0.5 text-xs font-medium border rounded-full border-amber-600 text-amber-600">
                Subscription Eligible
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-coffee-900">{product.name}</h1>

          {product.ratings?.average && (
            <p className="mt-2 text-sm text-gray-500">
              ★ {product.ratings.average.toFixed(1)} (
              {product.ratings.count ?? 0} reviews)
            </p>
          )}

          {product.shortDescription && (
            <p className="mt-4 text-gray-600">{product.shortDescription}</p>
          )}

          {product.tastingNotes && product.tastingNotes.length > 0 && (
            <p className="mt-3 text-sm text-gray-500">
              Notes: {product.tastingNotes.join(" · ")}
            </p>
          )}

          <div className="pt-8 mt-8 border-t border-gray-200">
            <ProductDetailClient product={product} />
          </div>
        </div>
      </div>

      {product.description && (
        <div className="max-w-2xl pt-10 mt-16 border-t border-gray-200">
          <h2 className="text-xl font-bold text-coffee-900">The Full Story</h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            {product.description}
          </p>
        </div>
      )}

      {related.length > 0 && (
        <div className="pt-12 mt-20 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-coffee-900">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
