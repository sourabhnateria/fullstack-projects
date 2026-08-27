// src/app/account/addresses/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import api from "../../../lib/api";
import { Address } from "../../../types/user";

const EMPTY_FORM = {
  label: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

export default function AccountAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const loadAddresses = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/auth/me");
      setAddresses(data.user.addresses ?? []);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to load addresses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEditForm = (address: Address) => {
    setEditingId(address._id);
    setForm({
      label: address.label ?? "",
      line1: address.line1 ?? "",
      line2: address.line2 ?? "",
      city: address.city ?? "",
      state: address.state ?? "",
      pincode: address.pincode ?? "",
      isDefault: address.isDefault ?? false,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (editingId) {
        await api.put(`/auth/me/addresses/${editingId}`, form);
      } else {
        await api.post("/auth/me/addresses", form);
      }
      closeForm();
      await loadAddresses();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to save address.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this address?")) return;
    setError("");
    try {
      await api.delete(`/auth/me/addresses/${id}`);
      await loadAddresses();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to delete address.");
    }
  };

  const handleMakeDefault = async (address: Address) => {
    setError("");
    try {
      await api.put(`/auth/me/addresses/${address._id}`, {
        isDefault: true,
      });
      await loadAddresses();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to update address.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-coffee-900">Addresses</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the addresses you ship orders to.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={openCreateForm}
            className="px-4 py-2 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700"
          >
            + Add Address
          </button>
        )}
      </div>

      {error && (
        <p className="p-3 mb-6 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
          {error}
        </p>
      )}

      {showForm && (
        <div className="max-w-lg p-6 mb-8 bg-white border border-gray-200 rounded-lg">
          <h2 className="mb-5 text-lg font-bold text-coffee-900">
            {editingId ? "Edit Address" : "New Address"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Label
              </label>
              <input
                type="text"
                placeholder="Home, Work, etc."
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Address Line 1
              </label>
              <input
                type="text"
                required
                value={form.line1}
                onChange={(e) => setForm({ ...form, line1: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Address Line 2
              </label>
              <input
                type="text"
                value={form.line2}
                onChange={(e) => setForm({ ...form, line2: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                required
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) =>
                  setForm({ ...form, isDefault: e.target.checked })
                }
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              Set as default address
            </label>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Add Address"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="px-6 py-2.5 font-semibold text-gray-700 transition border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading addresses…</p>
      ) : addresses.length === 0 ? (
        <p className="text-sm text-gray-500">
          No addresses saved yet. Add one to speed up checkout.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="relative p-4 border border-gray-200 rounded-lg"
            >
              {address.isDefault && (
                <span className="absolute px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full top-3 right-3">
                  Default
                </span>
              )}
              <p className="font-semibold text-coffee-900">
                {address.label || "Address"}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {address.line1}
                {address.line2 ? `, ${address.line2}` : ""}
              </p>
              <p className="text-sm text-gray-600">
                {address.city}, {address.state} {address.pincode}
              </p>
              <div className="flex gap-3 mt-3 text-sm">
                <button
                  onClick={() => openEditForm(address)}
                  className="font-medium text-amber-600 hover:underline"
                >
                  Edit
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleMakeDefault(address)}
                    className="font-medium text-gray-500 hover:underline"
                  >
                    Set as default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(address._id)}
                  className="font-medium text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
