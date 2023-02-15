import React, { useState, useEffect, createContext } from "react";
import Connexion from "./components/Connexion";
import { ThemeProvider, Alert, CircularProgress } from "@mui/material";
import { theme } from "./theme";
import axios from "axios";
import { CheckRounded, ErrorRounded } from "@mui/icons-material";
import Gestion from "./components/Gestion";

export const ActContext = createContext();
function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState();
  const server = "http://127.0.0.1:4422";
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert();
      }, 3000);
    }
  }, [alert]);
  useEffect(() => {
    if (localStorage.getItem("session")) {
      axios({
        url: server + "/getstaff",
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("session"),
        },
      })
        .then((res) => {
          if (res.data.error) {
            setAlert({ type: "error", message: res.data.error });
          } else {
            setUser(res.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
          setAlert({ type: "error", message: err.response.data.error });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <ActContext.Provider value={{ user, setUser, server, setAlert }}>
      <ThemeProvider theme={theme}>
        {loading ? (
          <div className="loading">
            <CircularProgress size={150} />
          </div>
        ) : user ? (
          <Gestion />
        ) : (
          <Connexion />
        )}
      </ThemeProvider>
      {alert && (
        <Alert
          color={alert.type}
          variant="filled"
          sx={{
            position: "absolute",
            top: 50,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          icon={alert.type === "error" ? <ErrorRounded /> : <CheckRounded />}
        >
          {alert.message}
        </Alert>
      )}
    </ActContext.Provider>
  );
}

export default App;
