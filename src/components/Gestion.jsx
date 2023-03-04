import React, { useContext, useState } from "react";
import { ActContext } from "../App";
import {
  AdminPanelSettings,
  Groups2Rounded,
  HomeRounded,
  LogoutRounded,
  PersonRounded,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import axios from "axios";
import Home from "./Home";
import User from "./User";
import Staff from "./Staff";
import PetitG from "./PetitG";

export default function Gestion() {
  const { user, server, setAlert, setUser } = useContext(ActContext);
  const [tab, setTab] = useState([]);
  const [meta, setMeta] = useState([]);
  const [onglet, setOnglet] = useState("Home");
  const [loading, setLoading] = useState(false);
  function getall(url, label) {
    setLoading(true);
    setOnglet(label);
    if (user.fonction === "admin") {
      axios({
        url: server + url,
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          if (res.data.items.data.length !== 0) {
            setTab(res.data.items.data);
            console.log(res.data.items.meta);
            setMeta(res.data.items.meta);
          }
        })
        .catch((err) => {
          console.log(err);
          setAlert({ type: "error", message: "Erreur de connexion!" });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      if (url === "/membre/all") {
        axios({
          url: server + url,
          method: "get",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((res) => {
            if (res.data.items.data !== 0) {
              setTab(res.data.items.data);
              setMeta(res.data.items.meta)
            }
          })
          .catch((err) => {
            console.log(err);
            setAlert({ type: "error", message: "Erreur de connexion!" });
          })
          .finally(() => {
            setLoading(false);
          });
      }else{
        setAlert({type: "error", message: "Vous ne pouvez pas voir cette liste!"})
      }
    }
  }
  const menu = [
    {
      label: "Membre",
      link: "/membre/all",
      icon: <PersonRounded sx={{ fontSize: "50px" }} />,
    },
    {
      label: "Staff",
      link: "/staff/all",
      icon: <AdminPanelSettings sx={{ fontSize: "50px" }} />,
    },
    {
      label: "Petit Groupe",
      link: "/pg/all",
      icon: <Groups2Rounded sx={{ fontSize: "50px" }} />,
    },
  ];
  return (
    <div>
      <nav>
        <div id="logo">
          <img src="/images/logo.png" alt="Teraka logo" />
        </div>
        <ul>
          <li onClick={()=>setOnglet()}><Tooltip title={"Accueil"}><HomeRounded sx={{ fontSize: "50px" }} /></Tooltip></li>
          {menu.map((item) => (
            <li key={item.label} onClick={() => getall(item.link, item.label)}>
              <Tooltip title={item.label}>{item.icon}</Tooltip>
            </li>
          ))}
        </ul>
        <div>
          <Tooltip
            title={"Déconnexion"}
            onClick={() => {
              localStorage.clear();
              setUser();
            }}
          >
            <LogoutRounded sx={{ fontSize: "50px" }} />
          </Tooltip>
        </div>
      </nav>
      {onglet === "Home" && (
        <Home />
      )}
      {onglet === "Membre" && (
        <User data={tab} wait={loading} server={server} meta={meta} />
      )}
      {onglet === "Staff" && (
        <Staff data={tab} wait={loading} server={server} meta={meta} />
      )}
      {onglet === "Petit Groupe" && (
        <PetitG data={tab} wait={loading} server={server} meta={meta} />
      )}
    </div>
  );
}
