import React, { useEffect, useReducer } from "react";
import { types } from "./types";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

const UserState = (props) => {
  const initialState = {
    blocked: false,
    confirmed: false,
    email: "",
    username: "",
    isLoggedIn: false,
    role: {
      name: "",
      type: "",
    },
    jwt: "",
    userId: "",
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
    localStorage.setItem("userId", state.userId);
  }, [state]);

  const handleLogin = (user, jwt, userId) => {
    dispatch({ type: types.HANDLE_LOGIN, user, jwt, userId });
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
