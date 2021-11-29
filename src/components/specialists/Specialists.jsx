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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Specialists = () => {
  const classes = useStyles();
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    axios
      .get("/specialists")
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
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>JobTitle</TableCell>
            <TableCell>Availability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {specialists.map((specialist) => (
            <TableRow key={specialist.id}>
              <TableCell>{specialist.name}</TableCell>
              <TableCell>{specialist.surname}</TableCell>
              <TableCell>{specialist.job.jobTitle}</TableCell>
              <TableCell>
                {specialist.available ? "Available" : "Not available"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Specialists;
