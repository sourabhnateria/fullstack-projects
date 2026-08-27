const router = require("express").Router();
const adminCtrl = require("../controllers/admin.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// All admin routes require admin or superadmin
router.use(authenticate, authorize("admin", "superadmin"));

router.get("/dashboard", adminCtrl.getDashboard);
router.get("/users", adminCtrl.getUsers);
router.patch("/users/:id/toggle-status", adminCtrl.toggleUserStatus);
router.patch(
  "/users/:id/role",
  authorize("superadmin"),
  adminCtrl.changeUserRole,
); // only superadmin
router.delete("/users/:id", authorize("superadmin"), adminCtrl.deleteUser); // only superadmin

module.exports = router;
