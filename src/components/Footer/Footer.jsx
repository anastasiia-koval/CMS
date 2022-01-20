import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import { useContext } from "react";
import UserContext from "../../context/User/UserContext";

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
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    }
  },
  data: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "15px",
    }
  },
  phone: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: "1",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "15px",
    }
  },
  header: {
    fontWeight: "bold",
    marginBottom: "15px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    }
  }
}));

const Footer = () => {
  const classes = useStyles();
  const { locations } = useContext(UserContext);
  console.log(locations);

  return (
    <div color="transparent" className={classes.footer}>
      <Paper className={classes.root}>
        <div className={classes.data}>
          <Typography className={classes.header}>Adres e-mail</Typography>
          <Typography>car-service@car-service.pl</Typography>
        </div>
        <div className={classes.phone}>
          <Typography className={classes.header}>Numer telefonu</Typography>
          <Typography>22 333 11 22</Typography>
        </div>
        <div className={classes.data}>
          <Typography className={classes.header}>Gdzie nas znajdziesz?</Typography>
          {locations.map((location) => (
              <Typography key={location.id}>{location.streetName}</Typography>
            ))}
        </div>
      </Paper>
    </div>
  );
};

export default Footer;
