// src/api/axiosInstance.ts
import axios from "axios";

export const axiosAPIInstace = axios.create({
  baseURL: "https://solo-group.sinontechs.com/api",
  //baseURL: "http://192.168.1.22:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
