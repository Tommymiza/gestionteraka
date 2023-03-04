import React, {useState} from "react";
import Chargement from "./Chargement";
import {
  AccountCircleRounded,
  CheckBoxRounded,
  DeleteRounded,
  EditRounded,
  LanguageRounded,
  TuneRounded,
  VisibilityRounded,
  WorkRounded,
} from "@mui/icons-material";
import { Chip, IconButton, Tooltip } from "@mui/material";
import UserInfo from "./UserInfo";

export default function User({ data, wait, server }) {
  const [dialog, setDialog] = useState(null);
  const close = ()=>{
    setDialog(null);
  }
  return wait ? (
    <Chargement />
  ) : (
    <div className="data-content">
      <table>
        <thead>
          <tr>
            <th style={{ maxWidth: "100px" }}>
              <div className="row-div">
                <AccountCircleRounded sx={{ fontSize: "30px" }} /> Profil
              </div>
            </th>
            <th>
              <div className="row-div">
                <LanguageRounded sx={{ fontSize: "30px" }} /> Langue
              </div>
            </th>
            <th>
              <div className="row-div">
                <WorkRounded sx={{ fontSize: "30px" }} /> Occupation
              </div>
            </th>
            <th>
              <div className="row-div">
                <CheckBoxRounded sx={{ fontSize: "30px" }} /> Email
              </div>
            </th>
            <th>
              <div className="row-div">
                <TuneRounded sx={{ fontSize: "30px" }} /> Action
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="data">
              <td style={{ maxWidth: "150px" }}>
                <div
                  className="row-div"
                  style={{ justifyContent: "flex-start" }}
                >
                  <img
                    src={
                      item.photo === null
                        ? "images/avatar.png"
                        : server + "/images/pdp/" + item.photo
                    }
                    alt=""
                  />
                  <p>
                    {item.nom} {item.prenom}
                  </p>
                </div>
              </td>
              <td>
                <div className="row-div" style={{ justifyContent: "center" }}>
                  <p style={{fontWeight: "bolder"}}>{item.ln.toUpperCase()}</p>
                </div>
              </td>
              <td>
                <div className="row-div" style={{ justifyContent: "center" }}>
                  <p>{item.role}</p>
                </div>
              </td>
              <td>
                <div className="row-div" style={{ justifyContent: "center" }}>
                  <Chip
                    label={item.email !== "" ? "Oui" : "Non"}
                    color={item.email !== "" ? "success" : "error"}
                  />
                </div>
              </td>
              <td>
                <div className="row-div" style={{ justifyContent: "center" }}>
                  <Tooltip title="Voir">
                    <IconButton color="warning" onClick={()=>{
                      setDialog(<UserInfo user={item} close={close} />)
                    }}>
                      <VisibilityRounded />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Modifier">
                    <IconButton color="success">
                      <EditRounded />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Supprimer">
                    <IconButton color="error">
                      <DeleteRounded />
                    </IconButton>
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {dialog}
    </div>
  );
}
