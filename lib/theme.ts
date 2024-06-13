"use client";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
  palette: {
    primary: {
      main: "#728b6b",
    },
    success: {
      main: "#728b6b",
    },
    secondary: {
      main: "#313d2f",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          font-family: "Nunito";
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
          padding: "7px 15px",
          letterSpacing: 0.7,
        },
      },
    },
  },
});
