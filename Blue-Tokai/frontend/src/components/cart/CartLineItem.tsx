import { Product } from "../../types/product";

// cart-store.ts types `productId` as just `string`, but after syncWithBackend()
// runs, the backend has actually populated it into a full Product object
// (see cart.controller.js: `.populate("items.productId")`). This type reflects
// what the item really looks like at runtime for both guest and synced carts.
export interface CartLineItemData {
  productId: string | Product;
  variant: { size: string; price: number; sku: string };
  grindOption: string;
  quantity: number;
}

export function getProductId(productId: string | Product): string {
  return typeof productId === "string" ? productId : productId._id;
}

interface CartLineItemProps {
  item: CartLineItemData;
  product: Product | null;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartLineItem({
  item,
  product,
  onQuantityChange,
  onRemove,
}: CartLineItemProps) {
  const lineTotal = item.variant.price * item.quantity;

  return (
    <div className="flex gap-4 p-4 bg-white border rounded-lg">
      <div className="flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-md shrink-0">
        {product?.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-xs text-gray-400">No image</span>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold">
              {product?.name ?? "Product unavailable"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {item.variant.size}
              {item.grindOption ? ` · ${item.grindOption}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="text-sm text-gray-400 transition hover:text-red-600"
          >
            Remove
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <button
              type="button"
              onClick={() => onQuantityChange(item.quantity - 1)}
              className="px-3 py-1 transition hover:bg-gray-50"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-sm text-center">{item.quantity}</span>
            <button
              type="button"
              onClick={() => onQuantityChange(item.quantity + 1)}
              className="px-3 py-1 transition hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <p className="font-semibold">₹{lineTotal}</p>
        </div>
      </div>
    </div>
  );
}
