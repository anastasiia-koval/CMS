import React, { useEffect, useReducer, useState } from "react";
import { types } from "./types";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

const UserState = (props) => {
  const initialState = {
    blocked: false,
    confirmed: false,
    email: "",
    username: "",
    loggedIn: false,
    role: {
      name: "",
      type: "",
    },
    jwt: "",
  };

  const [state, dispatch] = useReducer(
    UserReducer,
    localStorage.getItem("userState")
      ? JSON.parse(localStorage.getItem("userState"))
      : initialState
  );

  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(state));
    localStorage.setItem("jwt", state.jwt);
  }, [state]);

  const handleLogin = (user, jwt) => {
    dispatch({ type: types.HANDLE_LOGIN, user, jwt });
  };

  const handleLogout = () => {
    dispatch({ type: types.HANDLE_LOGOUT, initialState });
  };

  return (
    <UserContext.Provider value={{ ...state, handleLogin, handleLogout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
