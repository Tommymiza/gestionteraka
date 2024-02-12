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

export default function MembreDialog({ close, user }) {
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
            <h3>Genre :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.genre === "M" ? "Homme" : "Femme"}
            </p>
          </div>
          <div>
            <h3>Région :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.region}
            </p>
          </div>
          <div>
            <h3>District :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.district}
            </p>
          </div>
          <div>
            <h3>Commune :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.commune}
            </p>
          </div>
          <div>
            <h3>Fokontany :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.fokontany}
            </p>
          </div>
          <div>
            <h3>Village :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.village}
            </p>
          </div>
          <div>
            <h3>Niveau d'étude :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.niveau_etude}
            </p>
          </div>
          <div>
            <h3>Occupation :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
              }}
            >
              {user.occupation}
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
              {user.phone ?? "-"}
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
              {user.email ?? "-"}
            </p>
          </div>
          <div>
            <h3>Note :</h3>
            <p
              style={{
                borderBottom: "solid 1px var(--shadow)",
                padding: "5px",
                color: "var(--error)",
                fontWeight: "bold",
              }}
            >
              {user.note ?? "-"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
