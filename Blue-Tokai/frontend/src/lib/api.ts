import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // to send cookies
});

// Attach access token from memory
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = (window as any).__accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// On 401, attempt to refresh the token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // The silent "am I logged in" check itself failing just means
    // there's no session — let the caller handle that quietly, don't
    // try to refresh the refresh call or redirect anywhere.
    if (originalRequest?.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        (window as any).__accessToken = data.accessToken;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // No session to refresh. Plenty of endpoints (cart, checkout) are
        // usable by guests and are expected to 401 here — let the caller
        // decide what to do instead of bouncing the whole app to /login.
        // Routes that actually require auth (account/, admin/) already
        // guard themselves via useAuth() in their layouts.
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
