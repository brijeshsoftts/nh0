import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let refreshPromise: any = null;

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Only handle 401
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Don't refresh if the failed request was already /refresh
    if (originalRequest.url === "/auth/refresh") {
      return Promise.reject(error);
    }

    // Prevent infinite retry
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // If refresh is already happening, wait for it.
      if (!refreshPromise) {
        refreshPromise = apiClient.post("/auth/refresh").finally(() => {
          refreshPromise = null;
        });
      }

      // Wait for the single refresh request
      await refreshPromise;

      // Retry the original request.
      // Browser automatically sends the new access-token cookie.
      return apiClient(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);
