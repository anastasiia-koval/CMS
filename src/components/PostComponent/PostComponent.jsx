import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Collapsible from "react-collapsible-paragraph";

const PostComponent = (props) => {
  const useStyles = makeStyles({
    root: {
      minWidth: "350px",
      maxWidth: "450px",
      flex: "1",
    },
    media: {
      height: 300,
      objectFit: "cover",
      position: "center",
    },
  });

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={props.picture} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <Collapsible lines={2} locales={"none"}>
            {props.title}
          </Collapsible>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={props.onClick}>
          Zobacz więcej
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostComponent;
