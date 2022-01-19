import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, TextField, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axiosInstance from "../../util/axiosInstance";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    margin: "20px 10px 20px 0px",
  },
  button: {
    width: "10%",
    padding: "15px 0",
    backgroundColor: theme.palette.button.main,
    color: theme.palette.background.default,
    "&:hover": {
      backgroundColor: theme.palette.button.hover,
    },
  },
}));
const Search = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleClick = (data, searchValue) => {
    let filtered = [];

    axiosInstance
      .get(`${REACT_APP_MY_ENV}/posts`, { params: { title: searchValue } })
      .then((res) => {
        console.log("res :>> ", res);
        res.data.map((post) => {
          filtered.push(post);
        });
        props.setPosts(filtered);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
    console.log("filtered :>> ", filtered);
    return filtered;
  };

  const getPostsTitle = (posts) => {
    const postsTitle = [];
    posts.map((post) => {
      postsTitle.push(post.title);
    });
    return postsTitle;
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={getPostsTitle(props.postsCopy)}
        className={classes.input}
        renderInput={(params) => (
          <TextField {...params} label="Szukaj..." variant="outlined" />
        )}
      />
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => handleClick(props.postsCopy, value)}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
