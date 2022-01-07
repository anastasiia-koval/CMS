import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import MuiToolbar from "@material-ui/core/Toolbar";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Zoom from "@material-ui/core/Zoom";
import LightThemeIcon from "@material-ui/icons/WbSunnyOutlined";
import DarkThemeIcon from "@material-ui/icons/Brightness2Outlined";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "../../context/Theme/ThemeState";
import UserContext from "../../context/User/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

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
  activeLink: {
    fontWeight: "bold",
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
  // const { userId } = useContext(UserContext);
  const classes = useStyles();
  const { theme, setTheme } = useContext(ThemeContext);
  const { username, isLoggedIn, handleLogout, userId } =
    useContext(UserContext);
  console.log("username :>> ", username);
  const context = useContext(UserContext);
  console.log("userId :>> ", context);

  const navigate = useNavigate();
  const location = useLocation();
  const links = [
    { name: "Blog", href: "/blog" },
    { name: "Pracownicy", href: "/specialists" },
    //TODO remove cars
    // { name: "Cars", href: "/cars" },
    { name: "Services", href: "/services" },
    { name: "Reservations", href: `/reservations/${userId}` },
  ];

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
          <Typography className={classes.name}>Car-Service</Typography>
        </MuiLink>
        {links.map((link) => (
          <MuiLink
            underline="none"
            component={Link}
            to={link.href}
            key={link.name}
          >
            <Typography
              className={clsx(classes.link, {
                [classes.activeLink]: location.pathname.includes(link.href),
              })}
            >
              {link.name}
            </Typography>
          </MuiLink>
        ))}
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
        {isLoggedIn && (
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<Avatar className={classes.iconSpacer} />}
            onClick={() => navigate("/userAccount")}
          >
            {username}
          </Button>
        )}
        <Button variant="outlined" onClick={() => handleLoginButtonClick()}>
          {isLoggedIn ? "Wyloguj się" : "Zaloguj się"}
        </Button>
      </MuiToolbar>
    </AppBar>
  );
};

export default Navbar;
