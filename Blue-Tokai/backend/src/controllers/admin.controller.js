const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Get dashboard stats
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, revenue: { $sum: "$total" } } },
    ]);
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name email");

    res.json({
      totalUsers,
      totalOrders,
      revenue: totalRevenue[0]?.revenue || 0,
      recentOrders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users (admin: list users, exclude passwords)
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await User.countDocuments();
    res.json({ users, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Toggle user active status
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    // Prevent self-deactivation or superadmin tampering by lower roles
    if (user.role === "superadmin" && req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Cannot modify super admin" });
    }
    user.isActive = !user.isActive;
    await user.save();
    res.json({
      message: `User ${user.isActive ? "activated" : "deactivated"}`,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Change user role (only superadmin can promote/demote)
exports.changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!["user", "admin", "superadmin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    // Only superadmin can assign superadmin role
    if (role === "superadmin" && req.user.role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "Only superadmin can grant superadmin role" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true },
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user (superadmin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "superadmin") {
      return res.status(403).json({ message: "Cannot delete super admin" });
    }
    await User.findByIdAndDelete(req.params.id);
    // Optionally clean up related data (orders, cart, sessions)
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
