import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PaddedSite from "../../components/PaddedSite/PaddedSite";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { fields } from "./fields";
import axios from "../../util/axios";
import UserContext from "../../context/User/UserContext";

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
    axios
      .post("/auth/local", {
        identifier: values.email,
        password: values.password,
      })
      .then((res) => {
        navigate("/");
        handleLogin(res.data.user, res.data.jwt);
      })
      .catch((err) => {
        setError(err.response.status);
      });
  };

  return (
    <Card elevation={3} className={classes.root}>
      <Typography variant="h1" component="h1" className={classes.header}>
        Zaloguj się
      </Typography>
      <form className={classes.column} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <TextField
            key={field.id}
            variant="outlined"
            label={field.name}
            type={field.type}
            className={classes.input}
            onChange={(e) => handleChange(e, field.id)}
          />
        ))}
        <Collapse in={error}>
          <Alert severity="error" className={classes.input}>
            {error === 400
              ? "Błędne dane logowania"
              : "Wystąpił nieznany błąd, spróbuj ponownie"}
          </Alert>
        </Collapse>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          disabled={isDisabled(values)}
        >
          Zaloguj się
        </Button>
      </form>
    </Card>
  );
};

export default PaddedSite(Login);
