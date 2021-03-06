import React, { useState, useContext } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import PaddedSite from "../../components/PaddedSite/PaddedSite";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { fields } from "./fields";
import axiosInstance from "../../util/axiosInstance";
import UserContext from "../../context/User/UserContext";
import jwt from "jwt-decode";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "640px",
    margin: "auto",
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
  },
}));

const createValues = () => {
  const values = {};
  fields.forEach((field) => (values[field.id] = ""));
  return values;
};

const isDisabled = (values) => {
  let isDisabled = false;
  Object.keys(values).forEach((key) => {
    if (!values[key]) {
      isDisabled = true;
    }
  });

  return isDisabled;
};

const Login = () => {
  const classes = useStyles();
  const [values, setValues] = useState(createValues());
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);

  const handleChange = (e, key) => {
    const tmpValues = { ...values };
    tmpValues[key] = e.target.value;
    setError(false);
    setValues(tmpValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`${REACT_APP_MY_ENV}/auth/local`, {
        identifier: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log("resLogin :>> ", res);
        navigate("/");
        const token = jwt(res.data.jwt);
        console.log("token :>> ", token);
        handleLogin(res.data.user, res.data.jwt, token.id);
      })
      .catch((err) => {
        setError(err.response ? err.response.status : -1);
      });
  };

  return (
    <Card elevation={3} className={classes.root}>
      <Typography variant="h1" component="h1" className={classes.header}>
        Zaloguj si??
      </Typography>
      <form className={classes.column} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <TextField
            key={field.id}
            variant="outlined"
            label={field.name}
            name={field.id}
            type={field.type}
            className={classes.input}
            onChange={(e) => handleChange(e, field.id)}
          />
        ))}
        <Collapse in={!!error}>
          <Alert severity="error" className={classes.input}>
            {error === 400
              ? "B????dne dane logowania"
              : "Wyst??pi?? nieznany b????d, spr??buj ponownie"}
          </Alert>
        </Collapse>
        <Typography className={classes.input}>
          Nie masz jeszcze konta?{" "}
          <Link component={RouterLink} to="/register">
            Stw??rz je teraz!
          </Link>
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          disabled={isDisabled(values)}
        >
          Zaloguj si??
        </Button>
      </form>
    </Card>
  );
};

export default PaddedSite(Login);
