export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function apiFetch(path, { method = "GET", body, token } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = token;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

// ---- User auth ----
export const signup = (data) => apiFetch("/signup", { method: "POST", body: data });
export const signin = (data) => apiFetch("/signin", { method: "POST", body: data });
export const showUsers = () => apiFetch("/showuser");
export const deleteUser = (id) => apiFetch(`/deleteuser/${id}`, { method: "DELETE" });

// ---- Admin auth ----
export const adminSignup = (data) => apiFetch("/admin/signup", { method: "POST", body: data });
export const adminSignin = (data) => apiFetch("/admin/signin", { method: "POST", body: data });

// ---- Products ----
export const getProducts = (token) => apiFetch("/pdt", { token });
export const getProductsByCategory = (category, token) =>
  apiFetch(`/pdt/category/${category}`, { token });
export const getProduct = (id, token) => apiFetch(`/pdt/${id}`, { token });
export const addProduct = (data, token) => apiFetch("/pdt", { method: "POST", body: data, token });
export const updateProduct = (id, data, token) =>
  apiFetch(`/pdt/${id}`, { method: "PATCH", body: data, token });
export const deleteProduct = (id, token) => apiFetch(`/pdt/${id}`, { method: "DELETE", token });

// ---- Cart ----
export const getCart = (token) => apiFetch("/cart", { token });
export const addToCart = (data, token) => apiFetch("/cart", { method: "POST", body: data, token });
export const removeFromCart = (id, token) => apiFetch(`/cart/${id}`, { method: "DELETE", token });
export const buyProduct = (data, token) => apiFetch("/buy", { method: "POST", body: data, token });
