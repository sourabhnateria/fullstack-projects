const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order. Works both for logged-in users (cart pulled from
// the DB) and guests (cart items sent in the request body) — req.user is
// only set when a valid access token was present (see authenticate.optional).
exports.createCheckout = async (req, res) => {
  try {
    const { shippingAddress, contact } = req.body;

    if (!contact?.name || !contact?.email || !contact?.phone) {
      return res
        .status(400)
        .json({ message: "Name, email and phone are required" });
    }
    if (
      !shippingAddress?.line1 ||
      !shippingAddress?.city ||
      !shippingAddress?.state ||
      !shippingAddress?.pincode
    ) {
      return res
        .status(400)
        .json({ message: "Complete shipping address is required" });
    }

    let rawItems;
    if (req.user) {
      const cart = await Cart.findOne({ userId: req.user.id }).populate(
        "items.productId",
      );
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
      rawItems = cart.items.map((item) => ({
        product: item.productId,
        variant: item.variant,
        grindOption: item.grindOption,
        quantity: item.quantity,
      }));
    } else {
      const { items } = req.body;
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
      const products = await Product.find({
        _id: { $in: items.map((i) => i.productId) },
      });
      const productMap = new Map(products.map((p) => [p._id.toString(), p]));
      rawItems = items.map((item) => ({
        product: productMap.get(item.productId),
        variant: item.variant,
        grindOption: item.grindOption,
        quantity: item.quantity,
      }));
      if (rawItems.some((item) => !item.product)) {
        return res.status(400).json({
          message: "One or more items in your cart are no longer available",
        });
      }
    }

    // Recompute prices from the DB record — never trust a client-sent price.
    let subtotal = 0;
    const orderItems = rawItems.map((item) => {
      const variant =
        item.product.variants.find((v) => v.sku === item.variant?.sku) ??
        item.product.variants[0];
      if (!variant) {
        throw new Error(`${item.product.name} has no purchasable variant`);
      }
      const quantity = Math.max(1, Number(item.quantity) || 1);
      subtotal += variant.price * quantity;
      return {
        productId: item.product._id,
        variant: {
          size: variant.size,
          price: variant.price,
          sku: variant.sku,
        },
        grindOption: item.grindOption,
        quantity,
        price: variant.price,
      };
    });

    const tax = Math.round(subtotal * 0.05); // 5% GST
    const shippingCost = subtotal > 500 ? 0 : 50;
    const total = subtotal + tax + shippingCost;

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100, // Razorpay accepts amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // Save order in DB
    const order = await Order.create({
      userId: req.user?.id,
      contact,
      items: orderItems,
      subtotal,
      tax,
      shippingCost,
      total,
      razorpayOrderId: razorpayOrder.id,
      status: "pending",
      paymentStatus: "pending",
      shippingAddress,
    });

    res.json({
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: total,
      currency: "INR",
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Update order
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        status: "confirmed",
        paymentStatus: "paid",
        razorpayPaymentId: razorpay_payment_id,
      },
      { new: true },
    ).populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only logged-in users have a server-side cart to clear; guest carts
    // live client-side only and are cleared there after this responds.
    if (order.userId) {
      await Cart.findOneAndUpdate({ userId: order.userId }, { items: [] });
    }

    res.json({ message: "Payment verified", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
