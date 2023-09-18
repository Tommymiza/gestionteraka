import React, { useState, useEffect, createContext } from "react";
import Inscription from "./components/Inscription";
import { Alert, ThemeProvider } from "@mui/material";
import Accueil from "./components/Accueil";
import LottieLoading from "./components/Outils/LottieLoading";
import axios from "axios";
import { CheckRounded, ErrorRounded } from "@mui/icons-material";
import { theme } from "./theme";

export const ActContext = createContext();
function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState();
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert();
      }, 3000);
    }
  }, [alert]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios({
        url: process.env.REACT_APP_API + "/getuser",
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          setUser(res.data.data.user);
          setAlert({ type: "success", message: res.data.message });
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
          setAlert({ type: "error", message: err.response.data.message });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <ActContext.Provider value={{ user, setUser, setAlert }}>
        {loading ? (
          <div id="loading">
            <LottieLoading size={150} speed={1} />
          </div>
        ) : user ? (
          <Accueil />
        ) : (
          <Inscription />
        )}
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
    </ThemeProvider>
  );
}

export default App;
