import Link from "next/link";

interface CartSummaryLineItem {
  variant: { price: number };
  quantity: number;
}

interface CartSummaryProps {
  items: CartSummaryLineItem[];
  onClearCart: () => void;
}

export default function CartSummary({ items, onClearCart }: CartSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0,
  );

  return (
    <div className="p-6 border rounded-lg bg-gray-50 lg:sticky lg:top-24">
      <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

      <div className="flex justify-between mb-2 text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span>₹{subtotal}</span>
      </div>
      <p className="mb-6 text-xs text-gray-500">
        Shipping and taxes calculated at checkout.
      </p>

      {/* NOTE: assuming a /checkout route — let me know the real path if different */}
      <Link
        href="/checkout"
        className="block w-full px-6 py-3 font-semibold text-center text-white transition rounded-md bg-amber-600 hover:bg-amber-700"
      >
        Proceed to Checkout
      </Link>

      <button
        type="button"
        onClick={onClearCart}
        className="w-full mt-3 text-sm text-center text-gray-500 transition hover:text-red-600"
      >
        Clear cart
      </button>
    </div>
  );
}
