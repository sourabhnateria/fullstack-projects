const router = require("express").Router();
const productCtrl = require("../controllers/product.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// Public routes
router.get("/", productCtrl.getAllProducts);

// Admin routes (must be declared before "/:slug" so "admin" isn't parsed as a slug)
router.get(
  "/admin/all",
  authenticate,
  authorize("admin", "superadmin"),
  productCtrl.getAllProductsAdmin,
);
router.post(
  "/",
  authenticate,
  authorize("admin", "superadmin"),
  productCtrl.createProduct,
);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "superadmin"),
  productCtrl.updateProduct,
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "superadmin"),
  productCtrl.deleteProduct,
);

// Must be last: catches any other single-segment path as a slug
router.get("/:slug", productCtrl.getProductBySlug);

module.exports = router;
