// axios-config.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "access-control-allow-origin": "*",
    // Other common headers can be added here
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

export default axiosInstance;
