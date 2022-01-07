import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axiosInstance from "../../util/axiosInstance";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Cars = (props = { userId: 0 }) => {
  const classes = useStyles();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axiosInstance.get(`${REACT_APP_MY_ENV}/cars`).then((res) => {
      setCars(res.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Car number</TableCell>
            <TableCell>VIN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>{car.company}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.car_number}</TableCell>
              <TableCell>{car.vin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Cars;
