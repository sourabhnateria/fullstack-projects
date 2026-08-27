import Link from "next/link";

// Circular quick-links strip (mirrors the reference site's category-circle nav).
// `image` is left undefined until real photos are ready — until then each
// circle falls back to showing its own `alt` text in place of the image.
const LINKS: { label: string; href: string; alt: string; image?: string }[] = [
  { label: "Roaster Reveal", href: "/shop", alt: "Roaster Reveal" },
  { label: "Brew Guide", href: "/brew-guide", alt: "Brew Guide" },
];

export default function QuickLinks() {
  return (
    <section className="py-14 bg-paper">
      {/* Scroll-snap rail: each item takes half the row on mobile and a
          fifth on desktop, so it lays out as a plain grid until there are
          enough circles to overflow — then it becomes swipeable, no JS. */}
      <div className="flex justify-center gap-6 px-4 mx-auto overflow-x-auto max-w-7xl snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center flex-shrink-0 gap-4 basis-1/2 snap-start sm:basis-1/3 md:basis-1/5 group"
          >
            <div className="flex items-center justify-center w-full max-w-[176px] aspect-square p-4 overflow-hidden text-center transition rounded-full mx-auto bg-coffee-100 group-hover:bg-coffee-200">
              {link.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={link.image}
                  alt={link.alt}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-xs font-semibold tracking-wide uppercase text-coffee-700">
                  {link.alt}
                </span>
              )}
            </div>
            <span className="text-sm font-bold tracking-wide text-center uppercase text-coffee-900">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
