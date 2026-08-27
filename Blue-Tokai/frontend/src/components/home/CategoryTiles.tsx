import Link from "next/link";
import { Coffee, Flame, ShoppingBag, Package } from "lucide-react";
import { Category } from "../../types/product";

const GRADIENTS = [
  "from-coffee-700 to-coffee-900",
  "from-coffee-400 to-coffee-700",
  "from-coffee-300 to-coffee-600",
];

const ICONS: Record<string, typeof Coffee> = {
  coffee: Coffee,
  equipment: Flame,
  merchandise: ShoppingBag,
};

export default function CategoryTiles({
  categories,
}: {
  categories: Category[];
}) {
  if (categories.length === 0) return null;

  return (
    <section className="px-4 py-16 mx-auto max-w-7xl">
      <h2 className="mb-10 text-3xl font-bold text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {categories.map((category, index) => {
          const Icon = ICONS[category.slug] ?? Package;
          const gradient = GRADIENTS[index % GRADIENTS.length];
          return (
            <Link
              key={category._id}
              href="/shop"
              className={`group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-lg bg-gradient-to-br text-white transition hover:opacity-90 ${gradient}`}
            >
              <Icon size={40} strokeWidth={1.5} />
              <span className="text-lg font-semibold tracking-wide">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
