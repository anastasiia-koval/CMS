import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Select from "../../components/Select/Select";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import UserContext from "../../context/User/UserContext";
import axios from "axios";
import Hour from "./Hour";
const { REACT_APP_MY_ENV } = process.env;

const fields = [
  {
    label: "Usługa",
    id: "service",
    url: "/services",
    optionMapper: (option) => option.title,
  },
  {
    label: "Mechanik",
    id: "specialist",
    url: "/specialists",
    optionMapper: (option) => `${option.name} ${option.surname}`,
    getParams: (values) => ({ "services.id": values.service }),
  },
  {
    label: "Data",
    id: "date",
    defaultOptions: Array(10)
      .fill(0)
      .map((_, i) => ({
        id: moment()
          .add(i + 1, "day")
          .format("YYYY-MM-DD"),
      })),
    optionMapper: (option) => moment(option.id).format("DD.MM.YYYY"),
  },
];

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: "20px",
  },
  root: {
    maxWidth: "600px",
    margin: "auto",
  },
  card: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    "&:not(last-child)": {
      marginBottom: "20px",
    },
  },
  loaderRoot: {
    display: "flex",
    justifyContent: "center",
  },
}));

const showButton = (values) => {
  let showButton = true;
  fields.forEach((field) => {
    if (showButton) {
      showButton = !!values[field.id];
    }
  });

  return showButton;
};

const Reservation = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const { isLoggedIn } = useContext(UserContext);
  const [values, setValues] = useState({ service: state?.service });
  const [isLoadingHours, setIsLoadingHous] = useState(false);
  const [hours, setHours] = useState([]);
  const [collapseOpen, setCollapseOpen] = useState(false);

  const handleChange = (key, value, index) => {
    const tmpValues = { ...values };
    const laterFields = fields.slice(index + 1);
    laterFields.forEach((field) => {
      delete tmpValues[field.id];
    });
    tmpValues[key] = value;
    setHours([]);
    setValues(tmpValues);
  };

  const donwloadHours = () => {
    setIsLoadingHous(true);
    axios
      .get(`${REACT_APP_MY_ENV}/freehours`, {
        params: { date: values.date, specialist: values.specialist },
      })
      .then((response) => {
        setHours(response.data);
        setIsLoadingHous(false);
        setCollapseOpen(true);
      })
      .catch(() => {
        setIsLoadingHous(false);
        setCollapseOpen(false);
      });
  };

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h1" className={classes.header}>
        Rezerwuj wizytę
      </Typography>
      <Card className={classes.card}>
        {fields.map(
          (field, index) =>
            (index === 0 || !!values[fields[index - 1].id]) && (
              <Select
                key={field.id}
                label={field.label}
                optionMapper={field.optionMapper}
                url={field.url}
                params={field.getParams ? field.getParams(values) : {}}
                handleChange={(v) => handleChange(field.id, v, index)}
                value={values[field.id]}
                defaultOptions={field.defaultOptions}
              />
            )
        )}
        {showButton(values) && (
          <Button variant="outlined" color="primary" onClick={donwloadHours}>
            Wyszukaj terminy
          </Button>
        )}
      </Card>
      {isLoadingHours && (
        <Box className={classes.loaderRoot}>
          <CircularProgress size={48} />
        </Box>
      )}
      <Collapse in={collapseOpen}>
        <Typography component="h2" variant="h2" className={classes.header}>
          Wybierz godzinę
        </Typography>
        <Grid container spacing={1}>
          {hours.map((hour) => (
            <Hour
              key={hour}
              hour={hour}
              date={values.date}
              specialist={values.specialist}
            />
          ))}
        </Grid>
      </Collapse>
    </Box>
  );
};

export default Reservation;
