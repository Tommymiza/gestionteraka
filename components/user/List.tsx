import userStore from "@/store/user";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import MaterialTable from "../table/MaterialTable";
import Icons from "../utils/Icons";
import Columns from "./table/columns";

export default function ListUser() {
  const { userList, getUsers, loading } = userStore();
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <MaterialTable
      columns={Columns()}
      data={userList}
      title="Liste des utilisateurs"
      topToolbar={<TopToolbar />}
      state={{
        isLoading: loading,
      }}
    />
  );
}

function TopToolbar() {
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
