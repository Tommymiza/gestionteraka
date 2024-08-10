"use client";
import smallGroupStore from "@/store/small-group";
import { Button, Divider, Stack, styled, Typography } from "@mui/material";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Icons from "../utils/Icons";

export default function SmallGroupDetail() {
  const { smallGroup, getSmallGroup } = smallGroupStore();
  const { idSmallGroup } = useParams();
  const router = useRouter();
  useEffect(() => {
    if (typeof idSmallGroup === "string") {
      getSmallGroup({
        id: +idSmallGroup,
        args: {
          include: {
            operateur: true,
            verificateur: true,
          },
        },
      });
    }
  }, [idSmallGroup]);
  return (
    <Stack marginBottom={2}>
      <FormTitle>
        <Typography variant="h5">Détail petit groupe</Typography>
        <ActionContainer>
          <Button
            variant="text"
            color="primary"
            startIcon={<Icons name="ArrowLeft" />}
            type="button"
            onClick={() => router.push("/small-group")}
          >
            Retour
          </Button>
        </ActionContainer>
      </FormTitle>
      <Divider />
      <Stack direction={"column"} gap={2} padding={2}>
        <ItemDetail label={"Nom"} value={smallGroup?.nom} />
        <ItemDetail label={"Région"} value={smallGroup?.region} />
        <ItemDetail label={"District"} value={smallGroup?.district} />
        <ItemDetail label={"Commune"} value={smallGroup?.commune} />
        <ItemDetail
          label={"Date d'inscription"}
          value={
            smallGroup?.date_inscription
              ? format(new Date(smallGroup.date_inscription), "dd/MM/yyyy")
              : ""
          }
        />
        <ItemDetail label={"Nom du cluster"} value={smallGroup?.nom_cluster} />
      </Stack>
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
