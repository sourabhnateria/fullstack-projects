import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { ArrowRightIcon } from "./icons";
import {
  MandapIcon,
  PlatterIcon,
  LotusIcon,
  BellIcon,
  PaletteIcon,
  ChairIcon,
} from "./icons";

const services = [
  {
    icon: MandapIcon,
    title: "Complete Wedding Planning",
    text: "From first conversation to final farewell — we plan your celebration end to end.",
  },
  {
    icon: PlatterIcon,
    title: "Pure Vegetarian Luxury Catering",
    text: "Multi-cuisine menus, prepared with purity, presented with refinement.",
  },
  {
    icon: LotusIcon,
    title: "Jain & Satvik Catering",
    text: "Jain, Satvik, no onion, no garlic and other special requirements handled with care.",
  },
  {
    icon: BellIcon,
    title: "Guest Hospitality",
    text: "Comfort, welcome and attentive care for your guests, near and far.",
  },
  {
    icon: PaletteIcon,
    title: "Décor & Styling",
    text: "Elegant themes, sacred aesthetics and beautifully designed spaces.",
  },
  {
    icon: ChairIcon,
    title: "Event Production & Infrastructure",
    text: "Tentage, lighting, furniture, AV, logistics and on-ground execution.",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="border-t border-black/10 py-1 sm:py-5">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-5 lg:px-8">
        <SectionHeading title="A Complete Wedding House in Bhopal" />

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {services.map(({ icon: Icon, title, text }, i) => (
            <ScrollReveal
              key={title}
              delay={i * 120}
              duration={900}
              className="h-full"
            >
              <div className="flex h-full flex-col items-center rounded-md border border-black/15 bg-white px-4 py-5 text-center shadow-sm transition hover:shadow-md">
                <Icon className="h-14 w-14 text-gold" />
                <h3 className="mt-3 font-display text-base font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-muted">
                  {text}
                </p>
                <a
                  href="#contact"
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide-xs text-ink hover:text-gold-dark"
                >
                  Explore
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
