"use client";
import AvatarUpload from "@/components/shared/AvatarUpload";
import Input from "@/components/shared/Input";
import RadioGroupCustom from "@/components/shared/RadioGroupCustom";
import Icons from "@/components/utils/Icons";
import fileStore from "@/store/file";
import userStore from "@/store/user";
import { UserItem } from "@/store/user/type";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  nom: Yup.string().required(),
  email: Yup.string().required(),
  annee_naissance: Yup.number().required(),
  role: Yup.string().required(),
});

export default function AddFormQuantifier() {
  const { user, createUser, editUser, cancelEdit, updateUser, loading } =
    userStore();
  const { createFile } = fileStore();
  const router = useRouter();
  const { idUser } = useParams();
  const initialValues: Partial<UserItem> = useMemo(
    () => ({
      nom: user?.nom ?? "",
      email: user?.email ?? "",
      role: user?.role ?? "QUANTIFICATEUR",
      num_tel: user?.num_tel ?? "",
      adresse: user?.adresse ?? "",
      photo: user?.photo ?? null,
      annee_naissance: user?.annee_naissance ?? 1960,
      genre: user?.genre ?? "H",
    }),
    [user]
  );

  const handleSubmit = async (values: Partial<UserItem>) => {
    try {
      let path = await createFile(values.photo || null);
      if (user) {
        await updateUser({ id: user.id, user: { ...values, photo: path } });
      } else {
        await createUser({ ...values, photo: path });
      }
      router.push("/user/quantifier");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (typeof idUser === "string") {
      editUser(+idUser);
    } else {
      cancelEdit();
    }
    return () => cancelEdit();
  }, [idUser]);
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
              {user ? "Modifier" : "Ajouter"} un quantificateur
            </Typography>
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
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack gap={2} alignItems={"center"}>
                  <AvatarUpload name="photo" sx={{ display: "none" }} />
                  <RadioGroupCustom
                    name="genre"
                    label="Genre"
                    options={[
                      { value: "H", label: "Homme" },
                      { value: "F", label: "Femme" },
                    ]}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack gap={2}>
                  <Input fullWidth name="nom" label="Nom d'utilisateur" />
                  <Input fullWidth name="email" label="Username" />
                  <Input fullWidth name="adresse" label="Adresse" />
                  <Input fullWidth name="num_tel" label="Téléphone" />
                  <Input
                    type="number"
                    fullWidth
                    name="annee_naissance"
                    label="Année de naissance"
                  />
                </Stack>
              </Grid>
            </Grid>
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
