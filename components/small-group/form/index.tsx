"use client";
import Input from "@/components/shared/Input";
import OSCheckbox from "@/components/shared/OSCheckbox";
import Select from "@/components/shared/Select";
import Icons from "@/components/utils/Icons";
import { COMMUNES, DISTRICTS, REGIONS } from "@/lib/location";
import fileStore from "@/store/file";
import smallGroupStore from "@/store/small-group";
import { UserItem } from "@/store/user/type";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Container,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import * as Yup from "yup";
import UploadFiles from "./UploadFiles";

const validationSchema = Yup.object({
  name: Yup.string().required(),
  region: Yup.string().required(),
  district: Yup.string().required(),
  commune: Yup.string().required(),
  fokontany: Yup.string().required(),
  phone_1: Yup.string().min(10).max(10).required(),
  phone_2: Yup.string().min(10).max(10),
  phone_3: Yup.string().min(10).max(10),
});

export const Role = [
  { value: "PERSONAL", label: "Personnel" },
  { value: "ADMIN", label: "Administrateur" },
  { value: "CHAMPION", label: "Champion" },
  { value: "QUANTIFIER", label: "Quantificateur" },
];

export default function AddFormSmallGroup() {
  const {
    smallGroup,
    createSmallGroup,
    editSmallgroup,
    cancelEdit,
    updateSmallGroup,
    loading,
  } = smallGroupStore();
  const { createFile } = fileStore();
  const router = useRouter();
  const { idSmallGroup } = useParams();
  const initialValues: Partial<UserItem> = useMemo(
    () => ({
      name: smallGroup?.name ?? "",
      slogan: smallGroup?.slogan ?? "",
      region: smallGroup?.region ?? "",
      district: smallGroup?.district ?? "",
      commune: smallGroup?.commune ?? "",
      fokontany: smallGroup?.fokontany ?? "",
      phone_1: smallGroup?.phone_1 ?? "",
      phone_2: smallGroup?.phone_2 ?? "",
      phone_3: smallGroup?.phone_3 ?? "",
      families: smallGroup?.families ?? false,
      trainings: smallGroup?.trainings ?? false,
      nursery: smallGroup?.nursery ?? false,
    }),
    [smallGroup]
  );

  const handleSubmit = async (values: Partial<UserItem>) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <FormTitle>
            <Typography variant="h5">
              {smallGroup ? "Modifier" : "Ajouter"} un petit groupe
            </Typography>
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
              <LoadingButton
                variant="contained"
                loading={loading}
                color="primary"
                type="submit"
              >
                Enregistrer
              </LoadingButton>
            </ActionContainer>
          </FormTitle>
          <Divider />
          <FormContainer maxWidth="lg">
            <Input name="name" label="Nom du petit groupe" />
            <Input name="slogan" label="Slogan" multiline minRows={3} />
            <Select
              name="region"
              label="Région"
              options={REGIONS}
              valueKey="region"
              getOptionLabel={(o) => o.region ?? ""}
            />
            <Select
              name="district"
              label="District"
              options={DISTRICTS}
              valueKey="district"
              getOptionLabel={(o) => o.district ?? ""}
            />
            <Select
              name="commune"
              label="Commune"
              options={COMMUNES}
              valueKey="commune"
              getOptionLabel={(o) => o.commune ?? ""}
            />
            <Input name="fokontany" label="Fokontany" />
            <Input name="phone_1" label="Téléphone 1" />
            <Input name="phone_2" label="Téléphone 2" />
            <Input name="phone_3" label="Téléphone 3" />
            <CustomStack direction={{ md: "row", xs: "column" }}>
              <OSCheckbox
                name="families"
                label="Issue de 3 familles différentes"
              />
              <OSCheckbox name="trainings" label="Avoir suivi les formations" />
              <OSCheckbox name="nursery" label="Avoir un pépinière" />
            </CustomStack>
            <UploadFiles />
          </FormContainer>
        </Form>
      </Formik>
    </Stack>
  );
}

const FormContainer = styled(Container)({
  background: "white",
  borderRadius: 7,
  marginTop: "1rem",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

const FormTitle = styled(Stack)({
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  paddingBottom: "0.4rem",
});

const ActionContainer = styled(Stack)({
  display: "flex",
  flexDirection: "row",
  gap: 10,
});

const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));
