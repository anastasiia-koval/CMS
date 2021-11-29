import React, { useEffect, useContext, useMemo } from "react";
import ReactDOM from "react-dom";
import App from "./screens/App";
import { createTheme, useTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ThemeState, { ThemeContext } from "./context/Theme/ThemeState";
import UserState from "./context/User/UserState";

const Wrapper = ({ children }) => {
  const { theme, hasChanged, setTheme } = useContext(ThemeContext);
  const defaultTheme = useTheme();
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
        <Wrapper>
          <App />
        </Wrapper>
      </UserState>
    </ThemeState>
  </React.StrictMode>,
  document.getElementById("root")
);
