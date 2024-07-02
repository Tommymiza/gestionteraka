import userStore from "@/store/user";
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
import MaterialTable from "../table/MaterialTable";
import Icons from "../utils/Icons";
import Columns from "./table/columns";

export default function ListRelais() {
  const { userList, getUsers, loading, deleteUser } = userStore();
  const confirm = useConfirm();
  const handleDelete = (id: number) => {
    confirm({
      title: "Supprimer",
      description: "Voulez-vous vraiment supprimer cet utilisateur ?",
      confirmationText: "Oui",
      cancellationText: "Annuler",
    }).then(async () => {
      await deleteUser(id);
      getUsers({
        where: {
          role: "RELAIS",
        },
      });
    });
  };
  useEffect(() => {
    getUsers({
      where: {
        role: "RELAIS",
      },
    });
  }, []);
  return (
    <MaterialTable
      columns={Columns()}
      data={userList}
      title="Liste des relais locaux"
      topToolbar={TopToolbar}
      state={{
        isLoading: loading,
      }}
      enableRowActions={true}
      renderRowActions={({ row }) => (
        <BtnContainer>
          <Link href={`/user/${row.original.id}`}>
            <IconButton color="info">
              <VisibilityRounded />
            </IconButton>
          </Link>
          <Link href={`/user/${row.original.id}/edit`}>
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
  return (
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      <Link href="/user/add">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icons name="Plus" />}
        >
          Ajouter
        </Button>
      </Link>
    </Stack>
  );
}

const BtnContainer = styled(Stack)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
}));
