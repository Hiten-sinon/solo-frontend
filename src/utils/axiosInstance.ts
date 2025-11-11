import axios from "axios";
export const axiosAPIInstace = axios.create({
  baseURL: "https://solo-group.sinontechs.com/api",
  headers: { "Content-Type": "application/json" },
});

axiosAPIInstace.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
