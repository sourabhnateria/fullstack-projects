// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ---- Hero Section ---- */}
      <section
        className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} // replace with your image
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Freshly Roasted Coffee, Delivered to Your Door
          </h1>
          <p className="mb-8 text-lg md:text-xl">
            Explore our single-origin coffees, signature blends, and
            subscriptions.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/shop"
              className="px-6 py-3 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700"
            >
              Shop Coffee
            </Link>
            <Link
              href="/subscriptions"
              className="px-6 py-3 font-semibold transition border border-white rounded-md hover:bg-white hover:text-black"
            >
              Explore Subscriptions
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Featured Products ---- */}
      <section className="px-4 py-16 mx-auto max-w-7xl">
        <h2 className="mb-10 text-3xl font-bold text-center">Bestsellers</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="overflow-hidden transition border rounded-lg group hover:shadow-lg"
            >
              <div className="flex items-center justify-center h-64 bg-gray-200">
                <span className="text-gray-500">Product Image</span>
                {/* Replace with: <img src={product.image} alt={product.name} className="object-cover w-full h-full" /> */}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold group-hover:text-amber-600">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {product.description}
                </p>
                <p className="mt-2 font-bold">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- Collections ---- */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl">
          <h2 className="mb-10 text-3xl font-bold text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="p-6 text-center transition bg-white rounded-lg shadow hover:shadow-md"
              >
                <div className="mb-2 text-3xl">{cat.icon}</div>
                <h3 className="font-medium">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Testimonials ---- */}
      <section className="px-4 py-16 mx-auto max-w-7xl">
        <h2 className="mb-10 text-3xl font-bold text-center">
          What Our Customers Say
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 bg-white rounded-lg shadow">
              <p className="italic text-gray-600">"{t.quote}"</p>
              <p className="mt-4 font-semibold">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Newsletter ---- */}
      <section className="py-16 text-white bg-amber-700">
        <div className="max-w-xl px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Stay in the loop</h2>
          <p className="mb-6">
            Get the latest on new releases, brewing tips, and exclusive offers.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 text-gray-900 rounded-md"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 text-white transition bg-black rounded-md hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

// ----------- Static demo data -----------
const featuredProducts = [
  {
    name: "Attikan Estate",
    slug: "attikan-estate",
    description: "Rich, bold, and earthy – a classic South Indian coffee.",
    price: 450,
  },
  {
    name: "Cold Brew Blend",
    slug: "cold-brew-blend",
    description: "Smooth and chocolatey, perfect for cold brewing.",
    price: 500,
  },
  {
    name: "Monsoon Malabar",
    slug: "monsoon-malabar",
    description: "Unique, mellow, and low acidity.",
    price: 480,
  },
];

const categories = [
  { name: "Coffee", slug: "coffee", href: "/shop/coffee", icon: "☕" },
  { name: "Equipment", slug: "equipment", href: "/shop/equipment", icon: "🛠️" },
  { name: "Merchandise", slug: "merch", href: "/shop/merchandise", icon: "🧢" },
  { name: "Gift Cards", slug: "gifts", href: "/gift-cards", icon: "🎁" },
];

const testimonials = [
  {
    quote: "Best coffee I’ve ever had. The freshness is unmatched!",
    name: "Rahul S.",
  },
  {
    quote: "Their subscription service keeps me caffeinated and happy.",
    name: "Priya M.",
  },
  {
    quote:
      "I love how detailed their brew guides are. A must for coffee lovers.",
    name: "Amit K.",
  },
];
// export default function Home() {
//   return <div>Hello, Blue Tokai!</div>;
// }
