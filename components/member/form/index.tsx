"use client";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Icons from "@/components/utils/Icons";
import { getAllCommunes } from "@/lib/location";
import authStore from "@/store/auth";
import memberStore from "@/store/member";
import { MemberItem } from "@/store/member/type";
import smallGroupStore from "@/store/small-group";
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
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  code_pg: Yup.string().required(),
  nom_membre: Yup.string().required(),
  prenom_membre: Yup.string().required(),
  date_inscription: Yup.date().required(), // Consider using Yup.date() if it's an actual date
  lieu_inscription: Yup.string().required(),
  commune: Yup.string().required(),
  fokontany: Yup.string().required(),
  village: Yup.string().required(),
  age: Yup.number().min(10, "Age minimum est de 10").notRequired(),
  genre: Yup.mixed<"H" | "F">().oneOf(["H", "F"]).required(),
  statut_marital: Yup.mixed<"CELIBATAIRE" | "MARIE" | "DIVORCE" | "VEUF">()
    .oneOf(["CELIBATAIRE", "MARIE", "DIVORCE", "VEUF"])
    .required(),
  nombre_d_enfant: Yup.number().required(),
  conjoint_membre: Yup.boolean().required(),
  nom_conjoint: Yup.string().notRequired(),
  cin: Yup.string().notRequired(),
  profession: Yup.string().notRequired(),
  tel: Yup.string().notRequired(),
  niveau_education: Yup.string().notRequired(),
  connaissance_teraka: Yup.string().notRequired(),
  surface_estimee: Yup.number().notRequired(),
  nombre_arbres_prevue: Yup.number().notRequired(),
  parcelle_proche_riviere: Yup.boolean().required(),
  type_arbres: Yup.string().notRequired(),
  etat_actuel_terrain: Yup.string().notRequired(),
  approvisionnement_pepiniere: Yup.string().notRequired(),
  motivation_programme: Yup.string().notRequired(),
  remarque: Yup.string().notRequired(),
});

