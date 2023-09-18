import { Close, PersonAddAlt1Rounded } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Tooltip,
  IconButton,
  DialogContent,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { iconButton, loadingBtn } from "../../styled";
import { ActContext } from "../../App";
import LottieLoading from "./LottieLoading";
import { LoadingButton } from "@mui/lab";

export default function AjoutPersonnel({ close }) {
  const { user } = useContext(ActContext);
  const [loading, setLoading] = useState(false);
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
            Ajout de personnel:
          </h3>
          <Tooltip arrow title={"Fermer"}>
            <IconButton onClick={() => close()} sx={{ ...iconButton }}>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      </DialogTitle>
      <DialogContent>
        <form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: 20,
            }}
          >
            <input
              type="text"
              name="nom"
              required
              className="custom"
              style={{ width: "100%" }}
              placeholder="Nom et prénoms :"
            />
            <input
              type="email"
              name="email"
              required
              className="custom"
              style={{ width: "100%" }}
              placeholder="Email :"
            />
            <input
              type="text"
              name="tel"
              required
              className="custom"
              style={{ width: "100%" }}
              placeholder="Téléphone :"
            />
            <input
              type="text"
              name="adresse"
              required
              className="custom"
              style={{ width: "100%" }}
              placeholder="Adresse :"
            />
            <input
              type="number"
              name="cin"
              className="custom"
              style={{ width: "100%" }}
              placeholder="CIN : (Facultatif)"
            />
            <input
              type="text"
              name="lieu"
              className="custom"
              style={{ width: "100%" }}
              placeholder="Lieu de travail : (Facultatif)"
            />
            <div style={{width: "100%"}}>
              <h4>Rôle</h4>
              <Select
                variant="standard"
                sx={{width: "100%"}}
                defaultValue={"Champion"}
                inputProps={{
                  sx: {
                    outline: "none",
                    border: "none",
                    boxShadow: "0 0 10px 1px rgba(0,0,0,0.1)",
                    fontSize: "17px",
                    padding: "15px",
                    fontWeight: "bold",
                    borderRadius: "7px",
                    transition: ".4s",
                    fontFamily: "Averta",
                  },
                }}
              >
                {user.role === "Admin" && (
                  <MenuItem value={"Admin"}>Administrateur</MenuItem>
                )}
                {user.role === "Admin" && (
                  <MenuItem value={"Personnel"}>Employé TERAKA</MenuItem>
                )}
                <MenuItem value={"Agent"}>Agent de Cluster</MenuItem>
                <MenuItem value={"Champion"}>Champion</MenuItem>
              </Select>
            </div>
            <div style={{ alignSelf: "center" }}>
              <LoadingButton
                startIcon={<PersonAddAlt1Rounded />}
                sx={loadingBtn}
                type="submit"
                loading={loading}
                loadingIndicator={<LottieLoading size={50} speed={1} />}
              >
                Ajout d'un personnel
              </LoadingButton>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
