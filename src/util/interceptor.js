import axiosInstance from "./axiosInstance";

const interceptor = (navigate, openSnackbar) => {
  axiosInstance.interceptors.response.use(
    (next) => Promise.resolve(next),
    (error) => {
      if (
        error &&
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        openSnackbar(true, "Nie masz dostępu do tej strony");
        navigate("/");
      }
      return Promise.reject(error);
    }
  );
};

export default interceptor;
