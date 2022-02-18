import Cookies from "universal-cookie";
import axios from "axios";
import { API_URL } from "lib/config";

const cookies = new Cookies();

const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  const token = cookies.get("refresh_token");
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

export default client;
