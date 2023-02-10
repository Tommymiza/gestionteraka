import React, { useContext, useState } from "react";
import { ActContext } from "../App";
import {
  AdminPanelSettings,
  Groups2Rounded,
  LogoutRounded,
  PersonRounded,
} from "@mui/icons-material";
import { CircularProgress, Tooltip } from "@mui/material";
import axios from "axios";

export default function Gestion() {
  const { user, server, setAlert, setUser } = useContext(ActContext);
  const [tab, setTab] = useState([]);
  const [column, setColumn] = useState([]);
  const [loading, setLoading] = useState(false);
  function getall(url) {
    setLoading(true);
    if (user.fonction === "admin") {
      axios({
        url: server + url,
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("session"),
        },
      })
        .then((res) => {
          if (res.data.items.length !== 0) {
            const columnName = Object.keys(res.data.items[0]).filter(
              (item) =>
                typeof res.data.items[0][item] !== "object" &&
                typeof res.data.items[0][item] !== "number" &&
                item !== "created_at" &&
                item !== "updated_at"
            );
            setColumn(columnName);
            setTab(res.data.items);
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
            Authorization: "Bearer " + localStorage.getItem("session"),
          },
        })
          .then((res) => {
            if (res.data.items.length !== 0) {
              const columnName = Object.keys(res.data.items[0]).filter(
                (item) =>
                  typeof res.data.items[0][item] !== "object" &&
                  typeof res.data.items[0][item] !== "number" &&
                  item !== "created_at" &&
                  item !== "updated_at"
              );
              setColumn(columnName);
              setTab(res.data.items);
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
          {menu.map((item) => (
            <li key={item.label} onClick={() => getall(item.link)}>
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
      {loading ? (
        <div className="loading">
          <CircularProgress size={50} />
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                {column.length !== 0 &&
                  column.map((item) => <th key={item}>{item}</th>)}
              </tr>
            </thead>
            <tbody>
              {tab.map((item, index) => (
                <tr key={index}>
                  {column.length !== 0 &&
                    column.map((i, index) => <td key={index}>{item[i]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
