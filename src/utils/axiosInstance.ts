import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? "https://api.solo-group.co/api";
  //  import.meta.env.VITE_API_BASE_URL ?? "http://192.168.1.22:8000/api/";

export const axiosAPIInstace = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Content-Type": "application/json" },
});

axiosAPIInstace.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (!config.headers) config.headers = {} as any;
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosAPIInstace.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized! Logging out...");
        localStorage.removeItem("token");
      }
    }
    return Promise.reject(error);
  }
);
