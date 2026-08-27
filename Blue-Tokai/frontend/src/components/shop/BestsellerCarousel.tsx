"use client";

import { useRef } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "../../types/product";

export default function BestsellerCarousel({
  bestsellers,
}: {
  bestsellers: Product[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -el.clientWidth * 0.8 : el.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 overflow-hidden bg-gray-50">
      <div className="relative px-0 mx-auto max-w-7xl">
        <div
          aria-hidden="true"
          className="absolute hidden w-56 -right-6 -top-14 h-44 sm:block"
          style={{
            backgroundImage:
              "radial-gradient(circle, #7dd3fc 1.5px, transparent 1.5px)",
            backgroundSize: "12px 15px",
            maskImage:
              "radial-gradient(ellipse at top right, black 35%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at top right, black 35%, transparent 70%)",
          }}
        />

        <h2 className="relative mb-8 font-serif text-5xl text-gray-900 ">
          Bestseller Coffees
        </h2>

        {bestsellers.length > 0 ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="absolute z-10 items-center justify-center hidden -translate-x-4 -translate-y-1/2 -left-10 top-1/2 md:flex"
            >
              <span className="text-2xl text-gray-700">←</span>
            </button>

            <div
              ref={scrollRef}
              className="flex gap-10 pb-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {bestsellers.map((product) => (
                <div key={product._id} className="w-72 shrink-0 snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="absolute z-10 items-center justify-center hidden translate-x-4 -translate-y-1/2 -right-10 top-1/2 md:flex"
            >
              <span className="text-2xl text-gray-700">→</span>
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Check that your backend is running and your MongoDB catalog has been
            seeded.
          </p>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-block px-6 py-3 font-semibold transition border rounded-md border-coffee-900 hover:bg-coffee-900 hover:text-white"
          >
            View All Coffee
          </Link>
        </div>
      </div>
    </section>
  );
}
