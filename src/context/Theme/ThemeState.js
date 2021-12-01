import React, { useReducer, createContext } from "react";
import { types } from "./types";

export const ThemeContext = createContext();

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case types.CHANGE_THEME: {
      localStorage.setItem("theme", action.theme);
      return {
        ...state,
        theme: action.theme,
        hasChanged: action.hasChanged ? true : false,
      };
    }

    case types.OPEN_SNACKBAR: {
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: action.message,
        snackbarError: action.error,
      };
    }
    case types.CLOSE_SNACKBAR: {
      return {
        ...state,
        snackbarOpen: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

const ThemeState = (props) => {
  const initialState = {
    theme: localStorage.getItem("theme") ?? "light",
    hasChanged: false,
    snackbarOpen: false,
    snackbarError: false,
    snackbarMessage: "",
  };

  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  const setTheme = (theme, hasChanged) =>
    dispatch({ type: types.CHANGE_THEME, theme, hasChanged });

  const openSnackbar = (error, message) =>
    dispatch({ type: types.OPEN_SNACKBAR, error, message });
  const closeSnackbar = () => dispatch({ type: types.CLOSE_SNACKBAR });

  return (
    <ThemeContext.Provider
      value={{ setTheme, openSnackbar, closeSnackbar, ...state }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
