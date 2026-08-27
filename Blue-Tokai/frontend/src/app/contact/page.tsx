// src/app/contact/page.tsx
"use client";

import { useState, FormEvent } from "react";
import api from "../../lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      await api.post("/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(
        err?.response?.data?.message ?? "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="px-4 py-16 mx-auto max-w-3xl">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm tracking-widest uppercase text-amber-600">
          Get In Touch
        </p>
        <h1 className="text-4xl font-bold text-coffee-900 md:text-5xl">
          Contact Us
        </h1>
        <p className="max-w-xl mx-auto mt-5 text-lg text-gray-600">
          Questions about an order, wholesale, or just want to talk coffee?
          Send us a message.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-8 text-center border rounded-lg border-amber-200 bg-amber-50">
          <p className="text-lg font-semibold text-coffee-900">
            Thanks for reaching out!
          </p>
          <p className="mt-2 text-sm text-gray-600">
            We&apos;ve received your message and will get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={6}
              value={form.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full px-6 py-3 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
