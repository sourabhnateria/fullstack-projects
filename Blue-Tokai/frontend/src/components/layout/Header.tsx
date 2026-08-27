"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, User, Search } from "lucide-react";
import { useAuth } from "../../lib/auth-context";
import { useCartStore } from "../../lib/cart-store";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Coffee", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Brew Guide", href: "/brew-guide" },
  { label: "Contact Us", href: "/contact" },
];

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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-black py-2.5 text-center text-xs font-semibold tracking-wide text-white">
        GET 10% OFF ON YOUR FIRST COFFEE PURCHASE, USE CODE -{" "}
        <span className="text-sky-400">TRY10</span>
      </div>

      <div className="px-4 mx-auto border-b border-gray-100 max-w-7xl">
        <div className="flex items-center justify-between gap-6 py-3">
          {/* Logo */}
          <Logo className="mb-4" />
          {/* eslint-disable-next-line @next/next/no-img-element */}

          {/* Desktop nav */}
          <nav className="items-center hidden gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold tracking-wide text-black uppercase transition hover:text-amber-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <Link
              href="/shop"
              className="hidden px-6 py-2.5 text-xs font-bold tracking-wide text-white uppercase bg-black rounded-full md:inline-block hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>

            <Link
              href="/shop"
              aria-label="Search"
              className="hidden text-black transition md:inline-block hover:text-amber-600"
            >
              <Search size={20} />
            </Link>

            <div className="relative hidden md:block group">
              <button className="flex items-center text-black transition hover:text-amber-600">
                <User size={20} />
              </button>
              {isAuthenticated && (
                <div className="absolute right-0 hidden pt-2 top-full group-hover:block">
                  <div className="py-2 bg-white border rounded-md shadow-lg w-44">
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      My Orders
                    </Link>
                    {(user?.role === "admin" ||
                      user?.role === "superadmin") && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
              {!isAuthenticated && (
                <Link
                  href="/login"
                  className="absolute inset-0"
                  aria-label="Login"
                />
              )}
            </div>

            <Link href="/cart" className="relative">
              <ShoppingBag
                size={22}
                className="text-black transition hover:text-amber-600"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="px-4 py-4 space-y-3 bg-white border-t md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-amber-600"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t">
            {isAuthenticated ? (
              <>
                <Link href="/account" className="block py-1 text-sm">
                  My Account
                </Link>
                <button
                  onClick={logout}
                  className="block py-1 text-sm text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block py-1 text-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
