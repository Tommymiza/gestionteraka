import React, { useState, useEffect, createContext } from "react";
import Inscription from "./components/Inscription";
import { Alert, ThemeProvider } from "@mui/material";
import Accueil from "./components/Accueil";
import LottieLoading from "./components/Outils/LottieLoading";
import { CheckRounded, ErrorRounded } from "@mui/icons-material";
import { theme } from "./theme";
import { routes } from "./api/Route";
import { GET } from "./api/Request";

export const ActContext = createContext();
function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState();
  useEffect(() => {
    let t = null;
    if (alert) {
      t = setTimeout(() => {
        setAlert();
      }, 3000);
    }
    return () => {
      if (t) {
        clearTimeout(t);
      }
    };
  }, [alert]);
  const getSession = async () => {
    try {
      const response = await GET(routes.CHECK);
      setUser(response.data.user);
      setAlert({ type: "success", message: response.message });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response.data.message ?? "Erreur de connexion !",
      });
      localStorage.removeItem('token');
    }
    setLoading(false);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getSession();
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
              zIndex: 150000,
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
