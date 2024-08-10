"use client";
import Icons from "@/components/utils/Icons";
import memberStore from "@/store/member";
import { MemberItem } from "@/store/member/type";
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
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  code_pg: Yup.string().required(),
  nom_membre_teraka: Yup.string().required(),
  prenom_membre_teraka: Yup.string().required(),
  date_inscription: Yup.date().required(), // Consider using Yup.date() if it's an actual date
  lieu_inscription: Yup.string().required(),
  commune: Yup.string().required(),
  fokontany: Yup.string().required(),
  village: Yup.string().required(),
  age: Yup.number().notRequired(),
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
  types_arbres: Yup.string().notRequired(),
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
  const initialValues: Partial<MemberItem> = useMemo(
    () => ({
      code_pg: member?.code_pg ?? "",
      nom_membre_teraka: member?.nom_membre_teraka ?? "",
      prenom_membre_teraka: member?.prenom_membre_teraka ?? "",
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
      types_arbres: member?.types_arbres ?? "",
    }),
    [member]
  );

  const handleSubmit = async (values: Partial<UserItem>) => {
    try {
      if (member) {
        await updateMember({ id: member.fid, member: values });
      } else {
        await createMember(values);
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
          <FormContainer maxWidth="lg"></FormContainer>
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
