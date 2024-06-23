"use client";
import smallGroupStore from "@/store/small-group";
import { Button, Divider, Stack, styled, Typography } from "@mui/material";
import { Image } from "antd";
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
            smallGroupImages: true,
            champion: true,
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
        <ItemDetail label={"Nom"} value={smallGroup?.name} />
        <ItemDetail label={"Slogan"} value={smallGroup?.slogan} />
        <ItemDetail label={"Région"} value={smallGroup?.region} />
        <ItemDetail label={"District"} value={smallGroup?.district} />
        <ItemDetail label={"Commune"} value={smallGroup?.commune} />
        <ItemDetail label={"Fokontany"} value={smallGroup?.fokontany} />
        <ItemDetail
          label={"Familles différentes"}
          value={smallGroup?.families ? "Oui" : "Non"}
        />
        <ItemDetail
          label={"Formations"}
          value={smallGroup?.trainings ? "Oui" : "Non"}
        />
        <ItemDetail
          label={"Avoir une pépinière"}
          value={smallGroup?.nursery ? "Oui" : "Non"}
        />
        <ItemDetail label={"Champion"} value={smallGroup?.champion?.name} />
        <ItemDetail label={"Téléphone 1"} value={smallGroup?.phone1} />
        <ItemDetail label={"Téléphone 2"} value={smallGroup?.phone2} />
        <ItemDetail label={"Téléphone 3"} value={smallGroup?.phone3} />
        <Stack
          padding={3}
          borderRadius={5}
          sx={{ background: "white", boxShadow: "0 0 25px rgba(0,0,0,0.01)" }}
          direction={"column"}
          gap={2}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            Photos :
          </Typography>
          <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
            <Image.PreviewGroup>
              {smallGroup?.smallGroupImages.map((image) => (
                <Image
                  key={image.id}
                  src={`${process.env.NEXT_PUBLIC_API}/file/${image.path}`}
                  width={300}
                />
              ))}
            </Image.PreviewGroup>
          </Stack>
        </Stack>
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
