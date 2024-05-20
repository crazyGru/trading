import axios from "axios";
import { API_URL } from "./config";

const Axios = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: localStorage.getItem("accessToken"),
  },
});

Axios.interceptors.response.use(
  (e) => {
    return e;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await Axios.post("/auth/refresh-tokens", {
            refreshToken,
          });
          const newAccessToken = data.access.token;
          const newRefreshToken = data.refresh.token;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          Axios.defaults.headers.common["Authorization"] = newAccessToken;
          Axios(originalRequest);
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
