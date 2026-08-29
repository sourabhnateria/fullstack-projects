import { ShieldIcon, UsersIcon, BadgeIcon, HeartIcon } from "./icons";

const items = [
  {
    icon: ShieldIcon,
    title: "The Promise of Purity",
    text: "Pure vegetarian. Always. Everywhere.",
  },
  {
    icon: UsersIcon,
    title: "One House. One Responsibility",
    text: "Planning, Catering, Hospitality, Décor & Execution.",
  },
  {
    icon: BadgeIcon,
    title: "FSSAI-Licensed Operations",
    text: "Hygiene, safety and compliance you can trust.",
  },
  {
    icon: HeartIcon,
    title: "Family Trust, Discreet Service",
    text: "Privacy, respect and warmth at every step.",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-navy">
      <div className="mx-auto grid max-w-7xl 2xl:max-w-[1600px] grid-cols-1 gap-6 px-5 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon className="h-14 w-14 shrink-0 text-gold" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide-xs text-gold">
                {title}
              </p>
              <p className="mt-1 text-[12px] leading-snug text-white/70">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
