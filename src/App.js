import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./components/navbar/Navbar";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import MainPage from "./screens/MainPage/MainPage";
import BlogPage from "./screens/BlogPage/BlogPage";
import PostDescription from "./components/PostComponent/PostDescription";
import UserContext from "./context/User/UserContext";
import Specialists from "./components/SpecialistsPage/Specialists";
import Services from "./components/ServicesPage/Services";
import UserAccountPage from "./screens/UserAccountPage/UserAccountPage";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    margin: "86px 175px",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down("xs")]: {
      padding: "64px 30px 30px",
    },
    [theme.breakpoints.down(350)]: {
      padding: "64px 5% 5%",
    },
  },
}));

const App = () => {
  const { isLoggedIn, role } = useContext(UserContext);
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <Routes>
          <Route
            path="/"
            element={
              role.name === "Specialist" ? (
                <Navigate to="/userAccount" />
              ) : (
                <MainPage />
              )
            }
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/userAccount" element={<UserAccountPage />} />
          {role.name !== "Specialist" && (
            <React.Fragment>
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<PostDescription />} />
              <Route path="/specialists" element={<Specialists />} />
              <Route path="/services" element={<Services />} />
            </React.Fragment>
          )}
        </Routes>
      </div>
    </>
  );
};

export default App;
