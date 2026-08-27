export interface Address {
  _id: string;
  label?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface FullUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin" | "superadmin";
  addresses: Address[];
  createdAt?: string;
}
