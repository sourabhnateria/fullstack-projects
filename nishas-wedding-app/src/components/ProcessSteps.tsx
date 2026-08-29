import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { ArrowRightIcon } from "./icons";

const midpoints = [20, 40, 60, 80];

const steps = [
  {
    title: "Private Consultation",
    text: "We understand your family, vision, preferences, budget and priorities.",
  },
  {
    title: "Requirement & Venue Understanding",
    text: "We study the venue, logistics, guest flow and function requirements.",
  },
  {
    title: "Celebration Design & Planning",
    text: "We design the experience, menus, décor, hospitality and execution plan.",
  },
  {
    title: "Production & Readiness",
    text: "We prepare, coordinate and test everything for a smooth celebration.",
  },
  {
    title: "Event-Day Command & Closure",
    text: "Our team runs every detail with discipline and finishes with grace.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="border-t border-black/10 bg-cream py-1 sm:py-5">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-5 lg:px-8">
        <SectionHeading title="How We Plan Weddings in Bhopal" />

        <div className="relative mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <ScrollReveal
            variant="growX"
            duration={1400}
            className="absolute top-6 left-[10%] right-[10%] hidden border-t-2 border-dotted border-gold/50 lg:block"
          />
          {midpoints.map((pos) => (
            <ScrollReveal
              key={pos}
              variant="fade"
              delay={((pos - 10) / 80) * 1400}
              duration={380}
              className="absolute top-6 z-10 hidden -translate-y-1/2 -translate-x-1/2 text-gold/70 lg:block"
              style={{ left: `${pos}%` }}
            >
              <ArrowRightIcon className="block h-4 w-4" />
            </ScrollReveal>
          ))}
          {steps.map((step, i) => (
            <ScrollReveal
              key={step.title}
              delay={i * 170}
              duration={850}
              variant="right"
            >
              <div className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-navy font-display text-lg font-semibold text-gold">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-display text-sm font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                  {step.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
