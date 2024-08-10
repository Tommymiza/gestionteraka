import droitStore from "@/store/droit";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { IconButton, Stack, styled } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import { useConfirm } from "material-ui-confirm";
import { useEffect } from "react";
import MaterialTable from "../../table/MaterialTable";
import Columns from "./table/columns";

export default function List() {
  const { droitList, getDroits, loading, deleteDroit, editDroit } =
    droitStore();
  const confirm = useConfirm();
  const handleDelete = (id: number) => {
    confirm({
      title: "Supprimer",
      description: "Voulez-vous vraiment supprimer ce droit d'usage ?",
      confirmationText: "Oui",
      cancellationText: "Annuler",
    }).then(async () => {
      await deleteDroit(id);
      getDroits();
    });
  };
  const handleEdit = async (id: number) => {
    await editDroit(id);
  };
  useEffect(() => {
    getDroits();
  }, []);
  return (
    <MaterialTable
      columns={Columns()}
      data={droitList}
      title="Liste des droits d'usage"
      topToolbar={TopToolbar}
      state={{
        isLoading: loading,
      }}
      enableRowActions={true}
      renderRowActions={({ row }) => (
        <BtnContainer>
          <IconButton
            color="warning"
            onClick={() => handleEdit(row.original.fid)}
          >
            <EditRounded />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(row.original.fid)}
          >
            <DeleteRounded />
          </IconButton>
        </BtnContainer>
      )}
    />
  );
}

function TopToolbar({ table }: { table: MRT_TableInstance<any> }) {
  return <Stack direction={"row"} alignItems={"center"} gap={1}></Stack>;
}

const BtnContainer = styled(Stack)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
}));
