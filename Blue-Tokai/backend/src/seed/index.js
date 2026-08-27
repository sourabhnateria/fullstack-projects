require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Category = require("../models/Category");
const Product = require("../models/Product");

const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL || "http://localhost:5000";

const categories = [
  { name: "Coffee", slug: "coffee", description: "Single-origin whole bean and ground coffee." },
  { name: "Equipment", slug: "equipment", description: "Brewing gear for your favorite method." },
  { name: "Merchandise", slug: "merchandise", description: "Mugs, bags, and other Five Roam gear." },
];

const products = [
  {
    name: "Hazelnut Zest Coffee",
    slug: "hazelnut-zest-coffee",
    categorySlug: "coffee",
    images: [`${IMAGE_BASE_URL}/images/products/Hazelnut-Zest-250G.png`],
    shortDescription: "Nutty and rich, with notes of hazelnut and caramel.",
    description:
      "Grown in the highlands and roasted in small batches, this medium-roast single origin balances toasted hazelnut against a smooth cocoa finish.",
    roastLevel: "Medium",
    tastingNotes: ["Hazelnut", "Cocoa", "Caramel"],
    grindOptions: ["Whole Bean", "Filter", "Espresso", "French Press"],
    isSubscriptionEligible: true,
    variants: [
      { size: "250g", price: 650, stock: 40, sku: "HZC-250" },
      { size: "500g", price: 1150, stock: 25, sku: "HZC-500" },
      { size: "1kg", price: 2100, stock: 10, sku: "HZC-1000" },
    ],
  },
  {
    name: "Lavender Cocoa Coffee",
    slug: "lavender-cocoa-coffee",
    categorySlug: "coffee",
    shortDescription: "Floral and delicate, with a soft cocoa backbone.",
    description:
      "A light-medium roast that pairs floral lavender aromatics with a mellow cocoa body, ideal for pour-over brewing.",
    roastLevel: "Light",
    tastingNotes: ["Lavender", "Cocoa", "Floral"],
    grindOptions: ["Whole Bean", "Filter", "French Press"],
    isSubscriptionEligible: true,
    variants: [
      { size: "250g", price: 650, stock: 35, sku: "LCC-250" },
      { size: "500g", price: 1150, stock: 20, sku: "LCC-500" },
    ],
  },
  {
    name: "Mulberry Wine Coffee",
    slug: "mulberry-wine-coffee",
    categorySlug: "coffee",
    shortDescription: "Bold and fruity, with a wine-like acidity.",
    description:
      "A natural-processed lot with vivid mulberry and red wine notes up front, finishing fruity and complex.",
    roastLevel: "Medium",
    tastingNotes: ["Mulberry", "Red Wine", "Fruity"],
    grindOptions: ["Whole Bean", "Filter", "Espresso"],
    isSubscriptionEligible: true,
    variants: [
      { size: "250g", price: 700, stock: 30, sku: "MWC-250" },
      { size: "500g", price: 1250, stock: 18, sku: "MWC-500" },
      { size: "1kg", price: 2300, stock: 8, sku: "MWC-1000" },
    ],
  },
  {
    name: "Golden Mandarin Coffee",
    slug: "golden-mandarin-coffee",
    categorySlug: "coffee",
    shortDescription: "Bright and citrusy, with mandarin and kiwi notes.",
    description:
      "A washed-process coffee with a clean, bright cup — mandarin and kiwi up front with a crisp citrus finish.",
    roastLevel: "Light",
    tastingNotes: ["Mandarin", "Kiwi", "Citrus"],
    grindOptions: ["Whole Bean", "Filter"],
    isSubscriptionEligible: false,
    variants: [
      { size: "250g", price: 600, stock: 45, sku: "GMC-250" },
      { size: "500g", price: 1050, stock: 22, sku: "GMC-500" },
    ],
  },
  {
    name: "Classic Filter Coffee",
    slug: "classic-filter-coffee",
    categorySlug: "coffee",
    shortDescription: "A traditional South Indian filter coffee blend.",
    description:
      "A dark-roast blend of Arabica and Robusta, ground fine for the classic South Indian filter — bold, malty, and comforting.",
    roastLevel: "Dark",
    tastingNotes: ["Malt", "Dark Chocolate", "Roasted Nuts"],
    grindOptions: ["Filter", "Whole Bean"],
    isSubscriptionEligible: true,
    variants: [
      { size: "250g", price: 450, stock: 50, sku: "CFC-250" },
      { size: "500g", price: 800, stock: 30, sku: "CFC-500" },
    ],
  },
  {
    name: "Midnight Espresso Roast",
    slug: "midnight-espresso-roast",
    categorySlug: "coffee",
    shortDescription: "A deep, dark roast built for espresso.",
    description:
      "Roasted dark for a heavy body and low acidity, this blend was built for espresso — think dark chocolate, roasted almond, and a lingering smoky finish.",
    roastLevel: "Dark",
    tastingNotes: ["Dark Chocolate", "Roasted Almond", "Smoky"],
    grindOptions: ["Whole Bean", "Espresso"],
    isSubscriptionEligible: true,
    variants: [
      { size: "250g", price: 700, stock: 28, sku: "MER-250" },
      { size: "1kg", price: 2400, stock: 6, sku: "MER-1000" },
    ],
  },
  {
    name: "Classic French Press",
    slug: "classic-french-press",
    categorySlug: "equipment",
    shortDescription: "A 600ml borosilicate glass French press.",
    description:
      "Brew a full-bodied cup at home with this 600ml borosilicate glass French press with a stainless steel plunger and mesh filter.",
    isSubscriptionEligible: false,
    variants: [{ size: "600ml", price: 1400, stock: 15, sku: "FP-600" }],
  },
  {
    name: "Ceramic Pour-Over Dripper",
    slug: "ceramic-pour-over-dripper",
    categorySlug: "equipment",
    shortDescription: "A hand-glazed ceramic dripper for clean, bright cups.",
    description:
      "Our hand-glazed ceramic dripper is designed for even extraction and a clean, bright cup — pairs perfectly with our light-roast single origins.",
    isSubscriptionEligible: false,
    variants: [{ size: "Standard", price: 950, stock: 20, sku: "POD-STD" }],
  },
  {
    name: "Five Roam Ceramic Mug",
    slug: "five-roam-ceramic-mug",
    categorySlug: "merchandise",
    shortDescription: "A 350ml ceramic mug with the Five Roam wordmark.",
    description:
      "Start every morning right with this 350ml ceramic mug, glazed matte black with the Five Roam wordmark.",
    isSubscriptionEligible: false,
    variants: [{ size: "350ml", price: 450, stock: 60, sku: "MUG-350" }],
  },
  {
    name: "Canvas Tote Bag",
    slug: "canvas-tote-bag",
    categorySlug: "merchandise",
    shortDescription: "A durable canvas tote for your coffee runs.",
    description:
      "A heavyweight canvas tote bag printed with our estate map graphic — sturdy enough for a grocery run or a bag of beans.",
    isSubscriptionEligible: false,
    variants: [{ size: "One Size", price: 350, stock: 40, sku: "TOTE-OS" }],
  },
];

async function seed() {
  await connectDB();

  const categoryDocs = {};
  for (const cat of categories) {
    const doc = await Category.findOneAndUpdate(
      { slug: cat.slug },
      cat,
      { new: true, upsert: true },
    );
    categoryDocs[cat.slug] = doc;
    console.log(`Category ready: ${doc.name}`);
  }

  for (const p of products) {
    const { categorySlug, variants, ...rest } = p;
    const basePrice = Math.min(...variants.map((v) => v.price));
    const doc = await Product.findOneAndUpdate(
      { slug: p.slug },
      {
        ...rest,
        variants,
        basePrice,
        category: categoryDocs[categorySlug]._id,
        isActive: true,
      },
      { new: true, upsert: true },
    );
    console.log(`Product ready: ${doc.name}`);
  }

  console.log("Seed complete.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
