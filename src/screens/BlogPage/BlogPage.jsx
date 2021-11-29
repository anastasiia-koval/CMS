import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostComponent from "../../components/PostComponent/PostComponent";
import Typography from "@material-ui/core/Typography";

const BlogPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState();
  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        setPosts(res.data);
        console.log("res :>> ", res);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography gutterBottom variant="h5" component="h2">
        Blog Serwisowy
      </Typography>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {posts &&
          posts.map((post) => {
            return (
              <PostComponent
                key={post.id}
                picture={post.picture.url}
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
