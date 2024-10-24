import { GazetteItem } from "@/store/gazette/type";
import { format } from "date-fns";
import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

export default function Columns() {
  const col = useMemo<MRT_ColumnDef<GazetteItem, any>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Titre",
      },
      {
        accessorFn: (row) => format(new Date(row.date_out), "dd/MM/yyyy"),
        header: "Date de sortie",
      },
    ],
    []
  );
  return col;
}
