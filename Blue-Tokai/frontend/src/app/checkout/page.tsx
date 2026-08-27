"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../lib/cart-store";
import { useAuth } from "../../lib/auth-context";
import api from "../../lib/api";
import { loadRazorpayScript } from "../../lib/razorpay";
import { getAllProducts } from "../../lib/products";
import { Product } from "../../types/product";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const { user, isAuthenticated } = useAuth();

  const [form, setForm] = useState(EMPTY_FORM);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill name/email for logged-in shoppers; guests just type their own.
  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        name: f.name || user.name,
        email: f.email || user.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    let isMounted = true;
    getAllProducts().then((data) => {
      if (isMounted) setProducts(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const productMap = useMemo(() => {
    const map = new Map<string, Product>();
    products.forEach((p) => map.set(p._id, p));
    return map;
  }, [products]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * 0.05);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setError("");
    setLoading(true);

    try {
      const payload = {
        contact: { name: form.name, email: form.email, phone: form.phone },
        shippingAddress: {
          line1: form.line1,
          line2: form.line2,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
        // Only used by the backend for guest checkout; logged-in users'
        // totals are computed from their server-side cart instead.
        items,
      };

      const { data } = await api.post("/checkout", payload);
      const { razorpayOrderId, amount, key_id } = data;

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error(
          "Couldn't load the payment window. Check your connection and try again.",
        );
      }

      const options = {
        key: key_id,
        amount: amount * 100, // backend total is in rupees; Razorpay wants paise
        currency: "INR",
        name: "Blue Tokai Coffee",
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          try {
            const verifyRes = await api.post("/checkout/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            sessionStorage.setItem(
              "lastOrder",
              JSON.stringify(verifyRes.data.order),
            );
            clearCart();
            router.push("/checkout/success");
          } catch (err) {
            setError(
              "Payment went through, but we couldn't confirm your order. Please contact us with your payment ID.",
            );
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#d97706" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setError("Payment failed. Please try again.");
        setLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          err?.message ??
          "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center max-w-2xl px-4 py-24 mx-auto text-center min-h-screen">
        <p className="mb-2 text-lg font-medium">Your cart is empty</p>
        <p className="mb-6 text-gray-600">
          Add some coffee to your cart before checking out.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700"
        >
          Browse Coffee
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl min-h-screen px-4 py-12 mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-coffee-900 md:text-4xl">
        Checkout
      </h1>
      <p className="mb-8 text-sm text-gray-500">
        {isAuthenticated ? (
          `Shipping to your details below.`
        ) : (
          <>
            Checking out as a guest. Have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-amber-600 hover:underline"
            >
              Log in
            </Link>{" "}
            for faster checkout.
          </>
        )}
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        <div className="space-y-6 lg:col-span-2">
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 className="mb-4 text-lg font-bold text-coffee-900">
              Contact Details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Full Name
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
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 className="mb-4 text-lg font-bold text-coffee-900">
              Shipping Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="line1"
                  required
                  value={form.line1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="line2"
                  value={form.line2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  required
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="p-6 border rounded-lg bg-gray-50 lg:sticky lg:top-24">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

            <ul className="mb-4 space-y-3 text-sm">
              {items.map((item, i) => {
                const product = productMap.get(item.productId);
                return (
                  <li key={i} className="flex justify-between gap-3">
                    <span className="text-gray-600">
                      {product?.name ?? "Item"} × {item.quantity}
                      {item.grindOption ? ` (${item.grindOption})` : ""}
                    </span>
                    <span className="font-medium shrink-0">
                      ₹{item.variant.price * item.quantity}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="pt-3 space-y-2 text-sm border-t">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5% GST)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between pt-2 text-base font-bold border-t">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {error && (
              <p className="p-3 mt-4 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-5 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Processing…" : `Pay ₹${total} with Razorpay`}
            </button>

            <Link
              href="/cart"
              className="block mt-3 text-sm text-center text-gray-500 transition hover:text-amber-600"
            >
              Back to cart
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
