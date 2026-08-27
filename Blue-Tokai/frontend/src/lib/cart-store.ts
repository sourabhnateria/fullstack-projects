import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "./api";

export interface CartItem {
  // Only present once an item has round-tripped through the backend cart
  // (i.e. the user is logged in). Guest items never get one.
  _id?: string;
  productId: string;
  variant: { size: string; price: number; sku: string };
  grindOption: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isSyncing: boolean;
  addItem: (item: CartItem) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  syncWithBackend: () => Promise<void>;
  mergeGuestCart: () => Promise<void>;
}

const sameLine = (a: CartItem, item: CartItem) =>
  a.productId === item.productId &&
  a.variant.sku === item.variant.sku &&
  a.grindOption === item.grindOption;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isSyncing: false,

      // Every mutation below updates local state immediately (so guests —
      // who have no server-side cart — work exactly as before), then makes
      // a best-effort call to the matching backend endpoint. For a logged-in
      // user that call succeeds and its response (the authoritative,
      // populated cart) replaces local state; for a guest it 401s and is
      // silently ignored. Without this, an authenticated user's cart only
      // ever existed client-side, and syncWithBackend() on the cart page
      // would overwrite it with the (empty) server cart on every visit.
      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex((i) =>
            sameLine(i, item),
          );
          if (existingIndex > -1) {
            const items = [...state.items];
            items[existingIndex] = {
              ...items[existingIndex],
              quantity: items[existingIndex].quantity + item.quantity,
            };
            return { items };
          }
          return { items: [...state.items, item] };
        });

        api
          .post("/cart/items", item)
          .then(({ data }) => set({ items: data.cart.items }))
          .catch(() => {
            // Guest (401) or offline — local state above already stands.
          });
      },

      updateQuantity: (index, quantity) => {
        const target = get().items[index];

        set((state) => {
          const items = [...state.items];
          if (quantity <= 0) {
            items.splice(index, 1);
          } else {
            items[index] = { ...items[index], quantity };
          }
          return { items };
        });

        if (!target?._id) return; // guest item — nothing to sync
        const request =
          quantity <= 0
            ? api.delete(`/cart/items/${target._id}`)
            : api.put(`/cart/items/${target._id}`, { quantity });
        request.then(({ data }) => set({ items: data.cart.items })).catch(() => {});
      },

      removeItem: (index) => {
        const target = get().items[index];

        set((state) => ({
          items: state.items.filter((_, i) => i !== index),
        }));

        if (!target?._id) return; // guest item — nothing to sync
        api
          .delete(`/cart/items/${target._id}`)
          .then(({ data }) => set({ items: data.cart.items }))
          .catch(() => {});
      },

      clearCart: () => {
        set({ items: [] });
        api.delete("/cart").catch(() => {});
      },

      syncWithBackend: async () => {
        set({ isSyncing: true });
        try {
          const { data } = await api.get("/cart");
          set({ items: data.cart.items, isSyncing: false });
        } catch (error) {
          set({ isSyncing: false });
          // fallback to local (guest) cart if not logged in
        }
      },

      mergeGuestCart: async () => {
        const guestItems = get().items;
        if (guestItems.length === 0) return;
        // Adopt the merged, populated cart the backend returns directly —
        // do NOT route through clearCart(), which also issues a DELETE
        // /cart and would wipe out the merge we just did.
        const { data } = await api.post("/cart/merge", { items: guestItems });
        set({ items: data.cart.items });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
