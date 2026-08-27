const router = require("express").Router();
const checkoutCtrl = require("../controllers/checkout.controller");
const authenticate = require("../middleware/authenticate");

// Guests can check out too — authenticate.optional attaches req.user when a
// valid token is present, but never blocks the request when it isn't.
router.post("/", authenticate.optional, checkoutCtrl.createCheckout);
router.post("/verify", checkoutCtrl.verifyPayment);

module.exports = router;
