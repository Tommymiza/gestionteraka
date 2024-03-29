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
  MRT_FullScreenToggleButton,
  MRT_GlobalFilterTextField,
  MaterialReactTable,
} from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ActContext } from "../../App";
import { GET } from "../../api/Request";
import { routes } from "../../api/Route";
import { iconButton } from "../../styled";
import AjoutQuantif from "../Dialog/Quantificateur/AjoutQuantif";
import DeleteQuantif from "../Dialog/Quantificateur/DeleteQuantif";
import InfoQuantif from "../Dialog/Quantificateur/InfoQuantif";
import UpdateQuantif from "../Dialog/Quantificateur/UpdateQuantif";

export default function Quatificateur() {
  const { setAlert } = useContext(ActContext);
  const [data, setData] = useState([]);
  const [dialog, setDialog] = useState();
  const tableInstance = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const columns = useMemo(
    () => [
      {
        accessorKey: "id_quantificateur",
        header: "ID",
        size: 5,
      },
      {
        accessorKey: "nom",
        header: "Nom du quantificateur",
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
    ],
    []
  );
  const refreshData = () => {
    setLoading(true);
    getListPersonnel();
  };
  const getListPersonnel = async () => {
    try {
      const response = await GET(routes.GETQUANTIF);
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
                    <InfoQuantif close={setDialog} user={row.original} />
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
                    <UpdateQuantif
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
                    <DeleteQuantif
                      close={setDialog}
                      id={row.original.id_quantificateur}
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
              Liste des quantificateurs :
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
                <Tooltip arrow title={"Ajouter un quantificateur"}>
                  <IconButton
                    sx={iconButton}
                    onClick={() =>
                      setDialog(
                        <AjoutQuantif refresh={refreshData} close={setDialog} />
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
