import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#ad42f5",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#8633bd",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#ffffff",
    },
  },
});
