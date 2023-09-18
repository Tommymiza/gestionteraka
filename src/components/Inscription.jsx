import axios from "axios";
import React, { useState, useContext } from "react";
import { ActContext } from "../App";
import "../styles/login.scss";
import { LoadingButton } from "@mui/lab";
import { LoginOutlined } from "@mui/icons-material";
import LottieLoading from "./Outils/LottieLoading";
import { loadingBtn } from "../styled";

export default function Inscription() {
  const { setUser, setAlert } = useContext(ActContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validation = () => {
    if (form.email.length === 0 || form.password.length === 0) {
      setAlert({ type: "warning", message: "Les champs sont requis!" });
      return false;
    }
    if (!form.email.includes("@") || !form.email.includes(".")) {
      setAlert({ type: "warning", message: "Email invalide!" });
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation(form)) {
      return;
    }
    setLoading(true);
    axios({
      url: process.env.REACT_APP_API + "/loginadmin",
      method: "POST",
      data: form,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setUser(res.data.data.user);
        setAlert({ type: "success", message: "Bienvenue à bord!" });
      })
      .catch((err) => {
        console.log(err);
        setAlert({ type: "error", message: err.response.data.message });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div id="container-login" style={{ height: "100vh" }}>
      <div id="login">
        <lottie-player
          src="./images/Lotties/teraka_login.json"
          background="transparent"
          speed={1}
          loop
          autoplay
        ></lottie-player>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          {/* <input type="text" name="nom" id="nom" onChange={handleChange} />
      <input type="text" name="tel" id="tel" onChange={handleChange} />
      <input type="text" name="adresse" id="adresse" onChange={handleChange} /> */}
          <input
            className="custom"
            type="email"
            placeholder="email:"
            name="email"
            id="email"
            onChange={handleChange}
          />
          <input
            className="custom"
            type="password"
            placeholder="Mot de passe:"
            name="password"
            id="password"
            onChange={handleChange}
          />
          <LoadingButton
            startIcon={<LoginOutlined />}
            sx={loadingBtn}
            type="submit"
            loading={loading}
            loadingIndicator={<LottieLoading size={50} speed={1} />}
          >
            Login
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}
