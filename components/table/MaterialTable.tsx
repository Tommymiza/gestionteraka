import { Search } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_TableInstance,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";

import smallGroupStore from "@/store/small-group";
import { SmallGroupItem } from "@/store/small-group/type";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import * as XLSX from "xlsx";
import Icons from "../utils/Icons";

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
  const { smallGroupList } = smallGroupStore();
  function evaluateValue(value: SmallGroupItem, key: string) {
    let parties = key.split(".");
    let valeur: any = value;
    for (var i = 0; i < parties.length; i++) {
      valeur = valeur[parties[i] as keyof SmallGroupItem];
    }
    return valeur;
  }

  const handleExportToExcel = (table: MRT_TableInstance<any>) => {
    const allRows = smallGroupList.map((r) => {
      const currentRow: any = {};
      table.getAllColumns().forEach((c) => {
        if (c.columnDef.accessorFn) {
          currentRow[c.columnDef.header] = c.columnDef.accessorFn(r);
        } else {
          currentRow[c.columnDef.header] = evaluateValue(r, c.columnDef.id);
        }
      });
      delete currentRow["Actions"];
      return currentRow;
    });
    let footer: any = {};
    table.getAllColumns().forEach((c) => {
      const params = { table: table };
      if (c.columnDef.Footer) {
        const getValue: any = c.columnDef.Footer;
        footer[c.columnDef.header] = getValue(params);
      }
    });
    delete footer["Actions"];
    allRows.push(footer);
    console.log(allRows);
    const ws = XLSX.utils.json_to_sheet(allRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PG complet");
    XLSX.writeFile(wb, "Petit groupe.xlsx");
  };
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
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icons name="Download" />}
            onClick={() => handleExportToExcel(table)}
          >
            Excel
          </Button>
        </Stack>
      </Stack>
    ),
  });
  return <MaterialReactTable table={table} />;
}
