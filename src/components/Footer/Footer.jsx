import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: "1rem",
    position: "inherit",
    bottom: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  root: {
    width: "100%",
    padding: "25px",
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "75px",
  },
  data: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    // gap: "205px",

    "& p": {
      fontWeight: "500",
    },
  },
  address: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div color="transparent" className={classes.footer}>
      <Paper className={classes.root}>
        <div className={classes.header}>
          <Typography>Telefon kontaktowy</Typography>
          <Typography>Email</Typography>
          <Typography>Adres serwisu samochodowego</Typography>
        </div>
        <div className={classes.data}>
          <Typography>22 333 111 220</Typography>
          <Typography style={{ marginRight: "-40px" }}>
            car-service@car-service.pl
          </Typography>
          <div className={classes.address}>
            <Typography>Al. Jerozolimskie 160, Ochota</Typography>
            <Typography>Radzymińska 171, Targówek</Typography>
            <Typography>Ostrobramska 64, Praga-Południe</Typography>
          </div>
        </div>
        <Typography
          variant="body2"
          style={{ textAlign: "center", marginTop: "20px", color: "gray" }}
        >
          copyright 2022 - wszelkie prawa zastrzeżone
        </Typography>
      </Paper>
    </div>
  );
};

export default Footer;
