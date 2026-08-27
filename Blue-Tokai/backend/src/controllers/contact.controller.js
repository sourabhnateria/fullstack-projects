const Contact = require("../models/Contact");

// POST /contact (public)
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required" });
    }
    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({
      message: "Thanks for reaching out — we'll get back to you soon.",
      contact,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /contact (admin only)
exports.getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Contact.countDocuments();
    res.json({ contacts, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /contact/:id/status (admin only)
exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["new", "read", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
