import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import { iconButton } from "../../../styled";

export default function InfoPersonnel({ close, user }) {
  function getChipColor(str) {
    switch (str) {
      case "Admin":
        return "#ed7168";
      case "Personnel":
        return "#68e3a4";
      default:
        return "#e6ebe8";
    }
  }
  return (
    <Dialog
      open={true}
      onClose={() => close()}
      PaperProps={{
        sx: {
          width: "600px",
        },
      }}
    >
      <DialogTitle>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "var(--fontText)",
            textAlign: "center",
            position: "relative",
          }}
        >
          <h3
            style={{
              width: "100%",
              marginTop: "5px",
              textTransform: "uppercase",
            }}
          >
            Information:
          </h3>
          <Tooltip arrow title={"Fermer"}>
            <IconButton onClick={() => close()} sx={{ ...iconButton }}>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <h3>Nom et prénom :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.nom}
            </p>
          </div>
          <div>
            <h3>Email :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.email}
            </p>
          </div>
          <div>
            <h3>Téléphone :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.phone}
            </p>
          </div>
          <div>
            <h3>Adresse :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.adresse}
            </p>
          </div>
          <div>
            <h3>Rôle :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              <span className="chip" style={{background: getChipColor(user.role)}}>{user.role}</span>
            </p>
          </div>
          <div>
            <h3>Lieu de travail :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.lieu}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
