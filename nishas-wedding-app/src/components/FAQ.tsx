"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { PlusIcon } from "./icons";

const faqs = [
  {
    q: "Does N I S H A' S provide complete wedding planning in Bhopal?",
    a: "Yes. We handle planning, catering, hospitality, décor and event production together, end to end, under one house.",
  },
  {
    q: "Is all catering provided by N I S H A' S pure vegetarian?",
    a: "Yes, every menu we serve — across all events and cities — is 100% pure vegetarian, with Jain and Satvik options available.",
  },
  {
    q: "Do you arrange Jain and Satvik wedding menus?",
    a: "Yes. We document requirements in advance and use dedicated preparation areas, utensils and labelled serving lines.",
  },
  {
    q: "Can you manage catering, hospitality and décor together?",
    a: "Yes — that is our core model. One accountable team plans and executes every function, so nothing falls between departments.",
  },
  {
    q: "Do you handle multi-day weddings and multiple functions?",
    a: "Yes. We plan and staff every function across multi-day celebrations, from the first ritual to the final farewell.",
  },
  {
    q: "How early should we begin planning our wedding?",
    a: "We recommend starting 6–12 months ahead for peak season, though we can also plan shorter-notice celebrations.",
  },
  {
    q: "Does N I S H A' S serve areas outside Bhopal?",
    a: "Yes, we also serve Lucknow, Varanasi, Bhadohi and Kanpur, alongside nearby areas around Bhopal.",
  },
  {
    q: "How do we get started with N I S H A' S?",
    a: "Request a private consultation using the form below or WhatsApp us — we'll schedule a call to understand your vision.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm font-medium text-ink"
      >
        {q}
        <PlusIcon
          className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        />
      </button>
      <div
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div ref={contentRef}>
          <p className="pb-3 text-[13px] leading-relaxed text-ink-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const half = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, half);
  const right = faqs.slice(half);

  return (
    <section className="bg-white py-1 sm:py-5">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1440px] px-5 lg:px-8">
        <SectionHeading title="Frequently Asked Questions" />

        <div className="mt-5 grid grid-cols-1 gap-x-12 lg:grid-cols-2">
          <ScrollReveal variant="left">
            {left.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </ScrollReveal>
          <ScrollReveal variant="right">
            {right.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
