import React, { useContext, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./components/navbar/Navbar";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import MainPage from "./screens/MainPage/MainPage";
import BlogPage from "./screens/BlogPage/BlogPage";
import PostDescription from "./components/PostComponent/PostDescription";
import { useParams } from "react-router-dom";
import UserContext from "./context/User/UserContext";
import Specialists from "./components/specialists/Specialists";
import Cars from "./components/cars/Cars";
import Services from "./components/services/Services";
import Reservations from "./components/reservations/Reservations";

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
export const GlobalContext = createContext({});
const App = () => {
  const { isLoggedIn, handleLogout } = useContext(UserContext);
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<PostDescription />} />
          <Route path="/specialists" element={<Specialists />} />
          <Route path="/cars/:user_id" element={<TmpCars />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reservations/:user_id" element={<TmpReservations />} />
        </Routes>
      </div>
    </>
  );
};

//TODO remove it
const TmpCars = () => {
  const { user_id } = useParams();
  return <Cars userId={user_id} />
}

//TODO remove it
const TmpReservations = () => {
  const { user_id } = useParams();
  return <Reservations userId={user_id} />
}

export default App;
