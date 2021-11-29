import axiosConfig from "axios";

const axios = axiosConfig.create();
axios.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem("jwt");
  if (accessToken) {
    config.headers = {
      Authorization: "Bearer" + accessToken,
    };
  }
  return config;
});

export default axios;
