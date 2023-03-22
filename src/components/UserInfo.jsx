import { CloseRounded } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import React from "react";

export default function UserInfo({ user, close }) {
  return (
    <Dialog
      open={true}
      onClose={close}
      PaperProps={{ style: { width: 500, padding: "20px" } }}
      sx={{backgroundColor: "rgba(255,255,255,0.5)"}}
    >
      <div
        className="row-div dialog-title"
        style={{ justifyContent: "space-between", marginBottom: "20px" }}
      >
        <h1>Information</h1>
        <IconButton onClick={close}>
          <CloseRounded />
        </IconButton>
      </div>
      <div>
        <div className="attribut">
          <h3>Nom:</h3>
          <p>{user.nom}</p>
        </div>
        <div className="attribut">
          <h3>Prénom:</h3>
          <p>{user.prenom}</p>
        </div>
        <div className="attribut">
          <h3>Email:</h3>
          <p>{user.email ? user.email : "###"}</p>
        </div>
        <div className="attribut">
          <h3>Phone:</h3>
          <p>{user.phone ? user.phone : "###"}</p>
        </div>
        <div className="attribut">
          <h3>Langage:</h3>
          <p>{user.ln}</p>
        </div>
        <div className="attribut">
          <h3>Adresse:</h3>
          <p>
            <strong>Pays:</strong> {user.adresse.pays}
          </p>
          <p>
            <strong>Région:</strong> {user.adresse.region}
          </p>
          <p>
            <strong>Commune:</strong> {user.adresse.commune}
          </p>
        </div>
        <div className="attribut">
          <h3>Rôle:</h3>
          <p>{user.role}</p>
        </div>
      </div>
    </Dialog>
  );
}
