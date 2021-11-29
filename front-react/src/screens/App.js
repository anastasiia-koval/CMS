import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/navbar/Navbar";
import Login from "./Login/Login";
import MainPage from "./MainPage/MainPage";
import BlogPage from "./BlogPage/BlogPage";
import PostDescription from "../components/PostComponent/PostDescription";
import PrivateRoute from "../util/AuthVerification/PrivateRoute";
import UserContext from "../context/User/UserContext";
import Specialists from "../components/specialists/Specialists";

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
  const { isLoggedIn, handleLogout } = useContext(UserContext);
  const classes = useStyles();
  return (
    <Router>
      <Navbar />
      <div className={classes.root}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/blog" element={<BlogPage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/blog/:id" element={<PostDescription />} />
          <Route path="/specialists" element={<Specialists />} />
        </Routes>
        <PrivateRoute
          path="/blog"
          Component={BlogPage}
          loggedIn={isLoggedIn}
          // userRoles={["Authenticated"]}
        />
      </div>
    </Router>
  );
};

export default App;
