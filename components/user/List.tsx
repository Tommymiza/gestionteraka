import userStore from "@/store/user";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import MaterialTable from "../table/MaterialTable";
import Icons from "../utils/Icons";
import columns from "./table/columns";

export default function ListUser() {
  const { userList, getUsers } = userStore();
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <MaterialTable
      columns={columns()}
      data={userList}
      title="Liste des utilisateurs"
      topToolbar={<TopToolbar />}
    />
  );
}

function TopToolbar() {
  return (
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      <Link href="/user/create">
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
