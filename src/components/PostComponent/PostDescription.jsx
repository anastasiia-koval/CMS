import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { makeStyles } from "@material-ui/core/styles";
import TodayIcon from "@material-ui/icons/Today";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";

const PostDescription = () => {
  const { id } = useParams();
  console.log("id :>> ", id);
  const [post, setPost] = useState();
  const navigate = useNavigate();

  const convertData = (date) => {
    const data = new Date(date);
    return (
      data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate()
    );
  };
  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        console.log("resData :>> ", res.data);
        setPost(res.data);
      })
      .catch((err) => console.log("err :>> ", err));
  }, []);

  const useStyles = makeStyles({
    date: {
      fontSize: "14px",
      margin: "0",
      marginLeft: "6px",
      color: "#555555",
    },
    userName: {
      fontSize: "14px",
      marginBottom: "0",
      marginLeft: "6px",
      color: "#555555",
    },
    button: {
      border: "1px solid rgba(0, 0, 0, 0.23)",
      backgroundColor: "#FFFFFFB7",
    },
  });
  const classes = useStyles();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "20px" }}>
        <Button
          className={classes.button}
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "20px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TodayIcon />
            <Typography gutterBottom className={classes.date}>
              {post && convertData(post.published_at)}
            </Typography>
          </div>

          <Typography gutterBottom className={classes.userName}>
            Created by {post && post.userID.username}
          </Typography>
        </div>
        <div style={{ width: "100%", height: "300px", marginBottom: "10px" }}>
          <img
            src={post && post.picture.url}
            alt=""
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>

        <Typography gutterBottom variant="h5" component="h2">
          {post && post.title}
        </Typography>
      </div>

      <div>
        <Typography gutterBottom variant="body1">
          {post && post.description}
        </Typography>
      </div>
    </div>
  );
};

export default PostDescription;
