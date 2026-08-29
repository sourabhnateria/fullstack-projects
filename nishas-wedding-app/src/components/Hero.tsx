import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { ArrowRightIcon } from "./icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gold-dark">
      <Image
        src="/images/hero-img.png"
        alt="Illuminated wedding mandap on the riverside ghats at dusk"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2b1a06] from-0% via-[#2b1a06]/75 via-20% to-transparent to-50%" />

      <div className="relative mx-auto max-w-7xl 2xl:max-w-[1600px] px-5 py-1 sm:py-5 lg:px-8">
        <ScrollReveal variant="up" duration={900} className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-wide-xs text-gold">
            Weddings in Bhopal
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Pure Vegetarian
            <br />
            Luxury Weddings
            <br />
            in <span className="text-gold">Bhopal</span>
          </h1>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/75 sm:text-sm">
            N I S H A&apos; S brings complete wedding planning, pure vegetarian
            luxury catering, gracious guest hospitality, refined décor and
            disciplined event execution together under one trusted house.
          </p>
          <a
            href="#contact"
            className="btn-gold mt-6 inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-xs font-semibold uppercase tracking-wide-xs transition hover:brightness-105"
          >
            Request a Private Consultation
            <ArrowRightIcon />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
