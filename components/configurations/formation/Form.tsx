import Input from "@/components/shared/Input";
import Icons from "@/components/utils/Icons";
import formationStore from "@/store/formation";
import { FormationItem } from "@/store/formation/type";
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
  nom: Yup.string().required(),
});

export default function Formulaire() {
  const {
    formation,
    getFormations,
    createFormation,
    updateFormation,
    cancelEdit,
    loading,
  } = formationStore();

  const initialValues: Partial<FormationItem> = useMemo(
    () => ({
      nom: formation?.nom ?? "",
    }),
    [formation]
  );

  const handleSubmit = async (values: Partial<FormationItem>) => {
    try {
      if (formation) {
        await updateFormation({ id: formation.fid, formation: values });
      } else {
        await createFormation(values);
      }
      cancelEdit();
      getFormations();
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
              <Input label="Nom" name="nom" />
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
