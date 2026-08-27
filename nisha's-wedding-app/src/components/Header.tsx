"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "./icons";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  {
    label: "Services",
    href: "#services",
    children: [
      "Complete Wedding Planning",
      "Pure Vegetarian Luxury Catering",
      "Jain & Satvik Catering",
      "Guest Hospitality",
      "Décor & Styling",
      "Event Production & Infrastructure",
    ],
  },
  { label: "Celebrations", href: "#celebrations" },
  { label: "The Promise of Purity", href: "#purity" },
  {
    label: "Cities",
    href: "#cities",
    children: ["Bhopal", "Indore", "Jabalpur"],
  },
  { label: "Journal", href: "#journal" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-all duration-300 ${
        scrolled ? "bg-navy/95 shadow-md backdrop-blur-sm" : "bg-navy"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl 2xl:max-w-[1600px] items-center justify-between gap-6 px-5 lg:px-8 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <a href="#" className="shrink-0">
          <div className="font-display text-xl font-semibold tracking-wide-xs">
            N I S H A&apos; S
            <span className="align-super text-[0.5em] text-gold">°</span>
          </div>
          <div className="text-[10px] leading-tight text-white/60">
            Pure Vegetarian Luxury Weddings
            <br />
            Crafted End-to-End
          </div>
        </a>

        <nav className="hidden items-center gap-4 xl:flex">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              <a
                href={item.href}
                className="flex items-center gap-1 whitespace-nowrap text-[13px] font-medium uppercase tracking-wide-xs text-white/85 transition hover:text-gold"
              >
                {item.label}
                {item.children && <ChevronDownIcon className="h-3.5 w-3.5" />}
              </a>
              {item.children && (
                <div className="invisible absolute left-0 top-full min-w-[220px] rounded-md border border-white/10 bg-navy-light py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <a
                      key={child}
                      href="#"
                      className="block px-4 py-2 text-[13px] text-white/80 hover:bg-white/5 hover:text-gold"
                    >
                      {child}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden shrink-0 rounded-sm border border-gold px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wide-xs text-gold transition hover:bg-gold hover:text-navy xl:inline-block"
        >
          Request a Consultation
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 xl:hidden"
        >
          <span
            className={`h-px w-6 bg-white transition ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-white transition ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-white transition ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy-dark px-5 py-4 xl:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium uppercase tracking-wide-xs text-white/85 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 inline-block rounded-sm border border-gold px-5 py-2.5 text-center text-[12px] font-semibold uppercase tracking-wide-xs text-gold"
            >
              Request a Consultation
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
