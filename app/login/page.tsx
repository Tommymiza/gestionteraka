"use client";
import terakaLogin from "@/components/lotties/teraka -login.json";
import Input from "@/components/shared/Input";
import authStore from "@/store/auth";
import { LoginOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import * as Yup from "yup";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login, check, auth } = authStore();
  const router = useRouter();
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await login(values);
      await check();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      router.push("/");
    }
  }, [auth]);

  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      sx={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        padding={4}
        sx={(theme) => ({
          width: "60%",
          backgroundColor: "white",
          borderRadius: 7,
          boxShadow: "var(--box-shadow)",
          [theme.breakpoints.down("sm")]: {
            width: "90%",
          },
        })}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            direction={"row"}
          >
            <Lottie
              loop
              animationData={terakaLogin}
              play
              style={{ width: 400, height: 400 }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required(),
              password: Yup.string().required(),
            })}
          >
            {() => (
              <Form>
                <Stack direction={"column"} gap={2} alignItems={"center"}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Se connecter
                  </Typography>
                  <Input name="email" label="Email" fullWidth />
                  <Input
                    name="password"
                    type="password"
                    label="Mot de passe"
                    fullWidth
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Se souvenir de moi"
                  />
                  <LoadingButton
                    startIcon={<LoginOutlined />}
                    variant="contained"
                    loading={loading}
                    type="submit"
                  >
                    Se connecter
                  </LoadingButton>
                </Stack>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Stack>
  );
}
