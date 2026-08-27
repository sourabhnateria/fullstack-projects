const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variant: {
    size: String,
    price: Number,
    sku: String,
  },
  grindOption: String,
  quantity: Number,
  price: Number, // snapshot of price at order time
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // Optional: guests can check out without an account.
    },
    contact: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    items: [orderItemSchema],
    shippingAddress: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
    },
    subtotal: Number,
    tax: Number,
    shippingCost: Number,
    total: Number,
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      default: "razorpay",
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    trackingNumber: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
