import {
  AlternateEmailRounded,
  CopyAllRounded,
  DeleteRounded,
  PersonAddAlt1Rounded,
  RefreshRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  MaterialReactTable,
  MRT_FullScreenToggleButton,
  MRT_GlobalFilterTextField,
} from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import React, { useMemo, useState, useRef, useContext, useEffect } from "react";
import { ActContext } from "../../App";
import axios from "axios";
import { iconButton } from "../../styled";
import InfoPersonnel from "../Outils/InfoPersonnel";
import AjoutPersonnel from "../Outils/AjoutPersonnel";

export default function Employe() {
  const { user, setAlert } = useContext(ActContext);
  const [data, setData] = useState([]);
  const [dialog, setDialog] = useState();
  const tableInstance = useRef(null);
  const [isLoading, setLoading] = useState(true);
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
  const columns = useMemo(
    () => [
      {
        accessorKey: "nom",
        header: "Nom du personnel",
      },
      {
        accessorKey: "email",
        header: "Email",
        enableClickToCopy: true,
        muiTableBodyCellCopyButtonProps: {
          fullWidth: true,
          endIcon: <CopyAllRounded />,
          sx: { justifyContent: "flex-start", width: "fit-content" },
        },
      },
      {
        accessorKey: "tel",
        header: "Téléphone",
        enableClickToCopy: true,
        muiTableBodyCellCopyButtonProps: {
          fullWidth: true,
          endIcon: <CopyAllRounded />,
          sx: { justifyContent: "flex-start", width: "fit-content" },
        },
      },
      {
        accessorKey: "adresse",
        header: "Adresse",
      },
      {
        accessorKey: "role",
        header: "Fonction",
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return (
            <span className="chip" style={{ background: getChipColor(value) }}>
              {value}
            </span>
          );
        },
      },
    ],
    []
  );
  const refreshData = () => {
    setLoading(true);
    axios({
      url: `${process.env.REACT_APP_API}/personnel/list`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setData(res.data.data.users);
      })
      .catch((err) => {
        console.log(err);
        setAlert({ type: "error", message: "Erreur de connexion" });
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    const controller = new AbortController();
    axios({
      signal: controller.signal,
      url: `${process.env.REACT_APP_API}/personnel/list`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setData(res.data.data.users);
      })
      .catch((err) => {
        console.log(err);
        setAlert({ type: "error", message: "Erreur de connexion" });
      })
      .finally(() => setLoading(false));
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div id="container">
      <MaterialReactTable
        columns={columns}
        data={data}
        tableInstanceRef={tableInstance}
        selectAllMode="page"
        localization={MRT_Localization_FR}
        enableColumnActions={true}
        enableRowSelection={true}
        enableGlobalFilter={true}
        initialState={{
          showGlobalFilter: true,
          pagination: { pageSize: 10 },
          sorting: [{ id: "nom", asc: true }],
        }}
        muiToolbarAlertBannerProps={{
          sx: { display: "none" },
        }}
        muiTableHeadCellProps={{
          sx: { color: "var(--primary)" },
        }}
        state={{
          isLoading,
        }}
        muiBottomToolbarProps={{
          sx: {
            "&>div>div": {
              justifyContent: "center",
              left: "50%",
              transform: "translateX(-50%)",
            },
          },
        }}
        muiLinearProgressProps={({ isTopToolbar }) => ({
          sx: {
            display: "none",
          },
        })}
        muiTablePaperProps={{
          elevation: 0,
        }}
        muiTableBodyCellProps={{
          sx: { fontSize: "17px" },
        }}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "20px" }}>
            <Tooltip arrow title={"Afficher"}>
              <IconButton
                sx={iconButton}
                onClick={() => setDialog(<InfoPersonnel close={setDialog} user={row.original} />)}
              >
                <VisibilityRounded />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title={"Envoyer un mail"}>
              <IconButton
                sx={iconButton}
                onClick={() => window.location.href = `mailto:${row.original.email}` }
              >
                <AlternateEmailRounded />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbar={({ table }) => (
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
              padding: "20px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h2 style={{ fontFamily: "Averta", textTransform: "uppercase" }}>
              Liste des personnels :
            </h2>
            {/* eslint-disable-next-line */}
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              <Box sx={{ marginTop: "5px", minWidth: 240 }}>
                {/* eslint-disable-next-line */}
                <MRT_GlobalFilterTextField table={table} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <Tooltip arrow title={"Actualiser les données"}>
                  <IconButton onClick={refreshData} sx={iconButton} >
                    <RefreshRounded />
                  </IconButton>
                </Tooltip>
                {user.role === "Admin" && (
                  <Tooltip arrow title={"Supprimer les comptes seléctionnés"}>
                    <span>
                      <IconButton sx={iconButton}>
                        <DeleteRounded />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
                {/* eslint-disable-next-line */}
                <MRT_FullScreenToggleButton table={table} sx={iconButton} />
                {user.role === "Admin" && (
                  <Tooltip arrow title={"Ajouter un personnel"}>
                    <IconButton sx={iconButton} onClick={()=>setDialog(<AjoutPersonnel close={setDialog} />)}>
                      <PersonAddAlt1Rounded />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Box>
        )}
      />
      {dialog}
    </div>
  );
}
