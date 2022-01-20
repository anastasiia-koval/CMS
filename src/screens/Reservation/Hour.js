import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/Theme/ThemeState";
import axiosInstance from "../../util/axiosInstance";
import UserContext from "../../context/User/UserContext";
import moment from "moment";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles(() => ({
  flex: {
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "25%",
  },
  root: {
    padding: "10px",
    maxWidth: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  hour: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
}));

const Hour = ({ specialist, date, hour }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const { openSnackbar } = useContext(ThemeContext);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const postReservation = () => {
    setIsLoading(true);
    axiosInstance
      .post(REACT_APP_MY_ENV + "/reservations", {
        date,
        time: moment(date).set("hour", hour).format("HH") + ":00:00.000",
        user: userId,
        specialist,
        status: "Pending",
      })
      .then(() => {
        openSnackbar(false, "Dodano rezerwację.");
        navigate("/");
      })
      .catch(() => {
        openSnackbar(true, "Wystąpił błąd, spróbuj ponownie.");
        setIsLoading(false);
      });
  };

  return (
    <Grid item className={classes.flex}>
      <Card className={classes.root}>
        <Typography className={classes.hour}>{hour}:00</Typography>
        <Button
          disabled={isLoading}
          variant="outlined"
          color="primary"
          onClick={postReservation}
        >
          Rezerwuj
        </Button>
      </Card>
    </Grid>
  );
};

export default Hour;
