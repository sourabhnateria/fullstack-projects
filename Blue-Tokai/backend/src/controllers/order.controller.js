const Order = require("../models/Order");

// User: get own orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("items.productId")
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User: get single order (must be owner)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId",
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    // Check ownership (unless admin)
    if (
      order.userId.toString() !== req.user.id &&
      req.user.role !== "admin" &&
      req.user.role !== "superadmin"
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate("userId", "name email")
      .populate("items.productId")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);
    res.json({ orders, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: update order status / tracking
exports.updateOrder = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;
    const update = {};
    if (status) update.status = status;
    if (trackingNumber) update.trackingNumber = trackingNumber;

    const order = await Order.findByIdAndUpdate(req.params.id, update, {
      new: true,
    })
      .populate("userId", "name email")
      .populate("items.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
