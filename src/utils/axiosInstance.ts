import axios from "axios";

export const axiosAPIInstace = axios.create({
  baseURL: "https://solo-group.sinontechs.com/api/",
});
