import Icons from "@/components/utils/Icons";
import { theme } from "@/lib/theme";
import { EspeceItem } from "@/store/espece/type";
import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

export default function Columns() {
  const col = useMemo<MRT_ColumnDef<EspeceItem, any>[]>(
    () => [
      {
        accessorKey: "genre",
        header: "Genre",
      },
      {
        accessorKey: "espece",
        header: "Espece",
      },
      {
        accessorKey: "nom_vernaculaire",
        header: "Nom vernaculaire",
      },
      {
        accessorKey: "appellation_locale",
        header: "Appellation locale",
      },
      {
        accessorKey: "categorie",
        header: "Categorie",
      },
      {
        accessorKey: "familles_botanique",
        header: "Familles botanique",
      },
      {
        accessorKey: "liste_rouge",
        header: "Liste rouge",
        Cell: ({ row }) =>
          row.original.liste_rouge ? (
            <Icons name="Check" color={theme.palette.primary.main} />
          ) : (
            <Icons name="X" color={theme.palette.error.main} />
          ),
      },
      {
        accessorKey: "liste_verte",
        header: "Liste verte",
        Cell: ({ row }) =>
          row.original.liste_verte ? (
            <Icons name="Check" color={theme.palette.primary.main} />
          ) : (
            <Icons name="X" color={theme.palette.error.main} />
          ),
      },
      {
        accessorKey: "liste_blanche",
        header: "Liste blanche",
        Cell: ({ row }) =>
          row.original.liste_blanche ? (
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
