import Link from "next/link";
import { Product } from "../../types/product";
import { startingPrice } from "../../lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const price = startingPrice(product);
  const image = product.images?.[0];
  const href = `/shop/${product.slug}`;

  return (
    <div className="block group">
      {/* Image, name: real navigation to the full page */}
      <a href={href} className="block">
        <div className="relative flex items-center justify-center h-64 overflow-hidden bg-[#f8f1e4]">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={product.name}
              className="object-contain w-full h-full p-15"
            />
          ) : (
            <span className="text-sm text-gray-400">{product.name}</span>
          )}

          {price != null ? (
            <span className="absolute bottom-3 left-3 bg-[#e3f1f4] px-3 py-1.5 text-sm font-semibold text-gray-900">
              ₹ {price.toLocaleString("en-IN")}
            </span>
          ) : (
            <span className="absolute bottom-3 left-3 bg-[#e3f1f4] px-3 py-1.5 text-sm font-semibold text-gray-500">
              Price unavailable
            </span>
          )}
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-bold tracking-wide text-gray-900 uppercase truncate">
            {product.name}
          </h3>
          {product.tastingNotes && product.tastingNotes.length > 0 && (
            <p className="mt-1 text-sm text-gray-500 truncate">
              {product.tastingNotes.join(" · ")}
            </p>
          )}
        </div>
      </a>

      <div className="flex items-stretch justify-between mt-3 overflow-hidden text-sm font-bold tracking-wide text-white uppercase bg-[#a8ced4]">
        {/* Buy Now: also real navigation */}
        <a href={href} className="flex-1 py-3 text-center">
          Buy Now
        </a>
        {/* "+": opens the quick-view popup */}
        <Link
          href={href}
          scroll={false}
          aria-label={`Quick view ${product.name}`}
          className="flex items-center justify-center w-12 text-lg text-gray-900 bg-white"
        >
          +
        </Link>
      </div>
    </div>
  );
}
