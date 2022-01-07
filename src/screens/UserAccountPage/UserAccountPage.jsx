import { Typography, Box, makeStyles, Paper } from "@material-ui/core";
import React, { useContext, useState } from "react";
import Reservations from "../../components/Reservations/Reservations";
import UserContext from "../../context/User/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  userInfoCard: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    padding: "20px",
    width: "50%",
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
  },
  accountInfo: {
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    minHeight: "300px",
    padding: "20px",
    marginLeft: "20px",
  },
  text: {
    marginBottom: "15px",
  },
}));
const UserAccountPage = () => {
  const classes = useStyles();
  const { username, email } = useContext(UserContext);
  const [myReservations, setMyReservations] = useState();
  return (
    <div className={classes.root}>
      <Box component={Paper} className={classes.userInfoCard}>
        <Typography gutterBottom component="h6" variant="h6">
          {username}
        </Typography>
        <Typography component="subtitle1" variant="subtitle1">
          {email}
        </Typography>
      </Box>
      <Box component={Paper} className={classes.accountInfo}>
        <Typography className={classes.text} variant="h3">
          Moje rezerwacje
        </Typography>
        <Reservations />
      </Box>
      <div></div>
    </div>
  );
};

export default UserAccountPage;
