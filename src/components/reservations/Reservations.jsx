import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import getServicesString from "../../util/servicesUtil";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const Reservations = (props = { userId: 0 }) => {
    const classes = useStyles();
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        axios.get(`${REACT_APP_MY_ENV}/reservations?user.id=${props.userId}`)
            .then((res) => {
                setReservations(res.data)
            })
    })

    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date from</TableCell>
                <TableCell>Date to</TableCell>
                <TableCell>Car</TableCell>
                <TableCell>Services</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                    <TableCell>{reservation.date_from}</TableCell>
                    <TableCell>{reservation.date_to}</TableCell>
                    <TableCell>{reservation.car.company + ' ' + reservation.car.model}</TableCell>
                    <TableCell>{getServicesString(reservation.services)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default Reservations