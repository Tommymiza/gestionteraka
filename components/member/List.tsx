import memberStore from "@/store/member";
import {
  DeleteRounded,
  EditRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { Button, IconButton, Stack, styled } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import Link from "next/link";
import { useEffect } from "react";
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
      getMembers();
    });
  };
  useEffect(() => {
    getMembers();
  }, []);
  return (
    <MaterialTable
      columns={Columns()}
      data={memberList}
      title="Liste des membres"
      topToolbar={<TopToolbar />}
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

function TopToolbar() {
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
    </Stack>
  );
}

const BtnContainer = styled(Stack)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
}));
