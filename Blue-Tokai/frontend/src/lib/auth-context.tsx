"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
import { useCartStore } from "./cart-store";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "superadmin";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, try to refresh the token and load user
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await api.post("/auth/refresh"); // cookie sent automatically
        (window as any).__accessToken = data.accessToken;
        const userRes = await api.get("/auth/me");
        setUser(userRes.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    (window as any).__accessToken = data.accessToken;
    setUser(data.user);
    // Fold anything they added as a guest into their account cart. Best
    // effort — a failure here shouldn't block a successful login.
    try {
      await useCartStore.getState().mergeGuestCart();
    } catch (error) {
      // ignore
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    (window as any).__accessToken = null;
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin" || user?.role === "superadmin",
    isSuperAdmin: user?.role === "superadmin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
