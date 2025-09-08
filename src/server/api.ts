import axios from "axios";
import { API_URL, AXIOS_TIMEOUT } from "@/lib/constants";

// console.log("API_URL:", API_URL);
// console.log("AXIOS_TIMEOUT:", AXIOS_TIMEOUT);

const api = axios.create({
  baseURL: API_URL,
  timeout: AXIOS_TIMEOUT,
  headers: { "Content-Type": "application/json" },
});

export default api;
