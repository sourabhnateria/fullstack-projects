const router = require("express").Router();
const orderCtrl = require("../controllers/order.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// User routes (require authentication)
router.get("/", authenticate, orderCtrl.getUserOrders);
router.get("/:id", authenticate, orderCtrl.getOrderById);

// Admin routes
router.get(
  "/admin/all",
  authenticate,
  authorize("admin", "superadmin"),
  orderCtrl.getAllOrders,
);
router.patch(
  "/admin/:id",
  authenticate,
  authorize("admin", "superadmin"),
  orderCtrl.updateOrder,
);

module.exports = router;
