// src/app/account/orders/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../../lib/api";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";

const STATUS_STYLES: Record<Order["status"], string> = {
  pending: "bg-gray-100 text-gray-600",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-amber-100 text-amber-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

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

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/orders")
      .then(({ data }) => setOrders(data.orders ?? []))
      .catch((err) =>
        setError(err?.response?.data?.message ?? "Failed to load orders."),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-coffee-900">Track Orders</h1>
        <p className="mt-1 text-sm text-gray-500">
          View your order history and delivery status.
        </p>
      </div>

      {error && (
        <p className="p-3 mb-6 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading orders…</p>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <p className="mb-2 text-lg font-medium">No orders yet</p>
          <p className="mb-6 text-gray-600">
            When you place an order, it'll show up here.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700"
          >
            Browse Coffee
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/account/orders/${order._id}`}
              className="block p-4 transition border border-gray-200 rounded-lg hover:border-amber-400"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-coffee-900">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-600 truncate">
                {order.items.map((item) => itemName(item.productId)).join(", ")}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-sm text-gray-500">
                  {order.items.reduce((sum, i) => sum + i.quantity, 0)} item(s)
                </p>
                <p className="font-semibold text-coffee-900">
                  ₹{order.total ?? 0}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
