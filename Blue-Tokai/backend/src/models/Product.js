const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    shortDescription: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    images: [String],
    basePrice: Number,
    variants: [
      {
        size: String,
        price: Number,
        stock: Number,
        sku: String,
      },
    ],
    grindOptions: [String],
    roastLevel: String,
    tastingNotes: [String],
    isSubscriptionEligible: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    ratings: { average: Number, count: Number },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Product", productSchema);
