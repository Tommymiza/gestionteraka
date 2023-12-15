import {
  CopyAllRounded,
  DeleteRounded,
  EditRounded,
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
import { iconButton } from "../../styled";
import { GET } from "../../api/Request";
import { routes } from "../../api/Route";
import DeleteChampion from "../Dialog/Champion/DeleteChampion";
import UpdateChampion from "../Dialog/Champion/UpdateChampion";
import InfoChampion from "../Dialog/Champion/InfoChampion";
import AjoutChampion from "../Dialog/Champion/AjoutChampion";

export default function Champion() {
  const { setAlert } = useContext(ActContext);
  const [data, setData] = useState([]);
  const [dialog, setDialog] = useState();
  const tableInstance = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const columns = useMemo(
    () => [
      {
        accessorKey: "id_champion",
        header: "ID",
        size: 5,
      },
      {
        accessorKey: "nom",
        header: "Nom du champion",
        size: 300,
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
        accessorKey: "phone",
        header: "Téléphone",
        enableClickToCopy: true,
        headerAlign: "center",
        align: "center",
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
        accessorKey: "lieu",
        header: "Lieu",
      },
    ],
    []
  );
  const refreshData = () => {
    setLoading(true);
    getListPersonnel();
  };
  const getListPersonnel = async () => {
    try {
      const response = await GET(routes.GETCHAMPION);
      setData(response.data.all);
    } catch (error) {
      console.log(error);
      setAlert({
        type: "error",
        message: error.response.data.message ?? "Erreur de connexion!",
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    getListPersonnel();
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
          sx: { color: "var(--primary)", flex: 1 },
          align: "center",
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
          sx: {
            fontSize: "15px",
          },
          align: "center",
        }}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "10px" }}>
            <Tooltip arrow title={"Afficher"}>
              <IconButton
                sx={iconButton}
                onClick={() =>
                  setDialog(
                    <InfoChampion close={setDialog} user={row.original} />
                  )
                }
              >
                <VisibilityRounded />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title={"Modifier"}>
              <IconButton
                sx={iconButton}
                onClick={() =>
                  setDialog(
                    <UpdateChampion
                      close={setDialog}
                      user={row.original}
                      refresh={refreshData}
                    />
                  )
                }
              >
                <EditRounded />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title={"Supprimer"}>
              <IconButton
                sx={iconButton}
                onClick={() =>
                  setDialog(
                    <DeleteChampion
                      close={setDialog}
                      id={row.original.id_champion}
                      refresh={refreshData}
                    />
                  )
                }
              >
                <DeleteRounded />
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
              Liste des champions :
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
                  <IconButton onClick={refreshData} sx={iconButton}>
                    <RefreshRounded />
                  </IconButton>
                </Tooltip>
                {/* eslint-disable-next-line */}
                <MRT_FullScreenToggleButton table={table} sx={iconButton} />
                <Tooltip arrow title={"Ajouter un champion"}>
                  <IconButton
                    sx={iconButton}
                    onClick={() =>
                      setDialog(
                        <AjoutChampion
                          refresh={refreshData}
                          close={setDialog}
                        />
                      )
                    }
                  >
                    <PersonAddAlt1Rounded />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        )}
      />
      {dialog}
    </div>
  );
}
