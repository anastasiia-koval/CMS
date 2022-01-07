import axiosConfig from "axios";

const axiosInstance = axiosConfig.create();
axiosInstance.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem("jwt");
  if (accessToken) {
    config.headers = {
      Authorization: "Bearer " + accessToken,
    };
  }
  return config;
});

export default axiosInstance;
