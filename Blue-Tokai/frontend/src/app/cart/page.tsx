"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCartStore } from "../../lib/cart-store";
import { getAllProducts } from "../../lib/products";
import { Product } from "../../types/product";
import CartLineItem, {
  CartLineItemData,
  getProductId,
} from "../../components/cart/CartLineItem";
import CartSummary from "../../components/cart/CartSummary";

export default function CartPage() {
  // cart-store.ts doesn't export its CartItem interface, and types productId
  // as plain `string`. See the comment in CartLineItem.tsx for why this cast
  // is here instead of that.
  const rawItems = useCartStore((state) => state.items);
  const items = rawItems as unknown as CartLineItemData[];

  const isSyncing = useCartStore((state) => state.isSyncing);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const syncWithBackend = useCartStore((state) => state.syncWithBackend);

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Pulls the logged-in user's cart from the backend. If the user isn't
  // authenticated, api.get("/cart") fails and syncWithBackend() swallows the
  // error, leaving the local (guest) items in place — that's existing
  // behavior in cart-store.ts, not something added here.
  useEffect(() => {
    syncWithBackend();
  }, [syncWithBackend]);

  // Guest cart items only carry a productId string, no name/image — resolve
  // those against the product catalog, per your instruction to use
  // lib/products.ts.
  useEffect(() => {
    let isMounted = true;
    getAllProducts().then((data) => {
      if (isMounted) {
        setProducts(data);
        setProductsLoading(false);
      }
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

  const resolveProduct = (productId: string | Product): Product | null => {
    if (typeof productId === "string") {
      return productMap.get(productId) ?? null;
    }
    // Already a populated Product object (synced item).
    return productId;
  };

  const loading = isSyncing || productsLoading;

  return (
    <div className="max-w-6xl min-h-screen px-4 py-12 mx-auto">
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">Your Cart</h1>

      {loading ? (
        <p className="py-24 text-center text-gray-500">Loading your cart…</p>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-center">
          <p className="mb-2 text-lg font-medium">Your cart is empty</p>
          <p className="mb-6 text-gray-600">
            Looks like you haven't added any coffee yet.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700"
          >
            Browse Coffee
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item, index) => (
              <CartLineItem
                key={`${getProductId(item.productId)}-${item.variant.sku}-${item.grindOption}`}
                item={item}
                product={resolveProduct(item.productId)}
                onQuantityChange={(quantity) => updateQuantity(index, quantity)}
                onRemove={() => removeItem(index)}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <CartSummary items={items} onClearCart={clearCart} />
          </div>
        </div>
      )}
    </div>
  );
}
