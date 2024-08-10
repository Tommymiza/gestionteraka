"use client";
import userStore from "@/store/user";
import {
  Avatar,
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

export default function QuantifierDetail() {
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
        <Typography variant="h5">Détail quantificateur</Typography>
        <ActionContainer>
          <Button
            variant="text"
            color="primary"
            startIcon={<Icons name="ArrowLeft" />}
            type="button"
            onClick={() => router.push("/user/quantifier")}
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
              width={"40%"}
              sx={{
                borderRadius: "100%",
                aspectRatio: 1,
                minWidth: 250,
                overflow: "hidden",
              }}
            >
              {user?.photo ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API}/file/${user.photo}`}
                  style={{ objectFit: "cover" }}
                  width={"100%"}
                  height={"100%"}
                />
              ) : (
                <Avatar sx={{ width: "100%", height: "100%" }} />
              )}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <ItemDetail label="Nom" value={user?.nom} />
            <ItemDetail label="Email" value={user?.email} />
            <ItemDetail label="Téléphone" value={user?.num_tel} />
            <ItemDetail label="Adresse" value={user?.adresse} />
            <ItemDetail
              label="Genre"
              value={user?.genre === "H" ? "Homme" : "Femme"}
            />
            <ItemDetail
              label="Année de naissance"
              value={user?.annee_naissance}
            />
            <ItemDetail label="Rôle" value={"Quantificateur"} />
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
  value: string | undefined | number;
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
