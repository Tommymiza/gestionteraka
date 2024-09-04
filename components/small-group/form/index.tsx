"use client";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Icons from "@/components/utils/Icons";
import { getCommunes, getDistricts, getRegions } from "@/lib/location";
import authStore from "@/store/auth";
import smallGroupStore from "@/store/small-group";
import { SmallGroupItem } from "@/store/small-group/type";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Container,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { Form, Formik, FormikProps } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  code: Yup.string().required(),
  nom: Yup.string().required(),
  region: Yup.string().required(),
  district: Yup.string().required(),
  commune: Yup.string().required(),
  nom_cluster: Yup.string().nullable(),
  date_inscription: Yup.string().required(),
  lieu_inscription: Yup.string().required(),
  remarque: Yup.string().nullable(),
});

export default function AddFormSmallGroup() {
  const {
    smallGroup,
    createSmallGroup,
    editSmallgroup,
    cancelEdit,
    updateSmallGroup,
    loading,
  } = smallGroupStore();
  const router = useRouter();
  const { idSmallGroup } = useParams();
  const { auth } = authStore();
  const initialValues: Partial<SmallGroupItem> = useMemo(
    () => ({
      code: smallGroup?.code ?? "",
      nom: smallGroup?.nom ?? "",
      region: smallGroup?.region ?? "",
      district: smallGroup?.district ?? "",
      commune: smallGroup?.commune ?? "",
      nom_cluster: smallGroup?.nom_cluster ?? "",
      date_inscription: format(
        new Date(smallGroup?.date_inscription ?? new Date()),
        "yyyy-MM-dd"
      ),
      lieu_inscription: smallGroup?.lieu_inscription ?? "",
      remarque: smallGroup?.remarque ?? "",
    }),
    [smallGroup, auth]
  );

  const handleSubmit = async (
    values: Partial<SmallGroupItem> & { images?: string[] }
  ) => {
    try {
      values.operateur_id = auth?.id;
      values.date_inscription = new Date(
        values.date_inscription!
      ).toISOString();
      if (smallGroup) {
        await updateSmallGroup({ id: smallGroup.id, smallGroup: values });
      } else {
        await createSmallGroup(values);
      }
      router.push("/small-group");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (typeof idSmallGroup === "string") {
      editSmallgroup(+idSmallGroup);
    } else {
      cancelEdit();
    }
    return () => {
      cancelEdit();
    };
  }, [idSmallGroup]);
  return (
    <Stack>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
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
                  onClick={() => router.push("/small-group")}
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
              <CustomStack
                direction={{ xs: "column", sm: "row" }}
                width={"100%"}
                gap={2}
              >
                <Stack direction="column" gap={2} width={"100%"}>
                  <Input name="code" label="Code du petit groupe" fullWidth />
                  <Input name="nom" label="Nom du petit groupe" fullWidth />
                  <Adresse formikProps={formikProps} />
                </Stack>
                <Stack direction="column" gap={2} width={"100%"}>
                  <Input name="nom_cluster" label="Nom du cluster" fullWidth />
                  <Input
                    fullWidth
                    name="date_inscription"
                    label="Date d'inscription"
                    type="date"
                  />
                  <Input
                    fullWidth
                    name="lieu_inscription"
                    label="Lieu d'inscription"
                  />
                  <Input fullWidth name="remarque" label="Remarque" />
                </Stack>
              </CustomStack>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}

function Adresse({
  formikProps,
}: {
  formikProps: FormikProps<Partial<SmallGroupItem>>;
}) {
  useEffect(() => {
    formikProps.setFieldValue("district", "");
    formikProps.setFieldValue("commune", "");
  }, [formikProps.values.region]);

  useEffect(() => {
    formikProps.setFieldValue("commune", "");
  }, [formikProps.values.district]);

  return (
    <Stack direction={"column"} gap={2}>
      <Select
        name="region"
        label="Région"
        options={getRegions()}
        valueKey="name"
        getOptionLabel={(o) => o.name ?? ""}
      />
      <Select
        name="district"
        label="District"
        options={
          formikProps.values.region
            ? getDistricts(formikProps.values.region)
            : []
        }
        valueKey="name"
        getOptionLabel={(o) => o.name ?? ""}
      />
      <Select
        name="commune"
        label="Commune"
        options={
          formikProps.values.region && formikProps.values.district
            ? getCommunes(
                formikProps.values.region,
                formikProps.values.district
              )
            : []
        }
        valueKey="name"
        getOptionLabel={(o) => o.name ?? ""}
      />
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
