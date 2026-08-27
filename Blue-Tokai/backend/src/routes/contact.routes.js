const router = require("express").Router();
const contactCtrl = require("../controllers/contact.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// Public
router.post("/", contactCtrl.submitContact);

// Admin
router.get(
  "/",
  authenticate,
  authorize("admin", "superadmin"),
  contactCtrl.getAllContacts,
);
router.patch(
  "/:id/status",
  authenticate,
  authorize("admin", "superadmin"),
  contactCtrl.updateContactStatus,
);

module.exports = router;
