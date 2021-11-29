import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import MuiToolbar from "@material-ui/core/Toolbar";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";
import LightThemeIcon from "@material-ui/icons/WbSunnyOutlined";
import DarkThemeIcon from "@material-ui/icons/Brightness2Outlined";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ThemeContext } from "../../context/Theme/ThemeState";
import UserContext from "../../context/User/UserContext";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backdropFilter: "blur(20px)",
    backgroundColor: theme.palette.background.paper + "B7",
    padding: "0px 30px",
  },
  toolbar: {
    padding: "0px",
    maxWidth: "1280px",
    width: "100%",
    margin: "auto",
  },
  name: {
    fontWeight: "bold",
    fontSize: "18px",
    color: theme.palette.text.primary,
    marginRight: "20px",
    textDecoration: "none",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  link: {
    fontWeight: "normal",
    fontSize: "16px",
    color: theme.palette.text.primary,
    marginRight: "20px",
    textDecoration: "none",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  spacer: {
    flexGrow: "1",
  },
  button: {
    marginRight: "10px",
  },
  iconSpacer: {
    width: "24px",
    height: "24px",
  },
  icon: {
    position: "absolute",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { theme, setTheme } = useContext(ThemeContext);
  const { isLoggedIn, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("isLoggedIn :>> ", isLoggedIn);

  const handleLoginButtonClick = () => {
    if (isLoggedIn) {
      handleLogout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <AppBar elevation={3} className={classes.appbar} color="transparent">
      <MuiToolbar className={classes.toolbar}>
        <MuiLink underline="none" to="/" component={Link}>
          <Typography className={classes.name}>Serwis samochodowy</Typography>
        </MuiLink>
        <MuiLink underline="none" to="/blog" component={Link}>
          <Typography className={classes.link}>Blog</Typography>
        </MuiLink>
        <MuiLink underline="none" to="/specialists" component={Link}>
          <Typography className={classes.link}>Specialists</Typography>
        </MuiLink>
        <div className={classes.spacer} />
        <Button
          size="small"
          variant="outlined"
          className={classes.button}
          onClick={() => setTheme(theme === "light" ? "dark" : "light", true)}
        >
          <div className={classes.iconSpacer} />
          <Zoom in={theme === "light"}>
            <LightThemeIcon className={classes.icon} />
          </Zoom>
          <Zoom in={theme === "dark"}>
            <DarkThemeIcon className={classes.icon} />
          </Zoom>
        </Button>
        <Button variant="outlined" onClick={() => handleLoginButtonClick()}>
          {isLoggedIn ? "Wyloguj się" : "Zaloguj się"}
        </Button>
      </MuiToolbar>
    </AppBar>
  );
};

export default Navbar;
