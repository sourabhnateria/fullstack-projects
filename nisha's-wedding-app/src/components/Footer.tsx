import {
  PhoneIcon,
  MailIcon,
  PinIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedInIcon,
  PinterestIcon,
} from "./icons";

import Link from "next/link";

const columns = [
  {
    title: "Explore",
    links: [
      "About Us",
      "Services",
      "Celebrations",
      "The Promise of Purity",
      "Journal",
    ],
  },
  {
    title: "Cities We Serve",
    links: [
      "Weddings in Bhopal",
      "Weddings in Lucknow",
      "Weddings in Varanasi",
      "Weddings in Bhadohi",
      "Weddings in Kanpur",
    ],
  },
  {
    title: "Information",
    links: [
      "Privacy Policy",
      "Terms & Conditions",
      "Cancellation & Refund Policy",
      "Allergen Information",
      "Careers",
    ],
  },
];

const socials = [
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedInIcon,
  PinterestIcon,
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-5 py-4 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="font-display text-xl font-semibold tracking-wide-xs text-white">
              N I S H A&apos; S
              <span className="align-super text-[0.5em] text-gold">°</span>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-white/50">
              Pure Vegetarian Luxury Weddings
              <br />
              Crafted End-to-End
            </p>

            <p className="mt-3 text-[11px] text-white/40">
              A Unit of{" "}
              <Link
                href="https://sourabhnateria.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-gold"
              >
                Sourabh Nateria
              </Link>
            </p>
            <div className="mt-3 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-gold hover:text-gold"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-semibold uppercase tracking-wide-xs text-gold">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-white/60 hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wide-xs text-gold">
              Get in Touch
            </h4>
            <ul className="mt-3 space-y-2 text-[13px] text-white/60">
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-gold" />
                +91 9999999999
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="h-5 w-5 text-gold" />
                hello@NISHA&apos;s.com
              </li>
              <li className="flex items-start gap-2">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                Bhopal, Madhya Pradesh, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-3">
        <div className="mx-auto flex max-w-7xl 2xl:max-w-[1600px] flex-col items-center justify-between gap-2 text-[11px] text-white/40 sm:flex-row lg:px-8">
          <p>© 2026 N I S H A&apos; S°. All rights reserved.</p>
          <p>
            Website by{" "}
            <Link
              href="https://sourabhnateria.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-gold"
            >
              Sourabh Nateria
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
