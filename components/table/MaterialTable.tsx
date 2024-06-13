import { Search } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";

import { MRT_Localization_FR } from "material-react-table/locales/fr";

export default function MaterialTable({
  title,
  columns,
  data,
  ...props
}: MRT_TableOptions<any> & {
  data: any[];
  columns: MRT_ColumnDef<any>[];
  title: string;
  topToolbar?: React.ReactNode;
}) {
  const table = useMaterialReactTable({
    ...props,
    columns,
    data,
    localization: MRT_Localization_FR,
    muiTableHeadRowProps: {
      sx: {
        boxShadow: "none",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        borderBottom: "none",
      },
    },
    muiTablePaperProps: {
      sx: {
        background: "white",
        borderRadius: 2,
        boxShadow: "0 0 35px 0 rgba(0,0,0,0.01)",
        width: "100%",
      },
      elevation: 0,
    },
    initialState: {
      showGlobalFilter: true,
      density: "compact",
    },
    renderTopToolbar: ({ table }) => (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={2}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <MRT_GlobalFilterTextField
            InputProps={{
              startAdornment: <Search sx={{ color: "gray" }} />,
              endAdornment: null,
            }}
            table={table}
          />
          {props.topToolbar}
        </Stack>
      </Stack>
    ),
  });
  return <MaterialReactTable table={table} />;
}
