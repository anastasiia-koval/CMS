import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core";
import axiosInstance from "../../util/axiosInstance";
import Avatar from "@material-ui/core/Avatar";
import { ThemeContext } from "../../context/Theme/ThemeState";
import axios from "axios";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles((theme) => ({
  commentInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  comment: {
    marginBottom: "15px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    gap: "20px",
  },
  commentDetail: {
    marginBottom: "15px",
    textAlign: "justify",
  },
  button: {
    marginTop: "10px",
    width: "150px",
    backgroundColor: theme.palette.button.main,
    color: theme.palette.background.default,
    "&:hover": {
      backgroundColor: theme.palette.button.hover,
    },
  },
  addComment: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "20px",
  },
}));
const Comments = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [users, setUsers] = useState();
  const MAXLENGTH = 100;
  const { openSnackbar } = useContext(ThemeContext);

  const convertData = (date) => {
    const fullDate = new Date(date);
    const month = `${
      fullDate.getMonth() + 1 < 10
        ? `0${fullDate.getMonth() + 1}`
        : fullDate.getMonth()
    }`;
    const data = `${
      fullDate.getDate() < 10 ? `0${fullDate.getDate()}` : fullDate.getDate()
    }`;
    return fullDate.getFullYear() + "-" + month + "-" + data;
  };

  useEffect(() => {
    axios
      .get(`${REACT_APP_MY_ENV}/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log("err :>> ", err));
  }, []);

  const addComment = (postId, userId, comment) => {
    const data = { postID: postId, userID: userId, comment: comment };
    console.log("data :>> ", data);
    axiosInstance
      .post(`${REACT_APP_MY_ENV}/comments`, data)
      .then((res) => {
        console.log("res :>> ", res);
        setValue("");
        console.log("comments :>> ", props.comments);
        props.setComments([
          ...props.comments,
          {
            comment: res.data.comment,
            created_at: res.data.created_at,
            id: res.data.id,
            postId: res.data.postID.id,
            published_at: res.data.published_at,
            updated_at: res.data.updated_at,
            userID: res.data.userID.id,
          },
        ]);
      })
      .catch((err) => {
        openSnackbar(true, "Wystąpił błąd. Spróbuj odświeżyć stronę.");
      });
  };

  const getUserInfo = (userId) => {
    const found = users && users.find((user) => user.id === userId);
    return found.username;
  };

  return (
    <div>
      <Typography variant="h6">Comments</Typography>
      {users &&
        props.comments.map((comment) => {
          return (
            <div key={comment.id} className={classes.comment}>
              <Avatar className={classes.iconSpacer} />
              <div style={{ width: "100%" }}>
                <div className={classes.commentInfo}>
                  <Typography variant="subtitle1" style={{ fontWeight: "500" }}>
                    {getUserInfo(comment.userID)}
                  </Typography>
                  <Typography variant="body2">
                    {convertData(comment.published_at)}
                  </Typography>
                </div>
                <Typography variant="body2" className={classes.commentDetail}>
                  {comment.comment}
                </Typography>
              </div>

              <Divider />
            </div>
          );
        })}
      <div className={classes.addComment}>
        <TextField
          id="outlined-name"
          label="Name"
          value={value}
          multiline
          rows={4}
          fullWidth
          inputProps={{ maxLength: MAXLENGTH }}
          helperText={`${value.length}/${MAXLENGTH}`}
          onChange={(event) => setValue(event.target.value)}
          variant="outlined"
        />
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => addComment(props.postId, props.userId, value)}
          // disabled
        >
          Add comment
        </Button>
      </div>
    </div>
  );
};

export default Comments;
