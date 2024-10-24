"use client";
import Input from "@/components/shared/Input";
import Icons from "@/components/utils/Icons";
import axios from "@/lib/axios";
import gazetteStore from "@/store/gazette";
import { GazetteItem } from "@/store/gazette/type";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Container,
  Divider,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required(),
});

export default function AddFormGazette() {
  const {
    gazette,
    cancelEdit,
    createGazette,
    editGazette,
    updateGazette,
    loading,
  } = gazetteStore();
  const router = useRouter();
  const { idGazette } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const initialValues: Partial<GazetteItem> = useMemo(
    () => ({
      title: gazette?.title ?? "",
      date_out: format(new Date(gazette?.date_out ?? new Date()), "yyyy-MM-dd"),
    }),
    [gazette]
  );

  const handleSubmit = async (values: Partial<GazetteItem>) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post("/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const url = response.data.path;
        values.date_out = new Date(values.date_out!).toISOString();
        if (gazette) {
          await updateGazette({
            id: gazette.id,
            gazette: {
              ...values,
              url,
            },
          });
        } else {
          await createGazette({
            ...values,
            url,
          });
        }
        router.push("/gazette");
      } else {
        toast.error("Veuillez ajouter un fichier");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof idGazette === "string") {
      editGazette(+idGazette);
    } else {
      cancelEdit();
    }
    return () => cancelEdit();
  }, [idGazette]);

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
              {gazette ? "Modifier" : "Ajouter"} une gazette
            </Typography>
            <ActionContainer>
              <Button
                variant="text"
                color="primary"
                startIcon={<Icons name="ArrowLeft" />}
                type="button"
                onClick={() => router.push("/gazette")}
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
            <Input name="title" label="Titre" />
            <Input type="date" name="date_out" />
            <TextField
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (
                  e.target.files &&
                  e.target.files?.length > 0 &&
                  e.target.files[0]
                ) {
                  setFile(e.target.files[0]);
                } else {
                  setFile(null);
                }
              }}
            />
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
