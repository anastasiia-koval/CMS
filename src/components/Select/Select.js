import React, { useEffect, useState } from "react";
import MuiSelect from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
    maxWidth: "300px",
    "&:not(:last-child)": {
      marginBottom: "10px",
    },
  },
}));

const Select = ({
  url,
  params,
  label,
  value,
  handleChange,
  optionMapper,
  defaultOptions,
}) => {
  const classes = useStyles();
  const [options, setOptions] = useState(defaultOptions || []);

  useEffect(() => {
    if (defaultOptions) {
      return;
    }

    axios.get(REACT_APP_MY_ENV + url, { params }).then((response) => {
      setOptions(response.data);
    });
  }, [params]);

  return (
    <MuiSelect
      select
      variant="outlined"
      color="primary"
      label={label}
      onChange={(e) => handleChange(e.target.value)}
      value={value || ""}
      className={classes.input}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {optionMapper(option)}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};

export default Select;
