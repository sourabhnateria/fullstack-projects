const Product = require("../models/Product");
require("../models/Category"); // must be registered before .populate("category")

// GET /products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, sort, page = 1, limit = 12 } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;

    let sortOption = {};
    if (sort === "price_asc") sortOption.basePrice = 1;
    else if (sort === "price_desc") sortOption.basePrice = -1;
    else sortOption.createdAt = -1;

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /products/admin/all (admin/superadmin - includes inactive products)
exports.getAllProductsAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const products = await Product.find()
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Product.countDocuments();
    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /products/:slug
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isActive: true,
    }).populate("category", "name slug");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /products (admin only)
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /products/:id (admin only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /products/:id (admin only - soft deactivate)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deactivated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
