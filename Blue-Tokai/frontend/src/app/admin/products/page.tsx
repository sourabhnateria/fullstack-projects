// src/app/admin/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { Category, Product } from "../../../types/product";
import { startingPrice } from "../../../lib/products";
import ProductForm, {
  ProductFormPayload,
} from "../../../components/admin/ProductForm";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get("/products/admin/all"),
        api.get("/categories"),
      ]);
      setProducts(productsRes.data.products ?? []);
      setCategories(categoriesRes.data.categories ?? []);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? "Failed to load products.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateForm = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (payload: ProductFormPayload) => {
    setSubmitting(true);
    setError("");
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      closeForm();
      await loadData();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to save product.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (product: Product) => {
    setError("");
    try {
      if (product.isActive) {
        await api.delete(`/products/${product._id}`);
      } else {
        await api.put(`/products/${product._id}`, { isActive: true });
      }
      await loadData();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to update product.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-coffee-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the catalog — visible to admin and superadmin.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={openCreateForm}
            className="px-4 py-2 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700"
          >
            + Add Product
          </button>
        )}
      </div>

      {error && (
        <p className="p-3 mb-6 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
          {error}
        </p>
      )}

      {showForm && (
        <div className="p-6 mb-8 bg-white border border-gray-200 rounded-lg">
          <h2 className="mb-5 text-lg font-bold text-coffee-900">
            {editingProduct ? "Edit Product" : "New Product"}
          </h2>
          {categories.length === 0 ? (
            <p className="text-sm text-gray-500">
              No categories found. Seed the database or create a category
              first.
            </p>
          ) : (
            <ProductForm
              product={editingProduct}
              categories={categories}
              onSubmit={handleSubmit}
              onCancel={closeForm}
              submitting={submitting}
            />
          )}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading products…</p>
      ) : products.length === 0 ? (
        <p className="text-sm text-gray-500">No products yet.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => {
                const price = startingPrice(product);
                const categoryName =
                  product.category && typeof product.category === "object"
                    ? product.category.name
                    : "—";
                return (
                  <tr key={product._id}>
                    <td className="px-4 py-3 font-medium text-coffee-900">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{categoryName}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {price != null ? `₹${price}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          product.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                      <button
                        onClick={() => openEditForm(product)}
                        className="font-medium text-amber-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleActive(product)}
                        className="font-medium text-gray-500 hover:underline"
                      >
                        {product.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
