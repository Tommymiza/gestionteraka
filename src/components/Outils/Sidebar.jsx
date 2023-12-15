import {
  AdminPanelSettingsRounded,
  CottageRounded,
  DesignServicesRounded,
  Diversity3Rounded,
  EmojiEventsRounded,
  MenuRounded,
  PowerSettingsNewRounded,
} from "@mui/icons-material";
import React, { useContext } from "react";
import { ActContext } from "../../App";
import "../../styles/sidebar.scss";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import { GET } from "../../api/Request";
import { routes } from "../../api/Route";

export default function Sidebar() {
  const { setUser, setAlert } = useContext(ActContext);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await GET(routes.LOGOUT);
      setUser(null);
      localStorage.removeItem("token");
      setAlert({ type: "success", message: response.message });
    } catch (error) {
      console.log(error);
      setAlert({ type: "error", message: "Veuillez réessayer!" });
    }
  };

  function goToRoute(url) {
    document.getElementById("sidebar").classList.remove("extend");
    navigate(url);
  }
  return (
    <div id="sidebar">
      <div>
        <Tooltip arrow title="Menu">
          <div
            className="sidebar-el"
            onClick={() =>
              document.getElementById("sidebar").classList.toggle("extend")
            }
          >
            <MenuRounded sx={{ width: 40, height: 30 }} />
            <p>Menu</p>
          </div>
        </Tooltip>
      </div>
      <div>
        <Tooltip arrow title="Accueil">
          <div className="sidebar-el" onClick={() => goToRoute("/")}>
            <CottageRounded sx={{ width: 40, height: 30 }} />
            <p>Accueil</p>
          </div>
        </Tooltip>
        <Tooltip arrow title="Employé">
          <div className="sidebar-el" onClick={() => goToRoute("/employe")}>
            <AdminPanelSettingsRounded sx={{ width: 40, height: 30 }} />
            <p>Employé</p>
          </div>
        </Tooltip>
        <Tooltip
          arrow
          title="Quantificateur"
          onClick={() => goToRoute("/quantificateur")}
        >
          <div className="sidebar-el">
            <DesignServicesRounded sx={{ width: 40, height: 30 }} />
            <p>Quantificateur</p>
          </div>
        </Tooltip>
        <Tooltip arrow title="Champion" onClick={() => goToRoute("/champion")}>
          <div className="sidebar-el">
            <EmojiEventsRounded sx={{ width: 40, height: 30 }} />
            <p>Champion</p>
          </div>
        </Tooltip>
        <Tooltip
          arrow
          title="Petit groupe"
          onClick={() => goToRoute("/petit-groupe")}
        >
          <div className="sidebar-el">
            <Diversity3Rounded sx={{ width: 40, height: 30 }} />
            <p>Petit&nbsp;Groupe</p>
          </div>
        </Tooltip>
      </div>
      <div>
        <Tooltip arrow title="Sortir">
          <div className="sidebar-el" onClick={logout}>
            <PowerSettingsNewRounded sx={{ width: 40, height: 30 }} />
            Sortir
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
