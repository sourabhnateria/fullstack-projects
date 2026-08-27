import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

// Warli art: a traditional Indian tribal folk-art style (geometric dancing
// figures, sun, tree) originating from Maharashtra — rendered here as an
// original composition with a coffee branch worked in, using currentColor
// so it inherits whatever text color class is set on its wrapper.
function WarliMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 240"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* sun */}
      <circle
        cx="300"
        cy="36"
        r="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <line
        x1="317"
        y1="36"
        x2="323"
        y2="36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="313.8"
        y1="46"
        x2="318.6"
        y2="49.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="305.3"
        y1="52.2"
        x2="307.1"
        y2="57.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="294.7"
        y1="52.2"
        x2="292.9"
        y2="57.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="286.2"
        y1="46"
        x2="281.4"
        y2="49.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="283"
        y1="36"
        x2="277"
        y2="36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="286.2"
        y1="26"
        x2="281.4"
        y2="22.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="294.7"
        y1="19.8"
        x2="292.9"
        y2="14.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="305.3"
        y1="19.8"
        x2="307.1"
        y2="14.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="313.8"
        y1="26"
        x2="318.6"
        y2="22.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* coffee branch, Warli-tree style with cherries in place of berries */}
      <line
        x1="55"
        y1="205"
        x2="55"
        y2="55"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {[
        { y: 183.6, x2: 81, mirror: false },
        { y: 162.1, x2: 29, mirror: true },
        { y: 140.7, x2: 81, mirror: false },
        { y: 119.3, x2: 29, mirror: true },
        { y: 97.9, x2: 81, mirror: false },
        { y: 76.4, x2: 29, mirror: true },
      ].map((b, i) => {
        const side = b.mirror ? -1 : 1;
        const ly = b.y - 14; // leaf-tip y (matches the branch line's end point)
        return (
          <g key={i}>
            <line
              x1="55"
              y1={b.y}
              x2={b.x2}
              y2={ly}
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <polygon
              points={`55,${b.y} ${b.x2 - 6 * side},${ly - 4} ${b.x2},${ly - 10} ${b.x2 + 6 * side},${ly - 4}`}
              fill="currentColor"
              opacity="0.85"
            />
            <circle
              cx={55 + 13 * side}
              cy={b.y - 3}
              r="3"
              fill="currentColor"
            />
            <circle cx={55 + 17 * side} cy={b.y} r="3" fill="currentColor" />
          </g>
        );
      })}

      {/* dotted ground line */}
      {Array.from({ length: 38 }).map((_, i) => (
        <circle key={i} cx={20 + i * 8} cy="208" r="1.6" fill="currentColor" />
      ))}

      {/* chain of dancing figures, hands joined - a common Warli motif for
          community and harvest celebration. Arm/leg pose alternates per
          figure (raisedLeft) so the chain reads as mid-movement, not static. */}
      {[128, 168, 208, 248, 288].map((x, i) => {
        const raisedLeft = i % 2 === 0;
        const leftArm = raisedLeft
          ? `${x - 7},162 ${x - 15},154 ${x - 22},160`
          : `${x - 7},162 ${x - 15},166 ${x - 22},158`;
        const rightArm = raisedLeft
          ? `${x + 7},162 ${x + 15},166 ${x + 22},158`
          : `${x + 7},162 ${x + 15},154 ${x + 22},160`;
        const leftLeg = raisedLeft
          ? `${x - 7},188 ${x - 12},196 ${x - 8},203`
          : `${x - 7},188 ${x - 13},195 ${x - 18},202`;
        const rightLeg = raisedLeft
          ? `${x + 7},188 ${x + 13},195 ${x + 18},202`
          : `${x + 7},188 ${x + 12},196 ${x + 8},203`;
        return (
          <g key={x}>
            <circle cx={x} cy="158" r="4" fill="currentColor" />
            <polygon
              points={`${x - 7},162 ${x + 7},162 ${x},176`}
              fill="currentColor"
            />
            <polygon
              points={`${x},176 ${x + 7},188 ${x - 7},188`}
              fill="currentColor"
            />
            <polyline
              points={leftArm}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <polyline
              points={rightArm}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <polyline
              points={leftLeg}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <polyline
              points={rightLeg}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

// Logo lockup: cup icon + "FIVE ROAM / COFFEE ROASTERS" wordmark, built as
// SVG + text rather than pulling the old cropped-Logo.png, so it renders
// crisp at any size and matches the reference mark exactly.
function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 44 48"
        className="h-auto w-9 shrink-0"
        aria-hidden="true"
      >
        {/* steam */}
        <path
          d="M 11 5 C 6 3 6 -2 11 -4"
          className="stroke-coffee-900"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* lid tab */}
        <rect
          x="25"
          y="1"
          width="6"
          height="6"
          rx="1.5"
          className="fill-coffee-900"
        />
        {/* lid */}
        <rect
          x="6"
          y="6"
          width="32"
          height="9"
          rx="4.5"
          className="fill-coffee-900"
        />
        {/* cup body */}
        <path
          d="M 9 15 L 35 15 L 33 43 Q 33 47 29 47 L 15 47 Q 11 47 11 43 Z"
          className="fill-coffee-900"
        />
        {/* sleeve ridge lines */}
        <line
          x1="10.5"
          y1="22"
          x2="33.5"
          y2="22"
          className="stroke-paper"
          strokeWidth="1.3"
          opacity="0.55"
        />
        <line
          x1="11"
          y1="26"
          x2="33"
          y2="26"
          className="stroke-paper"
          strokeWidth="1.3"
          opacity="0.55"
        />
        {/* FR monogram */}
        <text
          x="22"
          y="40"
          fontSize="15"
          fontWeight="800"
          fontFamily="Arial, Helvetica, sans-serif"
          fontStyle="italic"
          textAnchor="middle"
          className="fill-paper"
        >
          FR
        </text>
      </svg>
      <div className="leading-tight">
        <p className="text-base font-extrabold tracking-tight text-coffee-900">
          FIVE ROAM
        </p>
        <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
          Coffee Roasters
        </p>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-gray-600 bg-paper">
      {/* decorative Warli art, tucked into the corner like a signature -
          kept faint so it never competes with the Policies text sitting
          in front of it */}
      <WarliMotif className="absolute bottom-0 right-0 hidden w-64 pointer-events-none select-none md:block lg:w-80 text-coffee-800/10" />

      <div className="relative grid grid-cols-1 gap-10 px-4 mx-auto py-14 max-w-7xl sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div>
          <Logo className="mb-4" />
          <ul className="mb-6 space-y-2 text-sm">
            <li>
              <Link href="/policies/privacy" className="hover:text-amber-600">
                Privacy Policy
              </Link>
            </li>
            <li className="text-gray-500">
              Copyright © {new Date().getFullYear()}
            </li>
          </ul>
          <h4 className="mb-3 text-xs font-semibold tracking-wide uppercase text-coffee-900">
            Follow Us
          </h4>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/fiveroamcoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-600"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/fiveroamcoffee/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-600"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Sign up for our newsletter!"
              required
              className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:border-amber-600"
            />
            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold tracking-wide text-white uppercase transition rounded-md bg-coffee-900 hover:bg-coffee-800"
            >
              Subscribe Now
            </button>
          </form>
          <p className="mt-4 text-xs leading-relaxed text-gray-500">
            Special offers, brewing tips &amp; recipes! Get insider access to
            new launches, events &amp; more — straight to your inbox. (We
            promise not to spam!)
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="mb-4 text-xs font-semibold tracking-wide uppercase text-coffee-900">
            Shop Online
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-amber-600">
                Our Coffee
              </Link>
            </li>
            <li>
              <Link href="/subscriptions" className="hover:text-amber-600">
                Subscriptions
              </Link>
            </li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="mb-4 text-xs font-semibold tracking-wide uppercase text-coffee-900">
            About Us
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-amber-600">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/brew-guide" className="hover:text-amber-600">
                Brew Guide
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-600">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="mb-4 text-xs font-semibold tracking-wide uppercase text-coffee-900">
            Policies
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/policies/refund-cancellation"
                className="hover:text-amber-600"
              >
                Refund &amp; Cancellation
              </Link>
            </li>
            <li>
              <Link href="/policies/shipping" className="hover:text-amber-600">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/policies/terms" className="hover:text-amber-600">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
