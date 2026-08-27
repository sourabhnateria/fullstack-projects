"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { QuoteIcon, StarIcon, ArrowRightIcon } from "./icons";

const reviews = [
  {
    text: "From planning to execution, everything was handled with so much grace and discipline. The food, décor and hospitality were beyond our expectations.",
    name: "A Family from Bhopal",
  },
  {
    text: "N I S H A' S truly understands what a family needs for a wedding. Pure vegetarian food, beautiful setups and a team that is always one step ahead.",
    name: "A Family from Bhopal",
  },
  {
    text: "Our outstation guests were very well taken care of. The team managed everything so smoothly that we could actually enjoy our own functions.",
    name: "A Family from Bhopal",
  },
];

export default function Testimonials() {
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = () => setStart((s) => (s - 1 + reviews.length) % reviews.length);
  const next = () => setStart((s) => (s + 1) % reviews.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setStart((s) => (s + 1) % reviews.length),
      5000,
    );
    return () => clearInterval(id);
  }, [paused]);

  const visible = [
    reviews[start],
    reviews[(start + 1) % reviews.length],
    reviews[(start + 2) % reviews.length],
  ];

  return (
    <section className="bg-navy py-1 sm:py-5">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-5 lg:px-8">
        <SectionHeading title="What Families Say" light />

        <div
          className="mt-5 flex items-center gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-gold hover:text-gold sm:flex"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
          </button>

          <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
            {visible.map((r, i) => (
              <ScrollReveal
                key={`${r.name}-${start}-${i}`}
                delay={i * 140}
                variant="up"
              >
                <div className="rounded-md bg-navy-light p-4">
                  <QuoteIcon className="h-5 w-5 text-gold" />
                  <div className="mt-2 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <StarIcon key={s} className="h-3.5 w-3.5 text-gold" />
                    ))}
                  </div>
                  <p className="mt-2 text-[13px] leading-snug text-white/80">
                    {r.text}
                  </p>
                  <p className="mt-2 text-[12px] text-white/50">— {r.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-gold hover:text-gold sm:flex"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex justify-center">
          <a
            href="https://www.google.com/search?q=NISHA's+weddings+reviews"
            className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-6 py-3 text-xs font-semibold uppercase tracking-wide-xs text-white transition hover:border-gold hover:text-gold"
          >
            View More Reviews on Google
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
