import { DroitItem } from "@/store/droit/type";
import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

export default function Columns() {
  const col = useMemo<MRT_ColumnDef<DroitItem, any>[]>(
    () => [
      {
        accessorKey: "nom",
        header: "Nom",
      },
    ],
    []
  );
  return col;
}
