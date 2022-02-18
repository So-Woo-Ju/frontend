import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
