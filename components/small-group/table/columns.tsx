import { SmallGroupItem } from "@/store/small-group/type";
import { Chip } from "@mui/material";
import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

export default function Columns() {
  const col = useMemo<MRT_ColumnDef<SmallGroupItem, any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nom du groupe",
      },
      {
        accessorKey: "slogan",
        header: "Slogan",
      },
      {
        accessorKey: "region",
        header: "District",
      },
      {
        accessorKey: "district",
        header: "District",
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
        accessorKey: "families",
        header: "Familles différentes",
        Cell: ({ row }) => {
          return row.original.families ? (
            <Chip label="Oui" color="success" />
          ) : (
            <Chip label="Non" color="error" />
          );
        },
      },
      {
        accessorKey: "trainings",
        header: "Formations",
        Cell: ({ row }) => {
          return row.original.trainings ? (
            <Chip label="Oui" color="success" />
          ) : (
            <Chip label="Non" color="error" />
          );
        },
      },
      {
        accessorKey: "nursery",
        header: "Avoir une pépinière",
        Cell: ({ row }) => {
          return row.original.nursery ? (
            <Chip label="Oui" color="success" />
          ) : (
            <Chip label="Non" color="error" />
          );
        },
      },
      {
        accessorKey: "personal_id",
        header: "Vérifié",
        Cell: ({ row }) => {
          return row.original.personal_id ? (
            <Chip label="Oui" color="success" />
          ) : (
            <Chip label="Non" color="error" />
          );
        },
      },
    ],
    []
  );
  return col;
}
