// src/components/home/BannerCarousel.tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

// Base URL where the backend serves static files from backend/public.
// NEXT_API_URL is "http://localhost:5000/api/v1" (for API calls),
// but static files like images are served from the root, not under
// /api/v1, so we strip the path and keep just the origin
// (http://localhost:5000).
const API_URL = process.env.NEXT_API_URL || "http://localhost:5000/api/v1";
const BACKEND_URL = new URL(API_URL).origin;

// Banner ads live in backend/public/images/homepage/<filename>.
// Add or remove entries here to match the files you drop into that folder.
// `href` is where the banner links to when clicked.
// width/height are the source PNGs' real pixel dimensions, used to size the
// carousel to each banner's own aspect ratio so images never get cropped or
// letterboxed.
const banners = [
  // {
  //   image: `${BACKEND_URL}/images/homepage/hero-Banner-2-3.png`,
  //   alt: "Banner 1",
  //   href: "/shop",
  //   width: 1940,
  //   height: 600,
  // },
  {
    image: `${BACKEND_URL}/images/homepage/Bundle_Image_Maine_Page.png`,
    alt: "Banner 2",
    href: "/shop",
    width: 1940,
    height: 600,
  },
  {
    image: `${BACKEND_URL}/images/homepage/Hero_banner_website_Design-1.png`,
    alt: "Banner 3",
    href: "/shop",
    width: 1940,
    height: 600,
  },
  {
    image: `${BACKEND_URL}/images/homepage/Subscription_Banner_Main_Page.png`,
    alt: "Banner 4",
    href: "/shop",
    width: 1940,
    height: 600,
  },
];

const AUTOPLAY_MS = 5000;

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent((index + banners.length) % banners.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + banners.length) % banners.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrent((c) => (c + 1) % banners.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const timer = setInterval(goToNext, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  if (banners.length === 0) return null;

  return (
    <section
      // className="relative px-4 py-16 overflow-hidden bg-coffee-900"
      className="px-4 mx-auto max-w-7xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Promotional banners"
    >
      <div
        className="px-4 py-16 relative w-full transition-[aspect-ratio] duration-700 ease-in-out"
        style={{
          aspectRatio: `${banners[current].width} / ${banners[current].height}`,
        }}
      >
        {banners.map((banner, index) => (
          <Link
            key={banner.image}
            href={banner.href}
            className={` absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current
                ? "opacity-100 z-10 pointer-events-auto"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={index !== current}
            tabIndex={index === current ? 0 : -1}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={banner.image}
              alt={banner.alt}
              className="object-cover w-full h-full"
            />
          </Link>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          {/* Prev / Next arrows */}
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous banner"
            className="absolute z-20 flex items-center justify-center text-white transition -translate-y-1/2 rounded-full left-40 bottom-1/2 h-9 w-9 bg-black/30 hover:bg-black/50"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next banner"
            className="absolute z-20 flex items-center justify-center text-white transition -translate-y-1/2 rounded-full right-40 bottom-1/2 h-9 w-9 bg-black/30 hover:bg-black/50"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute z-20 flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
            {banners.map((banner, index) => (
              <button
                key={banner.image}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to banner ${index + 1}`}
                aria-current={index === current}
                className={`h-2.5 rounded-full transition-all ${
                  index === current ? "w-6 bg-white" : "w-2.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
