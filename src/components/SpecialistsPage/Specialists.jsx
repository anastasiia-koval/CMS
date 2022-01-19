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
import Loading from "../Loading/Loading";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  colorAvailable: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #4caf50",
  },
  colorNotAvailable: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #f44336",
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
  if (specialists.length === 0) {
    return <Loading />;
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableCell>Imie</TableCell>
          <TableCell>Nazwisko</TableCell>
          <TableCell>Stanowisko</TableCell>
          <TableCell>Dostępność</TableCell>
        </TableHead>
        <TableBody>
          {specialists.map((specialist) => (
            <TableRow key={specialist.id}>
              <TableCell>{specialist.name}</TableCell>
              <TableCell>{specialist.surname}</TableCell>
              <TableCell>{getServicesString(specialist.services)}</TableCell>
              <TableCell>
                {specialist.available ? (
                  <Chip label="Dostępny" className={classes.colorAvailable} />
                ) : (
                  <Chip
                    label="Nie dostępny"
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
