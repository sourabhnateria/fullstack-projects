// src/app/account/layout.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../lib/auth-context";

const NAV_ITEMS = [
  { label: "Profile & Password", href: "/account" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Track Orders", href: "/account/orders" },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace("/login");
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="px-4 py-24 text-center text-gray-500">Loading…</div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-6xl px-4 mx-auto">
      <div className="flex flex-col min-h-[70vh] md:flex-row">
        <aside className="shrink-0 border-b border-gray-200 bg-gray-50 p-6 md:w-56 md:border-b-0 md:border-r">
          <p className="mb-6 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            My Account
          </p>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/account"
                  ? pathname === "/account"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition ${
                    active
                      ? "bg-white text-amber-600 shadow-sm"
                      : "text-gray-700 hover:bg-white hover:text-amber-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-6 mt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400">Signed in as</p>
            <p className="text-sm font-medium text-coffee-900">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <Link
            href="/"
            className="inline-block mt-6 text-xs text-gray-400 hover:text-amber-600"
          >
            ← Back to site
          </Link>
        </aside>
        <div className="flex-1 p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
