"use client";
import { useMemo, useState } from "react";
import { Product } from "../../types/product";
import { categoryNameOf, categorySlugOf } from "../../lib/products";
import ProductCard from "./ProductCard";

export default function ShopGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState<string>("all");

  const tabs = useMemo(() => {
    const seen = new Map<string, string>();
    products.forEach((p) => {
      const slug = categorySlugOf(p);
      const name = categoryNameOf(p);
      if (slug && name && !seen.has(slug)) seen.set(slug, name);
    });
    return [
      { name: "All", slug: "all" },
      ...Array.from(seen, ([slug, name]) => ({ name, slug })),
    ];
  }, [products]);

  const filtered = useMemo(() => {
    if (active === "all") return products;
    return products.filter((p) => categorySlugOf(p) === active);
  }, [products, active]);

  return (
    <div>
      {tabs.length > 2 && (
        <div className="flex flex-wrap gap-2 pb-6 mb-10 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setActive(tab.slug)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                active === tab.slug
                  ? "border-amber-600 bg-amber-600 text-white"
                  : "border-gray-200 text-gray-600 hover:border-amber-600 hover:text-amber-600"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="p-16 text-center border border-gray-200 border-dashed rounded-lg">
          <p className="text-xl font-semibold text-gray-700">
            No coffees found here yet.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {products.length === 0
              ? "Check that your backend is running and your MongoDB catalog has been seeded."
              : "Try a different category."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
