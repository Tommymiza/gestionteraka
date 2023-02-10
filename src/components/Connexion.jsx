import React, { useRef, useState, useContext } from "react";
import { LoadingButton } from "@mui/lab";
import { LoginRounded, PersonAddRounded } from "@mui/icons-material";
import { ActContext } from "../App";
import axios from "axios";

export default function Connexion() {
  const [load, setLoad] = useState(false);
  const [register, setRegister] = useState(false);
  const { setUser, server, setAlert } = useContext(ActContext);
  const loginF = useRef();
  const loginR = useRef();
  const signup = (e) => {
    e.preventDefault();
    setLoad(true);
    const form = loginR.current;
    axios({
      url: server + "/ajoutstaff",
      method: "post",
      data: {
        email_staff: form.username.value,
        password_staff: form.password.value,
        fonction: form.fonction.value,
      },
    })
      .then((res) => {
        console.log(res);
        setAlert({type: "success", message: res.data.message})
        form.reset();
      })
      .catch((err) => {
        console.log(err)
        setAlert({ type: "error", message: "Erreur de connexion!" });
      })
      .finally(() => {
        setLoad(false);
      });
  };
  const connexion = (e) => {
    e.preventDefault();
    setLoad(true);
    const form = loginF.current;
    axios({
      url: server + "/loginstaff",
      method: "post",
      data: {
        username: form.username.value,
        password: form.password.value,
      },
    })
      .then((res) => {
        if (res.data.error) {
          setAlert({ type: "error", message: res.data.error });
        } else {
          setUser(res.data.user);
          setAlert({ type: "success", message: res.data.message });
          localStorage.setItem("session", res.data.token)
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ type: "error", message: "Erreur de connexion!" });
      })
      .finally(() => {
        setLoad(false);
      });
  };
  return register ? (
    <form onSubmit={signup} ref={loginR}>
      <div className="input-div">
        <label htmlFor="username">Identifiant:</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div className="input-div">
        <label htmlFor="password">Mot de passe:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div className="input-div">
        <h3>Fonction:</h3>
        <div className="row-div">
          <label htmlFor="admin">Admin:</label>
          <input
            type="radio"
            id="admin"
            name="fonction"
            value={"admin"}
            required
          />
          <label htmlFor="staff">Staff:</label>
          <input
            type="radio"
            id="staff"
            name="fonction"
            value={"staff"}
            required
            defaultChecked
          />
        </div>
      </div>
      <p
        onClick={() => {
          setRegister(false);
        }}
      >
        Se connecter?
      </p>
      <LoadingButton
        type="submit"
        startIcon={<PersonAddRounded />}
        loading={load}
        sx={{
          textTransform: "none",
          fontFamily: "var(--fontText)",
          fontWeight: "bolder",
        }}
        variant="contained"
      >
        S'enregistrer
      </LoadingButton>
    </form>
  ) : (
    <form onSubmit={connexion} ref={loginF}>
      <div className="input-div">
        <label htmlFor="username">Identifiant:</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div className="input-div">
        <label htmlFor="password">Mot de passe:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <p
        onClick={() => {
          setRegister(true);
        }}
      >
        S'enregistrer?
      </p>
      <LoadingButton
        type="submit"
        startIcon={<LoginRounded />}
        loading={load}
        sx={{
          textTransform: "none",
          fontFamily: "var(--fontText)",
          fontWeight: "bolder",
        }}
        variant="contained"
      >
        Connexion
      </LoadingButton>
    </form>
  );
}
