const Cart = require("../models/Cart");
const Product = require("../models/Product");

// GET /cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId",
    );
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /cart/items
exports.addItem = async (req, res) => {
  try {
    const { productId, variant, grindOption, quantity = 1 } = req.body;
    // Validate product existence
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    // Check if item already exists (same product+variant+grind)
    const existingIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.variant.sku === variant.sku &&
        item.grindOption === grindOption,
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        variant,
        grindOption,
        quantity,
      });
    }

    await cart.save();
    await cart.populate("items.productId");
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /cart/items/:itemId
exports.updateItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (quantity <= 0) {
      cart.items.pull({ _id: req.params.itemId });
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.productId");
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /cart/items/:itemId
exports.removeItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items.pull({ _id: req.params.itemId });
    await cart.save();
    await cart.populate("items.productId");
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items: [] },
      { new: true },
    );
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /cart/merge (merge guest cart on login)
exports.mergeGuestCart = async (req, res) => {
  try {
    const { items } = req.body; // guest's cart items array
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid items" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    // Simple merge: add guest items if not already present (by productId+variant+grind)
    for (const guestItem of items) {
      const exists = cart.items.find(
        (item) =>
          item.productId.toString() === guestItem.productId &&
          item.variant.sku === guestItem.variant.sku &&
          item.grindOption === guestItem.grindOption,
      );
      if (!exists) {
        cart.items.push(guestItem);
      } else {
        exists.quantity += guestItem.quantity;
      }
    }

    await cart.save();
    await cart.populate("items.productId");
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
