import { MemberItem } from "@/store/member/type";
import { Typography } from "@mui/material";
import { format } from "date-fns";
import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

export default function Columns() {
  const col = useMemo<MRT_ColumnDef<MemberItem, any>[]>(
    () => [
      {
        accessorKey: "code_pg",
        header: "Code du petit groupe",
      },
      {
        accessorKey: "smallGroup.nom",
        header: "Nom du petit groupe",
      },
      {
        accessorKey: "nom_prenom_membre",
        header: "Nom et prénoms",
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
        accessorKey: "village",
        header: "Village",
      },
      {
        accessorKey: "genre",
        header: "Genre",
        Cell: ({ row }) => {
          return (
            <Typography variant="body2">
              {row.original.genre === "H" ? "Masculin" : "Féminin"}
            </Typography>
          );
        },
      },
      {
        accessorKey: "age",
        header: "Age",
      },
      {
        accessorKey: "cin",
        header: "CIN",
        enableSorting: false,
      },
      {
        accessorKey: "profession",
        header: "Proféssion",
      },
      {
        accessorKey: "tel",
        header: "Téléphone",
        enableClickToCopy: true,
        enableSorting: false,
      },
      {
        accessorKey: "niveau_education",
        header: "Niveau d'éducation",
      },
      {
        accessorKey: "connaissance_teraka",
        header: "Connaissance du Teraka",
      },
      {
        accessorKey: "motivation_programme",
        header: "Motivation",
      },
      {
        accessorFn: (row) =>
          row.date_inscription
            ? format(new Date(row.date_inscription), "dd/MM/yyyy")
            : "",
        header: "Date d'inscription",
      },
      {
        accessorKey: "lieu_inscription",
        header: "Lieu d'inscription",
      },
      {
        accessorKey: "remarque",
        header: "Remarque",
      },
    ],
    []
  );
  return col;
}
