"use client";

import { useState, type FormEvent } from "react";
import {
  PinIcon,
  ClockIcon,
  PhoneIcon,
  ArrowRightIcon,
  WhatsAppIcon,
} from "./icons";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          weddingDate: form.get("weddingDate"),
          celebrationType: form.get("celebrationType"),
          message: form.get("message"),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error || "Something went wrong. Please try again.",
        );
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-navy py-1 sm:py-5">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-5 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1.3fr_0.9fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Let&apos;s Plan Your Celebration in Bhopal
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              We would be honoured to understand your vision and help plan a
              celebration your family will always cherish.
            </p>

            <div className="mt-5 space-y-3 text-[13px] text-white/70">
              <div className="flex gap-3">
                <PinIcon className="h-5 w-5 shrink-0 text-gold" />
                <p>
                  N I S H A&apos; S — Hoshangabad Road,,
                  <br />
                  Bhopal, Madhya Pradesh462026
                </p>
              </div>
              <div className="flex gap-3">
                <ClockIcon className="h-5 w-5 shrink-0 text-gold" />
                <p>
                  Mon – Sun: 10 AM – 8 PM
                  <br />
                  Also serving Indore &amp; Jabalpur
                </p>
              </div>
              <div className="flex gap-3">
                <PhoneIcon className="h-5 w-5 shrink-0 text-gold" />
                <p>+91 9999999999</p>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-navy-light p-5 sm:p-6">
            <h3 className="font-display text-lg font-semibold text-white">
              Request a Private Consultation
            </h3>

            {submitted ? (
              <p className="mt-6 text-sm text-gold">
                Thank you — we&apos;ve received your request and will be in
                touch shortly.
              </p>
            ) : (
              <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Your Name*"
                    className="rounded-sm border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                  />
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="Phone Number*"
                    className="rounded-sm border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email Address*"
                    className="rounded-sm border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                  />
                  <input
                    name="weddingDate"
                    type="date"
                    placeholder="Wedding Date (if fixed)"
                    className="rounded-sm border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                  />
                </div>

                <select
                  name="celebrationType"
                  defaultValue=""
                  className="w-full rounded-sm border border-white/15 bg-transparent px-4 py-3 text-sm text-white/70 focus:border-gold focus:outline-none"
                >
                  <option value="" disabled className="text-ink">
                    Type of Celebration
                  </option>
                  {[
                    "Wedding",
                    "Reception",
                    "Engagement",
                    "Multi-day Celebration",
                    "Other",
                  ].map((o) => (
                    <option key={o} value={o} className="text-ink">
                      {o}
                    </option>
                  ))}
                </select>

                <textarea
                  name="message"
                  rows={2}
                  placeholder="Message"
                  className="w-full rounded-sm border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                />

                {error && <p className="text-xs text-red-400">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold inline-flex items-center gap-2 rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-wide-xs transition hover:brightness-105 disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Request Consultation"}
                  <ArrowRightIcon />
                </button>
              </form>
            )}
          </div>

          <div className="rounded-md border border-white/10 bg-navy-light p-5">
            <h3 className="font-display text-base font-semibold text-white">
              Or WhatsApp Us
            </h3>
            <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white">
              <WhatsAppIcon className="h-6 w-6" />
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-white/70">
              Share a few details and we will get back to you.
            </p>
            <a
              href="https://wa.me/918175004069"
              className="mt-4 inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-xs font-semibold uppercase tracking-wide-xs text-white transition hover:brightness-95"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
