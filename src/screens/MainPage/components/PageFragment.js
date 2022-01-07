import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import Markdown from "react-markdown";
const { REACT_APP_MY_ENV } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: (props) => (props.alignRight ? "row" : "row-reverse"),
    width: "100%",
    marginBottom: "20px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column !important",
    },
  },
  image: {
    flexGrow: "1",
    flexBasis: "40%",
    marginRight: "20px",
    maxWidth: "400px",
    minHeight: "300px",
    maxHeight: "300px",
    objectFit: "cover",
    objectPosition: "center",
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      maxWidth: "unset",
      marginRight: "0px",
      marginBottom: "20px",
    },
  },
  textRoot: {
    flexGrow: "1",
  },
}));

const getImageUrl = (image) => {
  if (image.formats?.medium) {
    return image.formats.medium.url;
  }
  return image.url;
};

const PageFragment = ({ article }) => {
  const classes = useStyles({ alignRight: article.alignToRight });
  return (
    <Box className={classes.root}>
      <img
        src={`${REACT_APP_MY_ENV}${getImageUrl(article.articlePhoto)}`}
        className={classes.image}
      />
      <Box className={classes.textRoot}>
        <Typography component="h2" variant="h2">
          {article.header}
        </Typography>
        <Markdown>{article.articleContent}</Markdown>
      </Box>
    </Box>
  );
};

export default PageFragment;
