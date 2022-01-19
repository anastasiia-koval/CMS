import axiosInstance from "../../util/axiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostComponent from "../../components/PostComponent/PostComponent";
import Loading from "../../components/Loading/Loading";
import { Typography, makeStyles } from "@material-ui/core";
import Search from "../../components/Search/Search";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  postContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));
const BlogPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [postsCopy, setPostsCopy] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${REACT_APP_MY_ENV}/posts`)
      .then((res) => {
        setPosts(res.data);
        setPostsCopy(res.data);
        console.log("res :>> ", res);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  if (posts.length === 0) {
    return <Loading />;
  }
  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h5" component="h2">
        Blog Serwisowy
      </Typography>
      <Search posts={posts} setPosts={setPosts} postsCopy={postsCopy} />
      <div className={classes.postContainer}>
        {posts &&
          posts.map((post) => {
            return (
              <PostComponent
                key={post.id}
                picture={`${REACT_APP_MY_ENV}${post.picture.url}`}
                title={post.title}
                onClick={() => {
                  navigate(`/blog/${post.id}`);
                }}
                published_at={post.published_at}
                userName={post.userID.username && post.userID.username}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BlogPage;
