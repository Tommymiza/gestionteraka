import { Search } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_TableInstance,
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
  topToolbar?: ({ table }: { table: MRT_TableInstance<any> }) => JSX.Element;
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
    muiTableHeadCellProps: {
      sx: {
        "& .Mui-TableHeadCell-Content-Wrapper": {
          whiteSpace: "nowrap",
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        borderBottom: "none",
      },
    },
    muiCircularProgressProps: {
      sx: {
        display: "none",
      },
    },
    positionActionsColumn: "last",
    muiTablePaperProps: {
      sx: {
        background: "white",
        borderRadius: 2,
        boxShadow: "0 0 35px 0 rgba(0,0,0,0.01)",
        width: "100%",
        padding: 4,
      },
      elevation: 0,
    },
    initialState: {
      showGlobalFilter: true,
      density: "compact",
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    renderTopToolbar: ({ table }) => (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginBottom={2}
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
          {props.topToolbar && props.topToolbar({ table })}
        </Stack>
      </Stack>
    ),
  });
  return <MaterialReactTable table={table} />;
}
