import {
  Typography,
  Box,
  makeStyles,
  Paper,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/User/UserContext";
import axiosInstance from "../../util/axiosInstance";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
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
    marginRight: "20px",
    [theme.breakpoints.down("xs")]: {
      marginRight: "0px",
      marginBottom: "20px",
      width: "100%",
      maxWidth: "300px",
    },
  },
  accountInfo: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    minHeight: "300px",
    padding: "20px",
  },
  text: {
    marginBottom: "15px",
  },
  loader: {
    width: "100%",
    flexGrow: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const UserAccountPage = () => {
  const classes = useStyles();
  const { username, userId, email, role } = useContext(UserContext);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url =
      role.name === "Specialist"
        ? "/reservations?specialist.user="
        : "/reservations?user.id=";
    axiosInstance
      .get(
        `${REACT_APP_MY_ENV}${url}${userId}&date_gte=${moment().format(
          "YYYY-MM-DD"
        )}`
      )
      .then((response) => {
        setReservations(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

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
          Nadchodzące rezerwacje
        </Typography>
        {isLoading ? (
          <Box className={classes.loader}>
            <CircularProgress size={48} />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data rezerwacji</TableCell>
                <TableCell>Godzina rezerwacji</TableCell>
                <TableCell>
                  {role.name === "Specialist" ? "Klient" : "Mechanik"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow>
                  <TableCell>
                    {moment(reservation.date).format("DD.MM.YYYY")}
                  </TableCell>
                  <TableCell>{reservation.time?.split(":")[0]}:00</TableCell>
                  <TableCell>
                    {role.name === "Specialist"
                      ? reservation.user.username
                      : `${reservation.specialist.name} ${reservation.specialist.surname}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
      <div></div>
    </div>
  );
};

export default UserAccountPage;
