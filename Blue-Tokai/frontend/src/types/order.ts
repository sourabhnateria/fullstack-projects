import { Product } from "./product";

export interface OrderItem {
  productId: Product | string;
  variant?: {
    size?: string;
    price?: number;
    sku?: string;
  };
  grindOption?: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderContact {
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  _id: string;
  contact?: OrderContact;
  items: OrderItem[];
  shippingAddress?: ShippingAddress;
  subtotal?: number;
  tax?: number;
  shippingCost?: number;
  total?: number;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod?: string;
  trackingNumber?: string;
  createdAt: string;
}
