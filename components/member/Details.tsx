"use client";
import memberStore from "@/store/member";
import {
  Button,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Icons from "../utils/Icons";

export default function MemberDetail() {
  const { member, getMember } = memberStore();
  const { idMember } = useParams();
  const router = useRouter();
  useEffect(() => {
    if (typeof idMember === "string") {
      getMember({ id: +idMember });
    }
  }, [idMember]);
  return (
    <Stack marginBottom={2}>
      <FormTitle>
        <Typography variant="h5">Détail membre</Typography>
        <ActionContainer>
          <Button
            variant="text"
            color="primary"
            startIcon={<Icons name="ArrowLeft" />}
            type="button"
            onClick={() => router.push("/member")}
          >
            Retour
          </Button>
        </ActionContainer>
      </FormTitle>
      <Divider />
      <Grid container marginTop={2} spacing={2}>
        <Grid item xs={12} sm={6}></Grid>
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
