"use client";

import { useState } from "react";
import { Category, Product } from "../../types/product";

export interface ProductFormPayload {
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  roastLevel: string;
  tastingNotes: string[];
  grindOptions: string[];
  images: string[];
  isSubscriptionEligible: boolean;
  variants: { size: string; price: number; stock: number; sku: string }[];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function categoryIdOf(product?: Product | null): string {
  if (!product?.category) return "";
  return typeof product.category === "string"
    ? product.category
    : product.category._id;
}

export default function ProductForm({
  product,
  categories,
  onSubmit,
  onCancel,
  submitting,
}: {
  product?: Product | null;
  categories: Category[];
  onSubmit: (payload: ProductFormPayload) => void;
  onCancel: () => void;
  submitting: boolean;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!product);
  const [category, setCategory] = useState(categoryIdOf(product));
  const [shortDescription, setShortDescription] = useState(
    product?.shortDescription ?? "",
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [roastLevel, setRoastLevel] = useState(product?.roastLevel ?? "");
  const [tastingNotes, setTastingNotes] = useState(
    (product?.tastingNotes ?? []).join(", "),
  );
  const [grindOptions, setGrindOptions] = useState(
    (product?.grindOptions ?? []).join(", "),
  );
  const [images, setImages] = useState((product?.images ?? []).join(", "));
  const [isSubscriptionEligible, setIsSubscriptionEligible] = useState(
    product?.isSubscriptionEligible ?? false,
  );
  const [variants, setVariants] = useState(
    product?.variants && product.variants.length > 0
      ? product.variants.map((v) => ({
          size: v.size,
          price: String(v.price),
          stock: String(v.stock),
          sku: v.sku,
        }))
      : [{ size: "", price: "", stock: "", sku: "" }],
  );

  const updateVariant = (
    index: number,
    field: "size" | "price" | "stock" | "sku",
    value: string,
  ) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)),
    );
  };

  const addVariant = () =>
    setVariants((prev) => [...prev, { size: "", price: "", stock: "", sku: "" }]);

  const removeVariant = (index: number) =>
    setVariants((prev) => prev.filter((_, i) => i !== index));

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      slug,
      category,
      shortDescription,
      description,
      roastLevel,
      tastingNotes: tastingNotes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      grindOptions: grindOptions
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      images: images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      isSubscriptionEligible,
      variants: variants
        .filter((v) => v.size && v.price)
        .map((v) => ({
          size: v.size,
          price: Number(v.price),
          stock: Number(v.stock) || 0,
          sku: v.sku,
        })),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Roast Level
          </label>
          <input
            type="text"
            placeholder="Light / Medium / Dark"
            value={roastLevel}
            onChange={(e) => setRoastLevel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Short Description
        </label>
        <input
          type="text"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Full Description
        </label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Tasting Notes (comma separated)
          </label>
          <input
            type="text"
            placeholder="Hazelnut, Cocoa, Caramel"
            value={tastingNotes}
            onChange={(e) => setTastingNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Grind Options (comma separated)
          </label>
          <input
            type="text"
            placeholder="Whole Bean, Filter, Espresso"
            value={grindOptions}
            onChange={(e) => setGrindOptions(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Image URLs (comma separated)
        </label>
        <input
          type="text"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={isSubscriptionEligible}
          onChange={(e) => setIsSubscriptionEligible(e.target.checked)}
          className="rounded text-amber-600 focus:ring-amber-500"
        />
        Subscription Eligible
      </label>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Variants (size / price / stock / sku)
          </label>
          <button
            type="button"
            onClick={addVariant}
            className="text-sm font-medium text-amber-600 hover:underline"
          >
            + Add variant
          </button>
        </div>
        <div className="space-y-2">
          {variants.map((v, i) => (
            <div key={i} className="grid grid-cols-12 gap-2">
              <input
                type="text"
                placeholder="Size (250g)"
                value={v.size}
                onChange={(e) => updateVariant(i, "size", e.target.value)}
                className="col-span-4 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={v.price}
                onChange={(e) => updateVariant(i, "price", e.target.value)}
                className="col-span-3 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                placeholder="Stock"
                value={v.stock}
                onChange={(e) => updateVariant(i, "stock", e.target.value)}
                className="col-span-2 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="SKU"
                value={v.sku}
                onChange={(e) => updateVariant(i, "sku", e.target.value)}
                className="col-span-2 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => removeVariant(i)}
                disabled={variants.length === 1}
                className="col-span-1 text-sm text-red-500 hover:underline disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : product ? "Save Changes" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 font-semibold text-gray-700 transition border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
