import {
  HeartHandshake,
  Flame,
  Award,
  Package,
  FlaskConical,
  GraduationCap,
  Star,
} from "lucide-react";
import Link from "next/link";
import { getAllProducts, categoryNameOf } from "../lib/products";
import { getAllCategories } from "../lib/categories";
import ProductCard from "../components/shop/ProductCard";
import BannerCarousel from "../components/home/BannerCarousel";
import CategoryTiles from "../components/home/CategoryTiles";
import QuickLinks from "../components/home/QuickLinks";
import BestsellerCarousel from "../components/shop/BestsellerCarousel";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const BACKEND_URL = new URL(API_URL).origin;
export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);
  const coffeeProducts = products.filter((p) => categoryNameOf(p) === "Coffee");
  const bestsellers = (
    coffeeProducts.length > 0 ? coffeeProducts : products
  ).slice(0, 8);

  const processSteps = [
    {
      Icon: HeartHandshake,
      text: "WE WORK CLOSELY WITH INDIA'S BEST COFFEE GROWERS TO BRING YOU SUPERIOR QUALITY COFFEE.",
    },
    {
      Icon: Flame,
      text: "WE FRESHLY ROAST COFFEE USING STATE-OF-THE-ART PROBAT MACHINES - BRINGING OUT A RANGE OF UNIQUE FLAVOURS.",
    },
    {
      Icon: Award,
      text: "OUR TEAM OF Q-GRADERS SOURCE ONLY THE HIGHEST QUALITY SPECIALTY-GRADE LOTS.",
    },
    {
      Icon: Package,
      text: "WE GUARANTEE CARE AND HYGIENE IN PACKING ORDERS AND DESPATCH THROUGH TRUSTED PARTNERS.",
    },
    {
      Icon: FlaskConical,
      text: "BEFORE YOU GET YOUR COFFEE, WE CUP EVERY ROASTED BATCH TO ENSURE CONSISTENCY AND QUALITY.",
    },
    {
      Icon: GraduationCap,
      text: "WE ELEVATE BREWING EXPERIENCES OF COFFEE LOVERS THROUGH DEDICATED CUSTOMER SERVICE AND EDUCATIONAL SUPPORT.",
    },
  ];

  const happyCustomers = [
    {
      quote:
        "I started with the Estate Selects sampler and haven't gone back to store-bought coffee since. Every bag genuinely tastes like where it's from — Attikan is nothing like Malabar, the way it should be.",
      name: "Ananya Rao",
    },
    {
      quote:
        "What sold me was the freshness. My subscription arrives right as I'm running low, and the tasting notes on the bag actually match what's in the cup. It's part of my morning now.",
      name: "Rohan Verma",
    },
    {
      quote:
        "Five Roam turned me into someone who actually cares about coffee. The brew guides helped me dial in my pour-over, and their support team answered every question I had along the way.",
      name: "Meera Iyer",
    },
  ];
  return (
    <div className="min-h-screen">
      {/* ---- Hero ---- */}
      <BannerCarousel />

      {/* ---- Quick Links ---- */}
      <QuickLinks />

      <section>
        <div className="px-4 py-16 mx-auto max-w-7xl">
          <Link href="/shop/hazelnut-zest-coffee">
            <img
              src={`${BACKEND_URL}/images/homepage/hazelnut-zest-banner.png`}
              alt={"Hazelnut Zest Coffee"}
              className="object-cover w-full h-full"
            />
          </Link>
        </div>
      </section>

      {/* ---- Bestsellers ---- */}
      <BestsellerCarousel bestsellers={bestsellers} />

      {/* ---- Shop by Category ---- */}
      {/* <CategoryTiles categories={categories} /> */}

      {/* ---- New to Specialty Coffee? ---- */}
      <section className="px-4 py-16 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg aspect-video">
            <img
              src={`${BACKEND_URL}/images/homepage/NewToCoffee.jpg`}
              alt="New to Specialty Coffee"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-bold">
              New to <em className="italic">Specialty Coffee?</em>
            </h2>
            <p className="mb-6 text-gray-600">
              From roast levels to grind size, we&apos;ll help you find the
              right cup for how you actually brew at home.
            </p>
            <Link
              href="/brew-guide"
              className="inline-block px-6 py-3 font-semibold text-white transition rounded-md bg-coffee-900 hover:bg-coffee-800"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Brew More. Save More! ---- */}
      <section className="bg-paper">
        <div className="grid gap-10 px-4 py-16 mx-auto max-w-7xl md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 text-3xl font-bold">
              Brew <em className="italic">More.</em>{" "}
              <em className="italic">Save More!</em>
            </h2>
            <p className="mb-4 text-sm font-semibold tracking-wide text-gray-900 uppercase">
              When you get a subscription from us, you:
            </p>
            <ul className="mb-8 space-y-3 text-gray-600">
              <li>
                <span className="font-semibold text-gray-900">01 / Save</span>{" "}
                up to 20%
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  02 / Enjoy convenience
                </span>{" "}
                with doorstep deliveries
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  03 / Experiment more
                </span>{" "}
                with new and different coffees
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  04 / Customise
                </span>{" "}
                your plan completely
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  05 / Stay stocked
                </span>{" "}
                and never run out of coffee!
              </li>
            </ul>
            <Link
              href="/subscriptions"
              className="self-start inline-block p-2 text-sm font-bold tracking-wide uppercase transition rounded-md bg-coffee-100 text-coffee-900 hover:bg-coffee-200"
            >
              Subscribe Now
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg h-full min-h-[320px]">
            <img
              src={`${BACKEND_URL}/images/homepage/brew-more-save-more.jpg`}
              alt="Five Roam coffee subscription bags lined up beside a pour-over dripper and a mug of brewed coffee, lit by soft window light"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ---- Our Process ---- */}
      <section className="px-4 py-16 mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-lg aspect-video">
          <video
            src={`${BACKEND_URL}/videos/homepage/our-process.mp4`}
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
          />
        </div>

        {/* Below xl, the absolute-positioned diagram doesn't have room for
            its offset nodes without overflowing the viewport horizontally,
            so it's swapped for a plain stacked list at those sizes. */}
        <div className="hidden relative mx-auto mt-20 aspect-[520/420] max-w-4xl xl:block">
          {/* connecting dotted path */}
          <svg
            viewBox="0 0 520 420"
            className="absolute inset-0 w-full h-full"
            fill="none"
          >
            <path
              d="M 495 50 C 465 95, 425 85, 405 125
           S 335 185, 295 190
           S 195 225, 170 255
           S 125 295, 115 315
           S 85 355, 55 375"
              stroke="#D1A883"
              strokeWidth="2"
              strokeDasharray="1 8"
              strokeLinecap="round"
            />
          </svg>

          {/* Node 1 */}
          <div className="absolute top-[4%] right-[8%] w-[46%] text-right">
            <p className="mb-3 text-xs font-bold tracking-wide">
              WE WORK CLOSELY WITH INDIA&apos;S BEST COFFEE GROWERS TO BRING YOU
              SUPERIOR QUALITY COFFEE.
            </p>
            <span className="inline-flex items-center justify-center w-12 h-12 bg-white border-2 rounded-full border-coffee-200">
              <HeartHandshake className="w-5 h-5 text-coffee-900" />
            </span>
          </div>

          {/* Node 2 */}
          <div className="absolute top-[25%] left-[15%] w-[42%] text-right">
            <p className="mb-3 text-xs font-bold tracking-wide">
              WE FRESHLY ROAST COFFEE USING STATE-OF-THE-ART PROBAT MACHINES -
              BRINGING OUT A RANGE OF UNIQUE FLAVOURS.
            </p>
            <span className="inline-flex items-center justify-center w-12 h-12 ml-auto bg-white border-2 rounded-full border-coffee-200">
              <Flame className="w-5 h-5 text-coffee-900" />
            </span>
          </div>

          {/* Node 3 */}
          <div className="absolute top-[29%] -right-[20%] w-[38%]">
            <span className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-white border-2 rounded-full border-coffee-200">
              <Award className="w-5 h-5 text-coffee-900" />
            </span>
            <p className="text-xs font-bold tracking-wide">
              OUR TEAM OF Q-GRADERS SOURCE ONLY THE HIGHEST QUALITY
              SPECIALTY-GRADE LOTS.
            </p>
          </div>

          {/* Node 4 */}
          <div className="absolute top-[50%] -left-20 w-[40%] text-right">
            <p className="mb-3 text-xs font-bold tracking-wide">
              WE GUARANTEE CARE AND HYGIENE IN PACKING ORDERS AND DESPATCH
              THROUGH TRUSTED PARTNERS.
            </p>
            <span className="inline-flex items-center justify-center w-12 h-12 ml-auto bg-white border-2 rounded-full border-coffee-200">
              <Package className="w-5 h-5 text-coffee-900" />
            </span>
          </div>

          {/* Node 5 */}
          <div className="absolute top-[54%] left-[44%] w-[42%]">
            <span className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-white border-2 rounded-full border-coffee-200">
              <FlaskConical className="w-5 h-5 text-coffee-900" />
            </span>
            <p className="text-xs font-bold tracking-wide">
              BEFORE YOU GET YOUR COFFEE, WE CUP EVERY ROASTED BATCH TO ENSURE
              CONSISTENCY AND QUALITY.
            </p>
          </div>

          {/* Node 6 */}
          <div className="absolute top-[78%] left-[4%] w-[46%]">
            <span className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-white border-2 rounded-full border-coffee-200">
              <GraduationCap className="w-5 h-5 text-coffee-900" />
            </span>
            <p className="text-xs font-bold tracking-wide">
              WE ELEVATE BREWING EXPERIENCES OF COFFEE LOVERS THROUGH DEDICATED
              CUSTOMER SERVICE AND EDUCATIONAL SUPPORT.
            </p>
          </div>
        </div>

        <div className="grid gap-8 mt-16 sm:grid-cols-2 xl:hidden">
          {processSteps.map(({ Icon, text }, i) => (
            <div key={i}>
              <span className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-white border-2 rounded-full border-coffee-200">
                <Icon className="w-5 h-5 text-coffee-900" />
              </span>
              <p className="text-xs font-bold tracking-wide">{text}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/about"
            className="self-start inline-block p-2 text-sm font-bold tracking-wide text-center uppercase transition rounded-md bg-coffee-100 text-coffee-900 hover:bg-coffee-200"
          >
            Learn More
          </Link>
        </div>
      </section>

      <section className="bg-paper">
        <div className="max-w-6xl px-4 py-20 mx-auto">
          <div className="text-center mb-14">
            <span
              aria-hidden="true"
              className="block italic leading-none text-7xl text-amber-300"
              style={{
                fontFamily: "var(--font-display), Georgia, Cambria, serif",
              }}
            >
              &ldquo;
            </span>
            <h2 className="-mt-4 text-3xl font-bold md:text-4xl">
              Happy <em className="italic">Customers</em>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {happyCustomers.map((customer) => (
              <div
                key={customer.name}
                className="flex flex-col items-center px-8 py-10 text-center bg-white border rounded-lg border-amber-100"
              >
                <p className="mb-6 leading-relaxed text-gray-600">
                  {customer.quote}
                </p>
                <div className="flex gap-1 mb-4 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p className="text-xs font-bold tracking-widest text-coffee-900">
                  {customer.name.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
