import React, { useEffect, useContext, useMemo } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Footer from "./components/Footer/Footer"
import { CssBaseline } from "@material-ui/core";
import { createTheme, useTheme, ThemeProvider } from "@material-ui/core/styles";
import ThemeState, { ThemeContext } from "./context/Theme/ThemeState";
import UserState from "./context/User/UserState";
import interceptor from "./util/interceptor";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Snackbar from "./components/Snackbar/Snackbar";

const Wrapper = ({ children }) => {
  const { theme, openSnackbar } = useContext(ThemeContext);
  const defaultTheme = useTheme();
  interceptor(useNavigate(), openSnackbar);
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // useEffect(() => {
  //   if (!hasChanged) {
  //     setTheme(prefersDarkMode ? "dark" : "light", false);
  //   }
  // }, [prefersDarkMode]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          type: theme,
          background: {
            paper: theme === "light" ? "#FFFFFF" : "#0A1929",
            default: theme === "light" ? "#F3F6F9" : "#001E3C",
          },
          primary: {
            main: theme === "light" ? "#007FFF" : "#3399FF",
          },
          text: {
            main: theme === "light" ? "#0A1929" : "#FFFFFF",
            secondary: theme === "light" ? "#46505A" : "#AAB4BE",
          },
          button: {
            main: theme === "light" ? "#007FFF" : "#FFFFFF",
            hover: theme === "light" ? "#0372E2" : "#D8D6D6",
          },
        },
        typography: {
          fontFamily: ['"IBM Plex Sans"', "Roboto", "sans-serif"].join(", "),
        },
        shape: {
          borderRadius: "10px",
        },
        overrides: {
          MuiTypography: {
            root: {
              transition: defaultTheme.transitions.create("color", {
                duration: defaultTheme.transitions.duration.standard,
              }),
            },
            h1: {
              fontSize: "30px",
              fontWeight: "bold",
            },
            h2: {
              fontSize: "25px",
              fontWeight: "bold",
            },
            h3: {
              fontSize: "25px",
              fontWeight: "400",
            },
          },
          MuiLink: {
            root: {
              fontFamily: ['"IBM Plex Sans"', "Roboto", "sans-serif"].join(
                ", "
              ),
            },
          },
          MuiButton: {
            sizeSmall: {
              padding: "5px 10px",
              minWidth: "unset",
            },
          },
          MuiOutlinedInput: {
            root: {
              backgroundColor: theme === "light" ? "#FFFFFF" : "#0A1929",
            },
          },
          MuiListItem: {
            root: {
              paddingTop: "0px",
              paddingBottom: "0px",
            }
          }
        },
      }),
    [theme]
  );

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeState>
      <UserState>
        <Router>
          <Wrapper>
            <CssBaseline>
              <App />
              <Footer />
              <Snackbar />
            </CssBaseline>
          </Wrapper>
        </Router>
      </UserState>
    </ThemeState>
  </React.StrictMode>,
  document.getElementById("root")
);
