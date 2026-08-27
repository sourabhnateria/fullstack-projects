// src/app/brew-guide/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Brew Guide | Five Roam Coffee",
  description:
    "Step-by-step brewing guides for French Press, Pour-Over, Espresso, and South Indian Filter coffee.",
};

const guides = [
  {
    method: "French Press",
    ratio: "1:15 coffee to water",
    grind: "Coarse",
    time: "4 minutes",
    steps: [
      "Add coarsely ground coffee to the press (1g coffee per 15ml water).",
      "Pour hot water (94–96°C) over the grounds, saturating evenly.",
      "Stir gently and place the lid on with the plunger pulled up.",
      "Steep for 4 minutes, then press down slowly and evenly.",
      "Pour immediately to avoid over-extraction.",
    ],
  },
  {
    method: "Pour-Over",
    ratio: "1:16 coffee to water",
    grind: "Medium-fine",
    time: "3 minutes",
    steps: [
      "Rinse the paper filter with hot water and discard the rinse water.",
      "Add medium-fine ground coffee and level the bed.",
      "Bloom with double the coffee weight in water, wait 30 seconds.",
      "Pour the remaining water in slow, circular motions.",
      "Total brew time should land around 3 minutes.",
    ],
  },
  {
    method: "Espresso",
    ratio: "1:2 coffee to water",
    grind: "Fine",
    time: "25–30 seconds",
    steps: [
      "Dose finely ground coffee into the portafilter and level it.",
      "Tamp firmly and evenly to create a flat, compact puck.",
      "Lock in and start the shot immediately to avoid the grounds heating up.",
      "Aim for 25–30 seconds of extraction for a 1:2 ratio shot.",
      "Serve immediately, or use as the base for milk drinks.",
    ],
  },
  {
    method: "South Indian Filter",
    ratio: "1:8 coffee to water",
    grind: "Fine (filter)",
    time: "10–15 minutes",
    steps: [
      "Add finely ground filter coffee to the upper chamber and press lightly.",
      "Pour hot (not boiling) water over the grounds slowly.",
      "Cover and let it drip through into the lower chamber, 10–15 minutes.",
      "Mix the decoction with hot milk and sugar to taste.",
      "Traditionally served frothed between two tumblers.",
    ],
  },
];

export default function BrewGuidePage() {
  return (
    <div className="px-4 py-16 mx-auto max-w-6xl">
      <div className="mb-14 text-center">
        <p className="mb-3 text-sm tracking-widest uppercase text-amber-600">
          Brew Guide
        </p>
        <h1 className="text-4xl font-bold text-coffee-900 md:text-5xl">
          Brew It Your Way
        </h1>
        <p className="max-w-xl mx-auto mt-5 text-lg text-gray-600">
          The same beans taste different depending on how you brew them.
          Here&apos;s how we make each method shine.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {guides.map((guide) => (
          <div
            key={guide.method}
            className="p-6 bg-white border border-gray-200 rounded-lg"
          >
            <h2 className="text-xl font-bold text-coffee-900">
              {guide.method}
            </h2>
            <div className="flex flex-wrap gap-2 mt-3 mb-5">
              <span className="px-2 py-0.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-full">
                {guide.ratio}
              </span>
              <span className="px-2 py-0.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-full">
                {guide.grind} grind
              </span>
              <span className="px-2 py-0.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-full">
                {guide.time}
              </span>
            </div>
            <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
              {guide.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/shop"
          className="inline-block px-6 py-3 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700"
        >
          Shop Coffee
        </Link>
      </div>
    </div>
  );
}
