import { types } from "./types";

const keysToKeep = ["blocked", "confirmed", "email", "username"];

export default (state, action) => {
  switch (action.type) {
    case types.HANDLE_LOGIN: {
      localStorage.setItem("jwt", action.jwt);

      const user = {};
      keysToKeep.forEach((key) => {
        user[key] = action.user[key];
      });

      const role = {
        name: action.user.role.name,
        type: action.user.role.type,
      };

      return {
        ...state,
        ...user,
        role,
        jwt: action.jwt,
        isLoggedIn: true,
      };
    }
    case types.HANDLE_LOGOUT: {
      return {
        ...action.initialState,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
