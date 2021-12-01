import React, { useContext, useEffect } from "react";
import MuiSnackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { ThemeContext } from "../../context/Theme/ThemeState";

const Snackbar = () => {
  const { snackbarOpen, snackbarError, snackbarMessage, closeSnackbar } =
    useContext(ThemeContext);

  useEffect(() => {
    if (snackbarOpen) {
      setTimeout(() => {
        closeSnackbar();
      }, 5000);
    }
  }, [snackbarOpen]);

  return (
    <MuiSnackbar
      open={snackbarOpen}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={snackbarError ? "error" : "success"}>
        {snackbarMessage}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
