// src/app/shop/page.tsx
import { getAllProducts } from "../../lib/products";
import ShopGrid from "../../components/shop/ShopGrid";

export const metadata = {
  title: "Our Coffee | Five Roam Coffee",
  description:
    "Single-origin Arabica, roasted in small batches. Browse the full Five Roam Coffee catalog.",
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const BACKEND_URL = new URL(API_URL).origin;
export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto mb-20 max-w-7xl">
      <section>
        <div className="mx-auto max-w-7xl">
          <img
            src={`${BACKEND_URL}/images/products/every-origin-story-banner.png`}
            alt={"Hazelnut Zest Coffee"}
            className="object-cover w-full h-full"
          />
        </div>
      </section>
      <section>
        <div className="px-4 py-16 mb-12 text-center">
          <h1 className="text-4xl font-bold text-coffee-900 md:text-5xl">
            Our Coffee
          </h1>
          <p className="max-w-xl mx-auto mt-4 text-gray-600">
            Every bag traces back to a single estate. Browse everything
            we&apos;re currently roasting.
          </p>
        </div>
      </section>

      <ShopGrid products={products} />
    </div>
  );
}
