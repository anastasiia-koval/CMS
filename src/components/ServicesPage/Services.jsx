import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
import Loading from "../Loading/Loading";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Services = () => {
  const classes = useStyles();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axiosInstance.get(`${REACT_APP_MY_ENV}/services`).then((res) => {
      setServices(res.data);
    });
  }, []);

  if (services.length === 0) {
    return <Loading />;
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nazwa</TableCell>
            <TableCell align="right">Rezerwuj wizytę</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.title}</TableCell>
              <TableCell align="right">
                <Button
                  component={Link}
                  to="/reservation"
                  state={{ service: service.id }}
                  color="primary"
                  variant="outlined"
                  endIcon={<ArrowForward />}
                >
                  Rezerwuj
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Services;
