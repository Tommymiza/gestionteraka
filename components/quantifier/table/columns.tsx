import Icons from "@/components/utils/Icons";
import { theme } from "@/lib/theme";
import { UserItem } from "@/store/user/type";
import { Typography } from "@mui/material";
import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

export default function Columns() {
  const col = useMemo<MRT_ColumnDef<UserItem, any>[]>(
    () => [
      {
        accessorKey: "nom",
        header: "Nom et prénoms",
      },
      {
        accessorKey: "email",
        header: "Email",
        enableClickToCopy: true,
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
        accessorKey: "adresse",
        header: "Adresse",
        enableSorting: false,
      },
      {
        accessorKey: "num_tel",
        header: "Téléphone",
        enableClickToCopy: true,
        enableSorting: false,
      },
      {
        accessorKey: "annee_naissance",
        header: "Année de naissance",
        enableSorting: true,
      },
      {
        accessorKey: "is_active",
        header: "Active",
        Cell: ({ row }) =>
          row.original.is_active ? (
            <Icons name="Check" color={theme.palette.primary.main} />
          ) : (
            <Icons name="X" color={theme.palette.error.main} />
          ),
      },
    ],
    []
  );
  return col;
}
