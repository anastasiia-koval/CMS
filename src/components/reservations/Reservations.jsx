import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axiosInstance from "../../util/axiosInstance";
import UserContext from "../../context/User/UserContext";
import getServicesString from "../../util/servicesUtil";
import { convertDate } from "../../util/convertDate";
import { Chip } from "@material-ui/core";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Reservations = () => {
  const classes = useStyles();
  const { userId } = useContext(UserContext);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${REACT_APP_MY_ENV}/reservations?user.id=${userId}`)
      .then((res) => {
        setReservations(res.data);
        console.log("resReservation :>> ", res);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return (
    <TableContainer component={Paper} style={{ boxShadow: "none" }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date from</TableCell>
            <TableCell>Date to</TableCell>
            {/* <TableCell>Car</TableCell> */}
            <TableCell>Services</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{convertDate(reservation.date_from)}</TableCell>
              <TableCell>{convertDate(reservation.date_to)}</TableCell>
              {/* <TableCell>
                {reservation.car.company + " " + reservation.car.model}
              </TableCell> */}
              <TableCell>{getServicesString(reservation.services)}</TableCell>
              <TableCell>
                <Chip
                  label={reservation.status}
                  style={
                    reservation.status === "Pending"
                      ? { backgroundColor: "#ff9800" }
                      : reservation.status === "Active"
                      ? { backgroundColor: "#4caf50" }
                      : { backgroundColor: "rgba(0, 0, 0, 0.54)" }
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Reservations;
