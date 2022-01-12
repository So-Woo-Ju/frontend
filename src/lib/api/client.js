import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const client = axios.create({
  baseURL: "http://3.34.255.82/api/v1",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  config.headers.common["Authorization"] = `Bearer ${cookies.get(
    "refresh_token",
  )}`;
  return config;
});

export default client;
