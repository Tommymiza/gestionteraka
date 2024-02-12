import { Close, EditRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { ActContext } from "../../../App";
import { PUT } from "../../../api/Request";
import { routes } from "../../../api/Route";
import { iconButton, loadingBtn } from "../../../styled";
import LottieLoading from "../../Outils/LottieLoading";

export default function UpdateQuantif({ close, refresh, user }) {
  const { setAlert } = useContext(ActContext);
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    const obj = {};
    const keys = data.keys();
    for (let key of keys) {
      obj[key] = data.get(key);
    }
    setLoading(true);
    try {
      const response = await PUT(
        routes.UPDATEQUANTIF,
        user.id_quantificateur,
        obj
      );
      setAlert({ type: "success", message: response.message });
      close();
      refresh();
    } catch (error) {
      console.log(error);
      setAlert({ type: "error", message: error.response.data.message });
    }
    setLoading(false);
  };
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
            Modifier un quantificateur:
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
              defaultValue={user.nom}
            />
            <input
              type="text"
              name="phone"
              required
              className="custom"
              style={{ width: "100%" }}
              placeholder="Téléphone :"
              defaultValue={user.phone}
            />
            <input
              type="text"
              name="adresse"
              required
              className="custom"
              style={{ width: "100%" }}
              placeholder="Adresse :"
              defaultValue={user.adresse}
            />
            <div style={{ alignSelf: "center" }}>
              <LoadingButton
                startIcon={<EditRounded />}
                sx={loadingBtn}
                type="submit"
                loading={loading}
                loadingIndicator={<LottieLoading size={50} speed={1} />}
              >
                Modifier
              </LoadingButton>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
