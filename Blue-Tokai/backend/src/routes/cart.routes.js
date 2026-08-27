const router = require("express").Router();
const cartCtrl = require("../controllers/cart.controller");
const authenticate = require("../middleware/authenticate");

// All cart routes require authentication
router.get("/", authenticate, cartCtrl.getCart);
router.post("/items", authenticate, cartCtrl.addItem);
router.put("/items/:itemId", authenticate, cartCtrl.updateItem);
router.delete("/items/:itemId", authenticate, cartCtrl.removeItem);
router.delete("/", authenticate, cartCtrl.clearCart);
router.post("/merge", authenticate, cartCtrl.mergeGuestCart);

module.exports = router;
