import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../context/Theme/ThemeState";
import PageFragment from "./components/PageFragment";
import { Typography, makeStyles } from "@material-ui/core";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    margin: "auto",
  },
  header: {
    marginBottom: "30px",
  },
}));

const MainPage = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
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
  }, []);

  return (
    <div className={classes.root}>
      <Typography className={classes.header} variant="h1" component="h1">
        Warsztaty Car-Service
      </Typography>
      {articles.map((article) => (
        <PageFragment key={article.id} article={article} />
      ))}
    </div>
  );
};

export default MainPage;
