const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");
const authenticate = require("../middleware/authenticate");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.post("/refresh", authCtrl.refresh);
router.post("/logout", authenticate, authCtrl.logout);
router.post("/logout-all", authenticate, authCtrl.logoutAll);
router.get("/sessions", authenticate, authCtrl.getSessions);
router.get("/me", authenticate, authCtrl.getMe);
router.patch("/me", authenticate, authCtrl.updateMe);
router.patch("/me/password", authenticate, authCtrl.changePassword);
router.post("/me/addresses", authenticate, authCtrl.addAddress);
router.put("/me/addresses/:addressId", authenticate, authCtrl.updateAddress);
router.delete("/me/addresses/:addressId", authenticate, authCtrl.deleteAddress);

module.exports = router;
