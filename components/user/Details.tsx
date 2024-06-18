"use client";
import userStore from "@/store/user";
import {
  Button,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Image } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Icons from "../utils/Icons";
import { Role } from "./form";

export default function UserDetail() {
  const { user, getUser } = userStore();
  const { idUser } = useParams();
  const router = useRouter();
  useEffect(() => {
    if (typeof idUser === "string") {
      getUser({ id: +idUser });
    }
  }, [idUser]);
  return (
    <Stack marginBottom={2}>
      <FormTitle>
        <Typography variant="h5">Détail utilisateur</Typography>
        <ActionContainer>
          <Button
            variant="text"
            color="primary"
            startIcon={<Icons name="ArrowLeft" />}
            type="button"
            onClick={() => router.push("/user")}
          >
            Retour
          </Button>
        </ActionContainer>
      </FormTitle>
      <Divider />
      <Grid container marginTop={2} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Stack direction={"row"} justifyContent={"center"} width={"100%"}>
            <Stack
              width={"50%"}
              sx={{
                borderRadius: "100%",
                aspectRatio: 1,
                minWidth: 300,
                overflow: "hidden",
              }}
            >
              <Image
                src={
                  user?.photo
                    ? `${process.env.NEXT_PUBLIC_API}/file/${user.photo}`
                    : undefined
                }
                style={{ objectFit: "cover" }}
                width={"100%"}
                height={"100%"}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <ItemDetail label="Nom" value={user?.name} />
            <ItemDetail label="Email" value={user?.email} />
            <ItemDetail label="Téléphone" value={user?.phone} />
            <ItemDetail label="CIN" value={user?.cin} />
            <ItemDetail
              label="Role"
              value={Role.find((r) => r.value === user?.role)?.label}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

function ItemDetail({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <Stack
      direction={"column"}
      gap={1}
      padding={2}
      borderRadius={5}
      sx={{ background: "white", boxShadow: "0 0 25px rgba(0,0,0,0.01)" }}
    >
      <Typography variant="h6" fontWeight={"bold"}>
        {label} :
      </Typography>
      <Typography variant="body1" color={"GrayText"}>
        {value}
      </Typography>
    </Stack>
  );
}

const FormTitle = styled(Stack)({
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  paddingBottom: "0.5rem",
});

const ActionContainer = styled(Stack)({
  display: "flex",
  flexDirection: "row",
  gap: 10,
});
