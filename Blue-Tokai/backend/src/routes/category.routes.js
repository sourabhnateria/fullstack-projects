const router = require("express").Router();
const categoryCtrl = require("../controllers/category.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// Public routes
router.get("/", categoryCtrl.getAllCategories);

// Admin routes
router.post(
  "/",
  authenticate,
  authorize("admin", "superadmin"),
  categoryCtrl.createCategory,
);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "superadmin"),
  categoryCtrl.updateCategory,
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "superadmin"),
  categoryCtrl.deleteCategory,
);

module.exports = router;
