// src/app/account/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import api from "../../lib/api";
import { useAuth } from "../../lib/auth-context";
import { FullUser } from "../../types/user";

export default function AccountProfilePage() {
  const { updateUser } = useAuth();

  const [profile, setProfile] = useState<FullUser | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileSubmitting, setProfileSubmitting] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    api
      .get("/auth/me")
      .then(({ data }) => {
        setProfile(data.user);
        setName(data.user.name ?? "");
        setPhone(data.user.phone ?? "");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProfileSubmitting(true);
    setProfileError("");
    setProfileSuccess("");
    try {
      const { data } = await api.patch("/auth/me", { name, phone });
      setProfile(data.user);
      updateUser({ name: data.user.name });
      setProfileSuccess("Profile updated successfully.");
    } catch (err: any) {
      setProfileError(
        err?.response?.data?.message ?? "Failed to update profile.",
      );
    } finally {
      setProfileSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setPasswordSubmitting(true);
    try {
      await api.patch("/auth/me/password", {
        currentPassword,
        newPassword,
      });
      setPasswordSuccess("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordError(
        err?.response?.data?.message ?? "Failed to change password.",
      );
    } finally {
      setPasswordSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading profile…</p>;
  }

  return (
    <div className="max-w-lg space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-coffee-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your name and contact number.
        </p>
      </div>

      <form onSubmit={handleProfileSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            disabled
            value={profile?.email ?? ""}
            className="w-full px-3 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {profileError && (
          <p className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
            {profileError}
          </p>
        )}
        {profileSuccess && (
          <p className="p-3 text-sm text-green-700 border border-green-200 rounded-md bg-green-50">
            {profileSuccess}
          </p>
        )}

        <button
          type="submit"
          disabled={profileSubmitting}
          className="px-6 py-2.5 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {profileSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <div className="pt-8 border-t border-gray-200">
        <h2 className="text-lg font-bold text-coffee-900">Change Password</h2>
        <p className="mt-1 mb-4 text-sm text-gray-500">
          Choose a strong password you don't use elsewhere.
        </p>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {passwordError && (
            <p className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
              {passwordError}
            </p>
          )}
          {passwordSuccess && (
            <p className="p-3 text-sm text-green-700 border border-green-200 rounded-md bg-green-50">
              {passwordSuccess}
            </p>
          )}

          <button
            type="submit"
            disabled={passwordSubmitting}
            className="px-6 py-2.5 font-semibold text-white transition rounded-md bg-amber-600 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {passwordSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
