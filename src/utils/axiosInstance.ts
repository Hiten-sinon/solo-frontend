// src/api/axiosInstance.ts
import axios from "axios";

export const axiosAPIInstace = axios.create({
  baseURL: "https://solo-group.sinontechs.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
