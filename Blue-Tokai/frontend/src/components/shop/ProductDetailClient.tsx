"use client";
import { useState } from "react";
import { useCartStore } from "../../lib/cart-store";
import { Product } from "../../types/product";

export default function ProductDetailClient({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const variants = product.variants ?? [];
  const [variantIndex, setVariantIndex] = useState(0);
  const [grind, setGrind] = useState(product.grindOptions?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = variants[variantIndex];

  const handleAddToCart = () => {
    if (!variant) return;
    addItem({
      productId: product._id,
      variant: { size: variant.size, price: variant.price, sku: variant.sku },
      grindOption: grind,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {variants.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-sm font-semibold text-gray-700">Size</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v, i) => (
              <button
                key={v.sku ?? i}
                type="button"
                onClick={() => setVariantIndex(i)}
                disabled={v.stock === 0}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                  i === variantIndex
                    ? "border-amber-600 bg-amber-600 text-white"
                    : "border-gray-200 text-gray-700 hover:border-amber-600"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.grindOptions && product.grindOptions.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-sm font-semibold text-gray-700">Grind</p>
          <div className="flex flex-wrap gap-2">
            {product.grindOptions.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGrind(g)}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                  g === grind
                    ? "border-amber-600 bg-amber-600 text-white"
                    : "border-gray-200 text-gray-700 hover:border-amber-600"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold text-gray-700">Quantity</p>
        <div className="flex items-center w-32 border border-gray-200 rounded-md">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex-1 py-2 text-lg hover:bg-gray-50"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="flex-1 text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex-1 py-2 text-lg hover:bg-gray-50"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="mb-6 text-2xl font-bold text-coffee-900">
        {variant ? `₹${variant.price * quantity}` : "Currently unavailable"}
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!variant || variant.stock === 0}
        className="w-full py-3 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {added
          ? "Added to Cart ✓"
          : variant?.stock === 0
            ? "Out of Stock"
            : "Add to Cart"}
      </button>
    </div>
  );
}
