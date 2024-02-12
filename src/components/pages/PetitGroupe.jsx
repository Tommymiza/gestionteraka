import {
  CheckRounded,
  DeleteRounded,
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
import { useNavigate } from "react-router-dom";
import { ActContext } from "../../App";
import { GET, PUT } from "../../api/Request";
import { routes } from "../../api/Route";
import { iconButton } from "../../styled";
import DeletePg from "../Dialog/Pg/DeletePg";

export default function PetitGroupe() {
  const { setAlert, user } = useContext(ActContext);
  const [data, setData] = useState([]);
  const [dialog, setDialog] = useState();
  const tableInstance = useRef(null);
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id_pg",
        header: "ID",
        size: 5,
      },
      {
        accessorKey: "nom_pg",
        header: "Nom du PG",
        size: 300,
      },
      {
        accessorKey: "region",
        header: "Région",
      },
      {
        accessorKey: "district",
        header: "District",
        headerAlign: "center",
        align: "center",
      },
      {
        accessorKey: "commune",
        header: "Commune",
      },
      {
        accessorKey: "fokontany",
        header: "Fokontany",
      },
      {
        accessorKey: "issue_famille_different",
        header: "Trois familles",
        Cell: ({ cell }) => (
          <span className={cell.getValue() ? "chip success" : "chip error"}>
            {cell.getValue() ? "Oui" : "Non"}
          </span>
        ),
      },
      {
        accessorKey: "suivi_formation",
        header: "Formation",
        Cell: ({ cell }) => (
          <span className={cell.getValue() ? "chip success" : "chip error"}>
            {cell.getValue() ? "Oui" : "Non"}
          </span>
        ),
      },
      {
        accessorKey: "avoir_terrain_pepiniere",
        header: "Pépinière",
        Cell: ({ cell }) => (
          <span className={cell.getValue() ? "chip success" : "chip error"}>
            {cell.getValue() ? "Oui" : "Non"}
          </span>
        ),
      },
      {
        accessorKey: "nb_semis",
        header: "Nombres semis",
      },
      {
        accessorKey: "created_at",
        header: "Ajouté le",
        Cell: ({ cell }) => (
          <p>{new Date(cell.getValue()).toLocaleString("fr")}</p>
        ),
      },
      {
        accessorKey: "id_staff_verificateur",
        header: "Vérifié",
        Cell: ({ cell }) => (
          <span className={cell.getValue() ? "chip success" : "chip error"}>
            {cell.getValue() ? "Oui" : "Non"}
          </span>
        ),
      },
    ],
    []
  );
  const validerPg = async (pg) => {
    try {
      const res = await PUT(
        `${process.env.REACT_APP_API}/petit-groupe/check`,
        pg,
        {
          id_staff_verificateur: user.id,
        }
      );
      if (!res.success) throw new Error(res.message);
      if (res.success) {
        setAlert({
          message: "Petit groupe validé avec succès",
          type: "success",
        });
        getListPg();
      }
    } catch (error) {
      console.log(error);
      setAlert({
        message: "Erreur lors de la validation du petit groupe",
        type: "error",
      });
    }
  };

  const getListPg = async () => {
    try {
      const response = await GET(routes.GETPG);
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
  const refreshData = () => {
    setLoading(true);
    getListPg();
  };
  useEffect(() => {
    getListPg();
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
          sorting: [{ id: "nom_pg", asc: true }],
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
                  navigate(`/petit-groupe/${row.getValue("id_pg")}`)
                }
              >
                <VisibilityRounded />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title={"Valider"}>
              <span>
                <IconButton
                  sx={{ ...iconButton }}
                  onClick={() => {
                    if (row.getValue("id_staff_verificateur") !== null) return;
                    validerPg(row.getValue("id_pg"));
                  }}
                  disabled={row.getValue("id_staff_verificateur") !== null}
                >
                  <CheckRounded />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip arrow title={"Supprimer"}>
              <IconButton
                sx={iconButton}
                onClick={() =>
                  setDialog(
                    <DeletePg
                      close={setDialog}
                      id={row.original.id_pg}
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
              Liste des petits groupes :
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
              </Box>
            </Box>
          </Box>
        )}
      />
      {dialog}
    </div>
  );
}
