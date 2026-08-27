// src/app/account/orders/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import api from "../../../../lib/api";
import { Order, OrderStatus } from "../../../../types/order";
import { Product } from "../../../../types/product";

const TRACKING_STEPS: { key: OrderStatus; label: string }[] = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function itemName(productId: Product | string) {
  return typeof productId === "string" ? "Item" : productId.name;
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then(({ data }) => setOrder(data.order))
      .catch((err) =>
        setError(err?.response?.data?.message ?? "Failed to load order."),
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-sm text-gray-500">Loading order…</p>;

  if (error || !order) {
    return (
      <div>
        <p className="p-3 mb-6 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
          {error || "Order not found."}
        </p>
        <Link
          href="/account/orders"
          className="text-sm font-medium text-amber-600 hover:underline"
        >
          ← Back to orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = TRACKING_STEPS.findIndex(
    (s) => s.key === order.status,
  );
  const isCancelled = order.status === "cancelled";

  return (
    <div>
      <Link
        href="/account/orders"
        className="inline-block mb-4 text-sm font-medium text-amber-600 hover:underline"
      >
        ← Back to orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-coffee-900">
            Order #{order._id.slice(-8).toUpperCase()}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        {order.trackingNumber && (
          <p className="text-sm text-gray-600">
            Tracking No:{" "}
            <span className="font-medium text-coffee-900">
              {order.trackingNumber}
            </span>
          </p>
        )}
      </div>

      {/* Tracking timeline */}
      <div className="p-6 mb-8 border border-gray-200 rounded-lg">
        {isCancelled ? (
          <p className="font-semibold text-red-600">
            This order was cancelled.
          </p>
        ) : (
          <div className="flex items-center">
            {TRACKING_STEPS.map((step, index) => {
              const reached = index <= currentStepIndex;
              const isLast = index === TRACKING_STEPS.length - 1;
              return (
                <div key={step.key} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        reached
                          ? "bg-amber-600 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <p
                      className={`mt-2 w-20 text-center text-xs font-medium ${
                        reached ? "text-coffee-900" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {!isLast && (
                    <div
                      className={`mx-2 h-0.5 flex-1 ${
                        index < currentStepIndex ? "bg-amber-600" : "bg-gray-100"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <h2 className="text-lg font-bold text-coffee-900">Items</h2>
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="font-medium text-coffee-900">
                  {itemName(item.productId)}
                </p>
                <p className="text-sm text-gray-500">
                  {item.variant?.size ? `${item.variant.size} · ` : ""}
                  {item.grindOption ? `${item.grindOption} · ` : ""}Qty{" "}
                  {item.quantity}
                </p>
              </div>
              <p className="font-medium text-coffee-900">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h2 className="mb-2 text-sm font-bold text-coffee-900">
              Shipping Address
            </h2>
            {order.shippingAddress ? (
              <p className="text-sm text-gray-600">
                {order.shippingAddress.line1}
                {order.shippingAddress.line2
                  ? `, ${order.shippingAddress.line2}`
                  : ""}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.pincode}
              </p>
            ) : (
              <p className="text-sm text-gray-500">No address on file.</p>
            )}
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h2 className="mb-2 text-sm font-bold text-coffee-900">
              Order Summary
            </h2>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{order.tax ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{order.shippingCost ?? 0}</span>
              </div>
              <div className="flex justify-between pt-2 mt-2 font-semibold text-coffee-900 border-t border-gray-200">
                <span>Total</span>
                <span>₹{order.total ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
