import memberStore from "@/store/member";
import { MemberItem } from "@/store/member/type";
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

export default function ListMember() {
  const { memberList, getMembers, loading, deleteMember } = memberStore();
  const confirm = useConfirm();
  const handleDelete = (id: number) => {
    confirm({
      title: "Supprimer",
      description: "Voulez-vous vraiment supprimer ce membre ?",
      confirmationText: "Oui",
      cancellationText: "Annuler",
    }).then(async () => {
      await deleteMember(id);
      getMembers({
        include: {
          SmallGroup: {
            select: {
              region: true,
              district: true,
              nom: true,
              code: true,
              _count: {
                select: { Members: true },
              },
            },
          },
        },
      });
    });
  };
  useEffect(() => {
    getMembers({
      include: {
        SmallGroup: {
          select: {
            region: true,
            district: true,
            nom: true,
            code: true,
            _count: {
              select: { members: true },
            },
          },
        },
      },
    });
  }, []);
  return (
    <MaterialTable
      columns={Columns()}
      data={memberList}
      title="Liste des membres"
      topToolbar={TopToolbar}
      state={{
        isLoading: loading,
      }}
      enableRowActions={true}
      renderRowActions={({ row }) => (
        <BtnContainer>
          <Link href={`/member/${row.original.id}`}>
            <IconButton color="info">
              <VisibilityRounded />
            </IconButton>
          </Link>
          <Link href={`/member/${row.original.id}/edit`}>
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
  function evaluateValue(value: MemberItem, key: string) {
    let parties = key.split(".");
    let valeur: any = value;
    for (var i = 0; i < parties.length; i++) {
      valeur = valeur[parties[i] as keyof MemberItem];
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
    XLSX.utils.book_append_sheet(wb, ws, "Liste membre");
    XLSX.writeFile(wb, "Membre TERAKA.xlsx");
  };

  return (
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      <Link href="/member/add">
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
