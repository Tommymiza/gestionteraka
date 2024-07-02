import smallGroupStore from "@/store/small-group";
import { SmallGroupItem } from "@/store/small-group/type";
import {
  DeleteRounded,
  EditRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { Button, IconButton, Stack, styled } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import { useConfirm } from "material-ui-confirm";
import Link from "next/link";
import { useEffect } from "react";
import * as XLSX from "xlsx";
import MaterialTable from "../table/MaterialTable";
import Icons from "../utils/Icons";
import Columns from "./table/columns";

export default function ListSmallGroup() {
  const { smallGroupList, getSmallGroups, loading, deleteSmallGroup } =
    smallGroupStore();
  const confirm = useConfirm();
  const handleDelete = (id: number) => {
    confirm({
      title: "Supprimer",
      description: "Voulez-vous vraiment supprimer ce petit groupe ?",
      confirmationText: "Oui",
      cancellationText: "Annuler",
    }).then(async () => {
      await deleteSmallGroup(id);
      getSmallGroups();
    });
  };

  useEffect(() => {
    getSmallGroups({
      include: {
        members: true,
      },
    });
  }, []);
  return (
    <MaterialTable
      columns={Columns()}
      data={smallGroupList}
      title="Petits groupes"
      topToolbar={TopToolbar}
      state={{
        isLoading: loading,
      }}
      enableRowActions={true}
      renderRowActions={({ row, table }) => (
        <BtnContainer>
          <Link href={`/small-group/${row.original.id}`}>
            <IconButton color="info">
              <VisibilityRounded />
            </IconButton>
          </Link>
          <Link href={`/small-group/${row.original.id}/edit`}>
            <IconButton color="warning">
              <EditRounded />
            </IconButton>
          </Link>
          <IconButton
            color="error"
            onClick={() => handleDelete(row.original.id)}
          >
            <DeleteRounded />
          </IconButton>
        </BtnContainer>
      )}
    />
  );
}

function TopToolbar({ table }: { table: MRT_TableInstance<any> }) {
  function evaluateValue(value: SmallGroupItem, key: string) {
    let parties = key.split(".");
    let valeur: any = value;
    for (var i = 0; i < parties.length; i++) {
      valeur = valeur[parties[i] as keyof SmallGroupItem];
    }
    return valeur;
  }

  const handleExportToExcel = () => {
    const allRows = table
      .getSortedRowModel()
      .rows.map((r) => r.original)
      .map((r) => {
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
    const ws = XLSX.utils.json_to_sheet(allRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PG complet");
    XLSX.writeFile(wb, "Petit groupe.xlsx");
  };

  return (
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      <Link href="/small-group/add">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icons name="Plus" />}
        >
          Ajouter
        </Button>
      </Link>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Icons name="Download" />}
        onClick={handleExportToExcel}
      >
        Excel
      </Button>
    </Stack>
  );
}

const BtnContainer = styled(Stack)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
}));
