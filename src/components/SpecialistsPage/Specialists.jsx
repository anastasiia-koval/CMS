import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chip,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import axiosInstance from "../../util/axiosInstance";
import getServicesString from "../../util/servicesUtil";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  colorAvailable: {
    backgroundColor: "#4caf50",
  },
  colorNotAvailable: {
    backgroundColor: "#f44336",
  },
}));

const Specialists = () => {
  const classes = useStyles();
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${REACT_APP_MY_ENV}/specialists`)
      .then((res) => {
        setSpecialists(res.data);
        console.log("res :>> ", res);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableCell>Name</TableCell>
          <TableCell>Surname</TableCell>
          <TableCell>JobTitle</TableCell>
          <TableCell>Availability</TableCell>
        </TableHead>
        <TableBody>
          {specialists.map((specialist) => (
            <TableRow key={specialist.id}>
              <TableCell>{specialist.name}</TableCell>
              <TableCell>{specialist.surname}</TableCell>
              <TableCell>{getServicesString(specialist.services)}</TableCell>
              <TableCell>
                {specialist.available ? (
                  <Chip label="Available" className={classes.colorAvailable} />
                ) : (
                  <Chip
                    label="Not available"
                    className={classes.colorNotAvailable}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Specialists;
