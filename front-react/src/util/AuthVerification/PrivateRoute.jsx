import React, { useContext } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import UserContext from "../../context/User/UserContext";
import Login from "../../screens/Login/Login";

const PrivateRoute = ({ path, Component, userRoles, loggedIn }) => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path={path} element={loggedIn ? <Component /> : <Login />} />
    </Routes>
  );
};

export default PrivateRoute;
