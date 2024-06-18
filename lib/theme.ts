"use client";
import { createTheme } from "@mui/material";
import { type ConfirmOptions } from "material-ui-confirm";

export const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
  palette: {
    primary: {
      main: "#728b6b",
    },
    error: {
      main: "#fa3c55",
    },
    warning: {
      main: "#fac852",
    },
    info: {
      main: "#36c5f5",
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
      variants: [
        {
          props: { color: "primary", variant: "contained" },
          style: {
            boxShadow: "0 5px 10px 0 #728b6b50",
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "600",
          padding: "7px 15px",
          letterSpacing: 1,
        },
      },
    },
  },
});

export const confirmOptions: ConfirmOptions = {
  title: "Êtes-vous sûr ?",
  titleProps: {
    variant: "h6",
    fontWeight: "bold",
  },
  description: "Cette action est irréversible.",
  confirmationText: "Oui",
  cancellationText: "Annuler",
  confirmationButtonProps: {
    color: "warning",
  },
  cancellationButtonProps: {
    color: "error",
  },
};
