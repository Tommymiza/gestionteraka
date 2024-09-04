import Input from "@/components/shared/Input";
import OSSwitch from "@/components/shared/OSSwitch";
import Icons from "@/components/utils/Icons";
import especeStore from "@/store/espece";
import { EspeceItem } from "@/store/espece/type";
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
import { useMemo } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  genre: Yup.string().nullable(),
  espece: Yup.string().nullable(),
  nom_vernaculaire: Yup.string().nullable(),
  appellation_locale: Yup.string().nullable(),
  categorie: Yup.string().nullable(),
  familles_botanique: Yup.string().nullable(),
  liste_rouge: Yup.boolean().required(),
  liste_verte: Yup.boolean().required(),
  liste_blanche: Yup.boolean().required(),
});

export default function Formulaire() {
  const {
    espece,
    getEspeces,
    createEspece,
    updateEspece,
    cancelEdit,
    loading,
  } = especeStore();

  const initialValues: Partial<EspeceItem> = useMemo(
    () => ({
      genre: espece?.genre ?? "",
      espece: espece?.espece ?? "",
      nom_vernaculaire: espece?.nom_vernaculaire ?? "",
      appellation_locale: espece?.appellation_locale ?? "",
      categorie: espece?.categorie ?? "",
      familles_botanique: espece?.familles_botanique ?? "",
      liste_rouge: espece?.liste_rouge ?? false,
      liste_verte: espece?.liste_verte ?? false,
      liste_blanche: espece?.liste_blanche ?? false,
    }),
    [espece]
  );

  const handleSubmit = async (values: Partial<EspeceItem>) => {
    try {
      if (espece) {
        await updateEspece({ id: espece.id, espece: values });
      } else {
        await createEspece(values);
      }
      cancelEdit();
      getEspeces();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack width={{ md: "50%", sm: "100%" }}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, form) => {
          await handleSubmit(values);
          form.resetForm();
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <Form>
            <FormContainer maxWidth="lg">
              <FormTitle>
                <Typography variant="h5">Formulaire</Typography>
                <Divider />
              </FormTitle>
              <Input label="Genre" name="genre" />
              <Input label="Espece" name="espece" />
              <Input label="Nom vernaculaire" name="nom_vernaculaire" />
              <Input label="Appellation locale" name="appellation_locale" />
              <Input label="Catégorie" name="categorie" />
              <Input label="Familles botanique" name="familles_botanique" />
              <OSSwitch label="Liste rouge" name="liste_rouge" />
              <OSSwitch label="Liste verte" name="liste_verte" />
              <OSSwitch label="Liste blanche" name="liste_blanche" />
              <ActionContainer>
                <Button
                  variant="text"
                  color="error"
                  startIcon={<Icons name="X" />}
                  type="button"
                  onClick={() => cancelEdit()}
                >
                  Annuler
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
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}

const FormContainer = styled(Container)({
  background: "white",
  borderRadius: 7,
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

const FormTitle = styled(Stack)({
  display: "flex",
  flexDirection: "column",
  paddingBottom: "0.4rem",
  gap: 10,
});

const ActionContainer = styled(Stack)({
  display: "flex",
  flexDirection: "row",
  gap: 10,
  alignSelf: "flex-end",
});

const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));
