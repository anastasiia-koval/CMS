import axiosInstance from "../../util/axiosInstance";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { makeStyles } from "@material-ui/core/styles";
import TodayIcon from "@material-ui/icons/Today";
import { Button, Typography } from "@material-ui/core";
import UserContext from "../../context/User/UserContext";
import Markdown from "react-markdown";
import Loading from "../Loading/Loading";
import Comments from "./Comments";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles({
  userDate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20px",
    justifyContent: "space-between",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  subText: {
    fontSize: "14px",
    margin: "0",
    marginLeft: "6px",
    color: "#555555",
  },
  button: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    backgroundColor: "#FFFFFFB7",
  },
  content: {
    textAlign: "justify",
  },
  postInfo: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  imageContainer: {
    width: "100%",
    height: "300px",
    marginBottom: "10px",
    "& img": {
      objectFit: "cover",
      width: "100%",
      height: "100%",
    },
  },
});

const PostDescription = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { userId } = useContext(UserContext);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

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
      .get(`${REACT_APP_MY_ENV}/posts/${id}`)
      .then((res) => {
        console.log("resData :>> ", res.data);
        setPost(res.data);
        setComments(res.data.commentsIDs);
      })
      .catch((err) => console.log("err :>> ", err));
  }, []);

  if (post.length === 0) {
    return <Loading />;
  }
  console.log("LALALA :>> ");
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "20px" }}>
        <Button
          className={classes.button}
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate(-1)}
        >
          Wróć
        </Button>
      </div>

      <div className={classes.postInfo}>
        <div className={classes.userDate}>
          <div className={classes.dateContainer}>
            <TodayIcon />
            <Typography gutterBottom className={classes.subText}>
              {post && convertData(post.published_at)}
            </Typography>
          </div>
          {post && post.userID.username && (
            <Typography gutterBottom className={classes.subText}>
              Dodano przez {post.userID.username}
            </Typography>
          )}
        </div>
        <div className={classes.imageContainer}>
          <img src={post && `${REACT_APP_MY_ENV}${post.picture.url}`} alt="" />
        </div>
        <Typography
          className={classes.content}
          gutterBottom
          variant="h1"
          component="h1"
        >
          {post && post.title}
        </Typography>
      </div>
      <div>
        <Typography className={classes.content} gutterBottom variant="body1">
          {post && <Markdown children={post.description} />}
        </Typography>
      </div>
      <Comments
        postId={id}
        userId={userId}
        post={post}
        setComments={setComments}
        comments={comments}
      />
    </div>
  );
};

export default PostDescription;
