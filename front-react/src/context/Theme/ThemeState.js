import React, { useReducer, createContext } from "react";
import { types } from "./types";

export const ThemeContext = createContext();

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case types.CHANGE_THEME: {
      localStorage.setItem("theme", action.theme)
      return {
        ...state,
        theme: action.theme,
        hasChanged: action.hasChanged ? true : false,
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
    theme: localStorage.getItem("theme") ?? 'light',
    hasChanged: false,
  };

  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  const setTheme = (theme, hasChanged) =>
    dispatch({ type: types.CHANGE_THEME, theme, hasChanged });

  return (
    <ThemeContext.Provider value={{ setTheme, ...state }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
