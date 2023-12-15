import { Close, PersonAddAlt1Rounded } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Tooltip,
  IconButton,
  DialogContent,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { iconButton, loadingBtn } from "../../../styled";
import { ActContext } from "../../../App";
import LottieLoading from "../../Outils/LottieLoading";
import { LoadingButton } from "@mui/lab";
import { POST } from "../../../api/Request";
import { routes } from "../../../api/Route";

export default function AjoutChampion({ close, refresh }) {
  const { setAlert } = useContext(ActContext);
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = new FormData(form.current);
    setLoading(true);
    try {
      const response = await POST(routes.ADDCHAMPION, data);
      console.log(response);
      setAlert({type: "success", message: response.message});
      close();
      refresh();
    } catch (error) {
      console.log(error);
      if(error.response.data.message.includes("1062")){
        setAlert({type: "error", message: "Email déjà utilisé"});
      }else{
        setAlert({type: "error", message: "L'email n'existe pas"});
      }
    }
    setLoading(false);
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
            Ajout d'un champion:
          </h3>
          <Tooltip arrow title={"Fermer"}>
            <IconButton onClick={() => close()} sx={{ ...iconButton }}>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} ref={form}>
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
              name="phone"
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
              type="text"
              name="lieu"
              className="custom"
              required
              style={{ width: "100%" }}
              placeholder="Lieu de travail :"
            />
            <div style={{ alignSelf: "center" }}>
              <LoadingButton
                startIcon={<PersonAddAlt1Rounded />}
                sx={loadingBtn}
                type="submit"
                loading={loading}
                loadingIndicator={<LottieLoading size={50} speed={1} />}
              >
                Ajout
              </LoadingButton>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