export default function AddFormMember() {
  const {
    member,
    cancelEdit,
    createMember,
    editMember,
    updateMember,
    loading,
  } = memberStore();
  const router = useRouter();
  const { idMember } = useParams();
  const { getSmallGroups, smallGroupList } = smallGroupStore();
  const { auth } = authStore();
  const initialValues: Partial<MemberItem> = useMemo(
    () => ({
      code_pg: member?.code_pg ?? "",
      nom_membre: member?.nom_membre ?? "",
      prenom_membre: member?.prenom_membre ?? "",
      date_inscription: format(
        new Date(member?.date_inscription ?? new Date()),
        "yyyy-MM-dd"
      ),
      lieu_inscription: member?.lieu_inscription ?? "",
      commune: member?.commune ?? "",
      fokontany: member?.fokontany ?? "",
      village: member?.village ?? "",
      age: member?.age ?? 0,
      genre: member?.genre ?? "H",
      approvisionnement_pepiniere: member?.approvisionnement_pepiniere ?? "",
      cin: member?.cin ?? "",
      conjoint_membre: member?.conjoint_membre ?? false,
      connaissance_teraka: member?.connaissance_teraka ?? "",
      etat_actuel_terrain: member?.etat_actuel_terrain ?? "",
      motivation_programme: member?.motivation_programme ?? "",
      niveau_education: member?.niveau_education ?? "",
      nombre_arbres_prevue: member?.nombre_arbres_prevue ?? 0,
      nombre_d_enfant: member?.nombre_d_enfant ?? 0,
      parcelle_proche_riviere: member?.parcelle_proche_riviere ?? false,
      profession: member?.profession ?? "",
      remarque: member?.remarque ?? "",
      nom_conjoint: member?.nom_conjoint ?? "",
      statut_marital: member?.statut_marital ?? "CELIBATAIRE",
      surface_estimee: member?.surface_estimee ?? 0,
      tel: member?.tel ?? "",
      type_arbres: member?.type_arbres ?? "",
    }),
    [member]
  );

  const handleSubmit = async (values: Partial<MemberItem>) => {
    try {
      values.date_inscription = new Date(
        values.date_inscription!
      ).toISOString();
      if (member) {
        await updateMember({
          id: member.id,
          member: {
            ...values,
            nom_prenom_membre: `${values.nom_membre} ${values.prenom_membre}`,
            uuid_operateur: auth!.uuid_user,
          },
        });
      } else {
        await createMember({
          ...values,
          nom_prenom_membre: `${values.nom_membre} ${values.prenom_membre}`,
          uuid_operateur: auth!.uuid_user,
        });
      }
      router.push("/member");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (typeof idMember === "string") {
      editMember(+idMember);
    } else {
      cancelEdit();
    }
    getSmallGroups();
    return () => cancelEdit();
  }, [idMember]);
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
              {member ? "Modifier" : "Ajouter"} un membre
            </Typography>
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
                <Input name="nom_membre" label="Nom du membre" fullWidth />
                <Input name="age" label="Âge" type="number" fullWidth />
                <Input
                  fullWidth
                  name="date_inscription"
                  label="Date d'inscription"
                  type="date"
                />
                <Select
                  getOptionLabel={(option) => option?.label ?? ""}
                  valueKey="value"
                  name="commune"
                  label="Commune"
                  options={getAllCommunes().map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
                />
                <Input name="village" label="Village" fullWidth />
                <Select
                  getOptionLabel={(option) => option.label}
                  valueKey="value"
                  name="genre"
                  label="Genre"
                  options={[
                    { label: "Homme", value: "H" },
                    { label: "Femme", value: "F" },
                  ]}
                />
                <Input name="tel" label="Téléphone" fullWidth />
                <Input name="profession" label="Profession" fullWidth />
                <Input
                  fullWidth
                  name="nombre_d_enfant"
                  label="Nombre d'enfant"
                  type="number"
                />
                <Select
                  getOptionLabel={(option) => option.label}
                  valueKey="value"
                  name="parcelle_proche_riviere"
                  label="Parcelle proche rivière"
                  options={[
                    { label: "Oui", value: true },
                    { label: "Non", value: false },
                  ]}
                />
                <Input
                  fullWidth
                  name="motivation_programme"
                  label="Motivation programme"
                />
                <Input
                  fullWidth
                  name="etat_actuel_terrain"
                  label="État actuel terrain"
                />
                <Input
                  fullWidth
                  name="surface_estimee"
                  label="Surface estimée"
                  type="number"
                />
              </Stack>
              <Stack direction="column" gap={2} width={"100%"}>
                <Input
                  name="prenom_membre"
                  label="Prénom du membre"
                  fullWidth
                />
                <Select
                  getOptionLabel={(option) => option?.label ?? ""}
                  valueKey="value"
                  name="code_pg"
                  label="Code PG"
                  options={smallGroupList.map((item) => ({
                    label: item.nom,
                    value: item.code,
                  }))}
                />

                <Input
                  fullWidth
                  name="lieu_inscription"
                  label="Lieu d'inscription"
                />
                <Input name="fokontany" label="Fokontany" fullWidth />
                <Input name="cin" label="CIN" fullWidth />
                <Select
                  getOptionLabel={(option) => option.label}
                  valueKey="value"
                  name="statut_marital"
                  label="Statut marital"
                  options={[
                    { label: "Célibataire", value: "CELIBATAIRE" },
                    { label: "Marié", value: "MARIE" },
                    { label: "Divorcé", value: "DIVORCE" },
                    { label: "Veuf", value: "VEUF" },
                  ]}
                />
                <Input
                  fullWidth
                  name="connaissance_teraka"
                  label="Connaissance Teraka"
                />
                <Input
                  fullWidth
                  name="niveau_education"
                  label="Niveau d'éducation"
                />
                <Select
                  getOptionLabel={(option) => option.label}
                  valueKey="value"
                  name="conjoint_membre"
                  label="Conjoint membre"
                  options={[
                    { label: "Oui", value: true },
                    { label: "Non", value: false },
                  ]}
                />
                <Input fullWidth name="nom_conjoint" label="Nom du conjoint" />
                <Input fullWidth name="type_arbres" label="Types d'arbres" />
                <Input
                  fullWidth
                  name="approvisionnement_pepiniere"
                  label="Approvisionnement pépinière"
                />
                <Input
                  fullWidth
                  name="nombre_arbres_prevue"
                  label="Nombre d'arbres prévue"
                  type="number"
                />
              </Stack>
            </CustomStack>
            <Input fullWidth name="remarque" label="Remarque" />
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
