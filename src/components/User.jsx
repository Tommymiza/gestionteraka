import React from "react";
import Chargement from "./Chargement";
import {
  AccountCircleRounded,
  CalendarMonthRounded,
  CheckBoxRounded,
  DeleteRounded,
  EditRounded,
  FemaleRounded,
  MaleRounded,
  PhoneIphoneRounded,
  TransgenderRounded,
  TuneRounded,
  VisibilityRounded,
  WorkRounded,
} from "@mui/icons-material";
import { Chip, IconButton, Tooltip } from "@mui/material";

export default function User({ data, wait, server }) {
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
                <CalendarMonthRounded sx={{ fontSize: "30px" }} /> Naissance
              </div>
            </th>
            <th style={{ maxWidth: "20px" }}>
              <div className="row-div">
                <TransgenderRounded sx={{ fontSize: "30px" }} /> Genre
              </div>
            </th>
            <th>
              <div className="row-div">
                <WorkRounded sx={{ fontSize: "30px" }} /> Occupation
              </div>
            </th>
            <th style={{ maxWidth: "20px" }}>
              <div className="row-div">
                <PhoneIphoneRounded sx={{ fontSize: "30px" }} /> Tel
              </div>
            </th>
            <th>
              <div className="row-div">
                <CheckBoxRounded sx={{ fontSize: "30px" }} /> Formation
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
                  <p style={{ fontWeight: "bold" }}>{item.date_naissance}</p>
                </div>
              </td>
              <td style={{ maxWidth: "20px" }}>
                <div className="row-div" style={{ justifyContent: "center" }}>
                  {item.genre === "M" ? <MaleRounded /> : <FemaleRounded />}
                </div>
              </td>
              <td>
                <div className="row-div" style={{ justifyContent: "center" }}>
                  <p>{item.metier}</p>
                </div>
              </td>
              <td>
                <div className="row-div" style={{ justifyContent: "center" }}>
                  <p style={{ fontWeight: "bold" }}>{item.phone}</p>
                </div>
              </td>
              <td>
                <div className="row-div" style={{ justifyContent: "center" }}>
                  <Chip
                    label={item.is_verified ? "Oui" : "Non"}
                    color={item.is_verified ? "success" : "error"}
                  />
                </div>
              </td>
              <td>
                <div className="row-div" style={{ justifyContent: "center" }}>
                  <Tooltip title="Voir">
                    <IconButton color="warning">
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
    </div>
  );
}
