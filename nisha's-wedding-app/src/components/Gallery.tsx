import Image from "next/image";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import CountUp from "./CountUp";
import { ArrowRightIcon } from "./icons";

const celebrations = [
  {
    src: "/images/celebration-traditional-wedding.png",
    alt: "Traditional wedding mandap with red, white and pink floral drapes",
    title: "Traditional Wedding",
    tags: "Full Planning | Catering | Décor | Hospitality",
    guestCount: 600,
  },
  {
    src: "/images/celebration-multiday.png",
    alt: "Palace venue lit up at night",
    title: "Multi-day Celebration",
    tags: "Planning | Catering | Production | Hospitality",
    guestCount: 1000,
  },
  {
    src: "/images/celebration-jain-wedding.png",
    alt: "Pastel floral mandap seating area",
    title: "Jain Wedding",
    tags: "Jain Catering | Décor | Hospitality",
    guestCount: 450,
  },
  {
    src: "/images/celebration-reception.png",
    alt: "Reception lounge with hanging string lights",
    title: "Reception Celebration",
    tags: "Décor | Catering | Hospitality | Production",
    guestCount: 800,
  },
];

export default function Gallery() {
  return (
    <section
      id="celebrations"
      className="border-t border-black/10 bg-cream py-1 sm:py-5"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-5 lg:px-8">
        <SectionHeading title="Real Celebrations in Bhopal" />

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {celebrations.map((c, i) => (
            <ScrollReveal
              key={c.title}
              delay={i * 130}
              variant="zoom"
              className="h-full"
            >
              <div className="group flex h-full flex-col overflow-hidden rounded-md border border-black/15 bg-white shadow-sm">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={c.src}
                    alt={c.alt}
                    fill
                    className="cursor-pointer object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="px-3 py-2.5">
                  <h3 className="font-display text-sm font-semibold text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-ink-muted">{c.tags}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide-xs text-gold-dark">
                    <CountUp end={c.guestCount} suffix="+ Guests" />
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="#celebrations"
            className="btn-gold inline-flex items-center gap-2 rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-wide-xs transition hover:brightness-105"
          >
            View More Celebrations
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
