// src/app/about/page.tsx
import Link from "next/link";

export const metadata = {
  title: "About Us | Five Roam Coffee",
  description:
    "Every Origin Has a Story. Learn how Five Roam Coffee sources, roasts, and shares single-origin Arabica.",
};

export default function AboutPage() {
  return (
    <div className="px-4 py-16 mx-auto max-w-5xl">
      <div className="mb-16 text-center">
        <p className="mb-3 text-sm tracking-widest uppercase text-amber-600">
          Our Story
        </p>
        <h1 className="text-4xl font-bold text-coffee-900 md:text-5xl">
          Every Origin Has a Story
        </h1>
        <p className="max-w-2xl mx-auto mt-5 text-lg text-gray-600">
          We started with a simple idea: coffee shouldn&apos;t be anonymous.
          Instead of blending beans until every bag tastes the same, we work
          estate by estate.
        </p>
      </div>

      <div className="grid gap-10 mb-20 md:grid-cols-3">
        <div>
          <div className="mb-3 text-3xl">🌱</div>
          <h3 className="mb-2 text-lg font-semibold text-coffee-900">
            Estate Selected
          </h3>
          <p className="text-sm leading-relaxed text-gray-600">
            Every coffee is sourced from a specific estate, chosen for its
            terroir, altitude, and the craftsmanship of the people who grow
            it.
          </p>
        </div>
        <div>
          <div className="mb-3 text-3xl">🔥</div>
          <h3 className="mb-2 text-lg font-semibold text-coffee-900">
            Roasted to Reveal
          </h3>
          <p className="text-sm leading-relaxed text-gray-600">
            Small-batch roasting profiles are built to express each origin&apos;s
            natural flavor, not mask it with a heavy roast.
          </p>
        </div>
        <div>
          <div className="mb-3 text-3xl">☕</div>
          <h3 className="mb-2 text-lg font-semibold text-coffee-900">
            Brew Your Way
          </h3>
          <p className="text-sm leading-relaxed text-gray-600">
            Whole bean or ground fresh to order, matched to your preferred
            brewing method — from French press to espresso.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6 leading-relaxed text-gray-600">
        <h2 className="text-2xl font-bold text-coffee-900">How We Work</h2>
        <p>
          Five Roam Coffee began with a straightforward frustration: most
          coffee on the shelf tells you nothing about where it came from. We
          wanted every bag to carry the story of a single estate — the soil,
          the altitude, the processing method, and the people behind it.
        </p>
        <p>
          We roast in small batches, tasting and adjusting each profile until
          it reveals the character of that specific origin, rather than
          flattening it into a generic &ldquo;house blend&rdquo; taste. That means
          our lineup changes as seasons and harvests change — but the promise
          stays the same: what&apos;s on the label is what&apos;s in the cup.
        </p>
        <p>
          Today, that means working directly with estates across India&apos;s
          coffee-growing regions, roasting to order, and shipping fresh beans
          straight to your door.
        </p>
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/shop"
          className="inline-block px-6 py-3 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700"
        >
          Explore Our Coffee
        </Link>
      </div>
    </div>
  );
}
