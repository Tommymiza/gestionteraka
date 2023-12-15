import { Close, DeleteRounded } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useContext, useState } from "react";
import { iconButton, loadingBtn } from "../../../styled";
import { ActContext } from "../../../App";
import { DELETE } from "../../../api/Request";
import { routes } from "../../../api/Route";
import LottieLoading from "../../Outils/LottieLoading";

export default function DeletePersonnel({ close, id, refresh }) {
  const { setAlert } = useContext(ActContext);
  const [load, setLoad] = useState(false);
  const handleDelete = async () => {
    setLoad(true);
    try {
      const response = await DELETE(routes.DELETEPERSONNEL, id);
      setAlert({ type: "success", message: response.message });
      close();
      refresh();
    } catch (error) {
      setAlert({ type: "error", message: error.response.data.message });
    }
    setLoad(false);
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
            Suppression:
          </h3>
          <Tooltip arrow title={"Fermer"}>
            <IconButton onClick={() => close()} sx={{ ...iconButton }}>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col items-center">
          <p>Voulez-vous confirmer la suppression ?</p>
          <div className="flex gap-2">
            <LoadingButton
              startIcon={<DeleteRounded />}
              sx={{ ...loadingBtn, width: 80 }}
              type="submit"
              onClick={handleDelete}
              loading={load}
              loadingIndicator={<LottieLoading size={50} speed={1} />}
            >
              Oui
            </LoadingButton>
            <Button
              onClick={() => close()}
              sx={{ ...loadingBtn, width: 80, background: "var(--shadow)" }}
            >
              Non
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
