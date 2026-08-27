import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import {
  LotusIcon,
  TagIcon,
  DocumentIcon,
  ChefHatIcon,
  ChairIcon,
  BadgeIcon,
} from "./icons";

const points = [
  { icon: LotusIcon, text: "Vegetarian-only handling protocol at all times" },
  { icon: TagIcon, text: "Labelled counters and separate serving lines" },
  {
    icon: DocumentIcon,
    text: "Advance documentation of Jain & Satvik requirements",
  },
  { icon: ChefHatIcon, text: "Trained service teams and chefs" },
  { icon: ChairIcon, text: "Dedicated preparation areas and utensils" },
  { icon: BadgeIcon, text: "FSSAI-licensed operations and regular audits" },
];

export default function PromiseOfPurity() {
  return (
    <section id="purity" className="border-t border-black/10 bg-white">
      <div className="mx-auto grid max-w-7xl 2xl:max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        <ScrollReveal
          variant="left"
          className="flex flex-col justify-center bg-white px-5 py-1 sm:py-5 lg:px-16"
        >
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            The Promise of Purity
          </h2>
          <Image
            src="/images/divider.png"
            alt=""
            width={1000}
            height={150}
            className="mt-3 h-6 w-48"
          />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted">
            For us, purity is not a statement. It is a discipline we follow in
            every kitchen, at every counter, for every celebration.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {points.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-10 w-10 shrink-0 text-gold" />
                <p className="text-[13px] leading-snug text-ink-muted">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal
          variant="right"
          className="relative min-h-[320px] border-l border-black/10"
        >
          <Image
            src="/images/purity-thali.png"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Pure vegetarian thali spread with a lit diya"
            fill
            className="object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/70 to-transparent sm:w-14 lg:w-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </ScrollReveal>
      </div>
    </section>
  );
}
