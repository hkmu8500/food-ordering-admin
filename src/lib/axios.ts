import axios from "axios";
import API_BASE_URL from "@/utils/constant";
import { useAuthStore } from "@/stores/useAuthStore";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});

// 请求拦截器 - 添加 X-Admin-Name header
axiosInstance.interceptors.request.use(
  (config) => {
    const userName = useAuthStore.getState().userName || "admin";
    config.headers["X-Admin-Name"] = userName;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
