import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

const Loading = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    spinner: {
      color: theme.palette.text.main,
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.spinner} />
    </div>
  );
};

export default Loading;
