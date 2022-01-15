import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./components/Navbar/Navbar";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import MainPage from "./screens/MainPage/MainPage";
import BlogPage from "./screens/BlogPage/BlogPage";
import PostDescription from "./components/PostComponent/PostDescription";
import UserContext from "./context/User/UserContext";
import Specialists from "./components/SpecialistsPage/Specialists";
import Cars from "./components/CarsPage/Cars";
import Services from "./components/ServicesPage/Services";
import Reservations from "./components/Reservations/Reservations";
import UserAccountPage from "./screens/UserAccountPage/UserAccountPage";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    padding: "86px 175px",
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
  const { isLoggedIn } = useContext(UserContext);
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<PostDescription />} />
          <Route path="/specialists" element={<Specialists />} />
          {/* <Route path="/cars/:user_id" element={<TmpCars />} /> */}
          <Route path="/cars" element={<Cars />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reservations/:userId" element={<Reservations />} />
          <Route path="/userAccount" element={<UserAccountPage />} />
        </Routes>
      </div>
    </>
  );
};

//TODO remove it
const TmpCars = () => {
  const { userId } = useContext(UserContext);
  return <Cars userId={userId} />;
};

export default App;
