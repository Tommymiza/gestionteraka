import { MemberItem } from "@/store/member/type";
import { format } from "date-fns";
import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

export default function Columns() {
  const col = useMemo<MRT_ColumnDef<MemberItem, any>[]>(
    () => [
      {
        accessorFn: (row) => `PG${row.smallGroup.id}`,
        header: "Code du petit groupe",
      },
      {
        accessorKey: "smallGroup.name",
        header: "Nom du petit groupe",
      },
      {
        accessorKey: "name",
        header: "Nom et prénoms",
      },
      {
        accessorKey: "smallGroup.region",
        header: "Région",
      },
      {
        accessorKey: "smallGroup.district",
        header: "District",
      },
      {
        accessorKey: "smallGroup.commune",
        header: "Commune",
      },
      {
        accessorKey: "smallGroup.fokontany",
        header: "Fokontany",
      },
      {
        accessorKey: "village",
        header: "Village",
      },
      {
        accessorKey: "sexe",
        header: "Sexe",
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
        accessorKey: "job",
        header: "Profession",
      },
      {
        accessorKey: "school",
        header: "Niveau d'éducation",
      },
      {
        accessorKey: "known_by",
        header: "Connaissance du Teraka",
      },
      {
        accessorKey: "motivation",
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
    ],
    []
  );
  return col;
}
