import { SmallGroupItem } from "@/store/small-group/type";
import { format } from "date-fns";
import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

export default function Columns() {
  const col = useMemo<MRT_ColumnDef<SmallGroupItem, any>[]>(
    () => [
      {
        accessorKey: "code",
        header: "Code du petit groupe",
      },
      {
        accessorKey: "nom",
        header: "Nom du petit groupe",
      },
      {
        accessorKey: "nom_cluster",
        header: "Nom du cluster",
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
        accessorFn: (row) => row.members?.length,
        header: "Membres",
        align: "center",
      },
      {
        accessorFn: (row) => row.members?.filter((m) => m.genre === "H").length,
        header: "Homme",
        align: "center",
      },
      {
        accessorFn: (row) => row.members?.filter((m) => m.genre === "F").length,
        header: "Femme",
        align: "center",
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
        accessorKey: "operateur.nom",
        header: "Opérateur",
      },
      {
        accessorFn: (row) => row.verificateur?.nom ?? "",
        header: "Vérificateur",
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
