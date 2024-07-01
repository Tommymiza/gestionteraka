import { SmallGroupItem } from "@/store/small-group/type";
import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

export default function Columns() {
  const col = useMemo<MRT_ColumnDef<SmallGroupItem, any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nom du petit groupe",
      },
      {
        accessorKey: "region",
        header: "Région",
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
        accessorFn: (row) => row.members.length,
        header: "Membres",
        align: "center",
      },
      {
        accessorFn: (row) => row.members.filter((m) => m.sexe === "M").length,
        header: "Homme",
        align: "center",
      },
      {
        accessorFn: (row) => row.members.filter((m) => m.sexe === "F").length,
        header: "Femme",
        align: "center",
      },
    ],
    []
  );
  return col;
}
