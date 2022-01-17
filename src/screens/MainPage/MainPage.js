import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../context/Theme/ThemeState";
import PageFragment from "./components/PageFragment";
import { Typography, makeStyles } from "@material-ui/core";
import Loading from "../../components/Loading/Loading";
import GoogleMaps from "../../components/GoogleMaps/GoogleMaps";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    margin: "auto",
    height: "100%",
  },
  header: {
    marginBottom: "30px",
  },
}));

const MainPage = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [location, setLocation] = useState([]);
  const { openSnackbar } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get(`${REACT_APP_MY_ENV}/home-page-articles`, {
        params: { _sort: ["order:ASC"].join(",") },
      })
      .then((response) => {
        setArticles(response.data);
      })
      .catch(() => {
        openSnackbar(true, "Wystąpił błąd. Spróbuj odświeżyć stronę.");
      });
    // axios
    //   .get(`${REACT_APP_MY_ENV}/locations`)
    //   .then((res) => {
    //     console.log("res :>> ", res);
    //     setLocation(res.data);
    //   })
    //   .catch((err) => {
    //     openSnackbar(true, "Wystąpił błąd. Spróbuj odświeżyć stronę.");
    //   });
  }, []);

  if (articles.length === 0 && location.length === 0 && location) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.header} variant="h1" component="h1">
        Warsztaty Car-Service
      </Typography>
      {articles.map((article) => (
        <PageFragment key={article.id} article={article} />
      ))}
      <GoogleMaps locations={location.length !== 0 && location && location} />
    </div>
  );
};

export default MainPage;
