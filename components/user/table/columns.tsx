import { UserItem } from "@/store/user/type";
import { Chip } from "@mui/material";
import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

export default function columns() {
  const col = useMemo<MRT_ColumnDef<UserItem, any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nom et prénoms",
      },
      {
        accessorKey: "email",
        header: "Email",
        enableClickToCopy: true,
      },
      {
        accessorKey: "address",
        header: "Adresse",
        enableSorting: false,
      },
      {
        accessorKey: "phone",
        header: "Téléphone",
        enableClickToCopy: true,
        enableSorting: false,
      },
      {
        accessorKey: "cin",
        header: "CIN",
        enableSorting: false,
      },
      {
        accessorKey: "is_active",
        header: "Active",
        Cell: ({ row }) => {
          return (
            <Chip
              variant="filled"
              color={row.original.is_active ? "success" : "error"}
              label={row.original.is_active ? "Oui" : "Non"}
            />
          );
        },
      },
    ],
    []
  );
  return col;
}
