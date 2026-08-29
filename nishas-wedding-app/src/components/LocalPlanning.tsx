import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import {
  KeyIcon,
  UsersIcon,
  TruckIcon,
  BoltIcon,
  CloudIcon,
  CompassIcon,
} from "./icons";

const items = [
  {
    icon: KeyIcon,
    title: "Private Access & Setup",
    text: "Timely access, structured setup and smooth execution.",
  },
  {
    icon: UsersIcon,
    title: "Guest & Vehicle Management",
    text: "Planned movement, parking guidance and guest comfort.",
  },
  {
    icon: TruckIcon,
    title: "Catering Production & Transport",
    text: "Hygienic production, safe transport and on-time service.",
  },
  {
    icon: BoltIcon,
    title: "Power & Technical Readiness",
    text: "Backup power, technical checks and on-ground readiness.",
  },
  {
    icon: CloudIcon,
    title: "Weather Contingency",
    text: "Monsoon and summer plans for uninterrupted celebrations.",
  },
  {
    icon: CompassIcon,
    title: "Outstation Guest Hospitality",
    text: "Hotel coordination, airport/rail assistance and guest care.",
  },
];

export default function LocalPlanning() {
  return (
    <section className="border-t border-black/10 py-1 sm:py-5">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-5 lg:px-8">
        <SectionHeading title="Local Planning & Readiness in Bhopal" />

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {items.map(({ icon: Icon, title, text }, i) => (
            <ScrollReveal
              key={title}
              delay={i * 150}
              duration={850}
              variant="right"
              className="h-full"
            >
              <div className="flex h-full items-start gap-2 rounded-md bg-white px-3 py-4 text-left">
                <Icon className="h-12 w-12 shrink-0 text-gold" />
                <div>
                  <h3 className="font-display text-sm font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                    {text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
