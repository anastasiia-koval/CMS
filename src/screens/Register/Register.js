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
import { hasErrors, validateForm } from "../../util/validateForm";
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

const Register = () => {
  const classes = useStyles();
  const [values, setValues] = useState(createValues());
  const [errors, setErrors] = useState({});
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
    const errors = validateForm(fields, values);
    setErrors(errors);
    if (hasErrors(errors)) {
      setError(-2);
      return;
    }

    axios
      .post(`${REACT_APP_MY_ENV}/auth/local/register`, {
        email: values.email,
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        navigate("/");
        handleLogin(res.data.user, res.data.jwt);
      })
      .catch((err) => {
        setError(err.response ? err.response.status : -1);
      });
  };

  return (
    <Card elevation={3} className={classes.root}>
      <Typography variant="h1" component="h1" className={classes.header}>
        Zarejestruj się
      </Typography>
      <form className={classes.column} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <TextField
            key={field.id}
            variant="outlined"
            label={field.name}
            name={field.id}
            type={field.type ? field.type : "text"}
            autoComplete={field.autocomplete}
            className={classes.input}
            error={!!errors[field.id]}
            helperText={errors[field.id]}
            onChange={(e) => handleChange(e, field.id)}
          />
        ))}
        <Collapse in={!!error}>
          <Alert severity="error" className={classes.input}>
            {error === -2
              ? "Popraw błędy w formularzu"
              : "Wystąpił nieznany błąd, spróbuj ponownie"}
          </Alert>
        </Collapse>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          disabled={isDisabled(values)}
        >
          Stwórz konto
        </Button>
      </form>
    </Card>
  );
};

export default PaddedSite(Register);
