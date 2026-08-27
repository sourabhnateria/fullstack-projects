"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Order, OrderItem } from "../../../types/order";
import { Product } from "../../../types/product";

function itemName(item: OrderItem): string {
  const productId = item.productId;
  if (productId && typeof productId === "object") {
    return (productId as Product).name;
  }
  return "Item";
}

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("lastOrder");
    if (raw) {
      try {
        setOrder(JSON.parse(raw));
      } catch {
        setOrder(null);
      }
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!order) {
    return (
      <div className="flex flex-col items-center max-w-2xl px-4 py-24 mx-auto text-center min-h-screen">
        <p className="mb-2 text-lg font-medium">No recent order found</p>
        <p className="mb-6 text-gray-600">
          If you just placed an order, check your email for confirmation.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl min-h-screen px-4 py-16 mx-auto">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white rounded-full bg-amber-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-coffee-900 md:text-3xl">
          Order Confirmed
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Thanks{order.contact?.name ? `, ${order.contact.name}` : ""}! We've
          sent a confirmation to {order.contact?.email ?? "your email"}.
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Order #{order._id.slice(-8).toUpperCase()}
        </p>
      </div>

      <div className="p-6 mb-6 border border-gray-200 rounded-lg">
        <h2 className="mb-4 text-sm font-bold tracking-wide uppercase text-coffee-900">
          Items
        </h2>
        <ul className="space-y-3 text-sm">
          {order.items.map((item, i) => (
            <li key={i} className="flex justify-between gap-3">
              <span className="text-gray-600">
                {itemName(item)} × {item.quantity}
                {item.grindOption ? ` (${item.grindOption})` : ""}
              </span>
              <span className="font-medium shrink-0">
                ₹{item.price * item.quantity}
              </span>
            </li>
          ))}
        </ul>

        <div className="pt-4 mt-4 space-y-2 text-sm border-t">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>₹{order.tax}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>
              {order.shippingCost === 0 ? "Free" : `₹${order.shippingCost}`}
            </span>
          </div>
          <div className="flex justify-between pt-2 text-base font-bold border-t">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      </div>

      {order.shippingAddress && (
        <div className="p-6 mb-8 border border-gray-200 rounded-lg">
          <h2 className="mb-2 text-sm font-bold tracking-wide uppercase text-coffee-900">
            Shipping To
          </h2>
          <p className="text-sm text-gray-600">
            {order.contact?.name}
            <br />
            {order.shippingAddress.line1}
            {order.shippingAddress.line2
              ? `, ${order.shippingAddress.line2}`
              : ""}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.pincode}
            {order.contact?.phone && (
              <>
                <br />
                {order.contact.phone}
              </>
            )}
          </p>
        </div>
      )}

      <Link
        href="/shop"
        className="block w-full px-6 py-3 font-semibold text-center text-white transition rounded-md bg-amber-600 hover:bg-amber-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
