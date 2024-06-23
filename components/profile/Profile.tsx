import authStore from "@/store/auth";
import fileStore from "@/store/file";
import userStore from "@/store/user";
import { UserItem } from "@/store/user/type";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  Input as InputMui,
  Stack,
  styled,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Image } from "antd";
import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import * as Yup from "yup";
import Input from "../shared/Input";
import Icons from "../utils/Icons";

export default function Profile() {
  const { auth } = authStore();

  return (
    <Stack marginBottom={2}>
      <FormTitle>
        <Typography variant="h5">Mon profil</Typography>
        <ActionContainer></ActionContainer>
      </FormTitle>
      <Divider />
      <Grid container marginTop={2} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Stack
            direction={"column"}
            alignItems={"center"}
            width={"100%"}
            gap={1}
          >
            <Stack
              width={"40%"}
              sx={{
                borderRadius: "100%",
                aspectRatio: 1,
                minWidth: 250,
                overflow: "hidden",
              }}
            >
              {auth?.photo ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API}/file/${auth.photo}`}
                  style={{ objectFit: "cover" }}
                  width={"100%"}
                  height={"100%"}
                />
              ) : (
                <Avatar sx={{ width: "100%", height: "100%" }} />
              )}
            </Stack>
            <PhotoItem />
            <ModalPassword />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <ItemDetail
              label="Nom"
              valueKey={"name"}
              validation={Yup.object({
                name: Yup.string().required(),
              })}
            />
            <ItemDetail
              label="Email"
              valueKey={"email"}
              validation={Yup.object({
                email: Yup.string().email().required(),
              })}
            />
            <ItemDetail
              label="Téléphone"
              valueKey={"phone"}
              validation={Yup.object({
                phone: Yup.string().max(10).min(10).required(),
              })}
            />
            <ItemDetail
              label="CIN"
              valueKey={"cin"}
              validation={Yup.object({
                cin: Yup.string().max(12).min(12).required(),
              })}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

function PhotoItem() {
  const createFile = fileStore().createFile;
  const updateUser = userStore().updateUser;
  const { auth, getMe } = authStore();
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      try {
        let file = files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (e.target?.result) {
            const path = await createFile(e.target.result as string);
            await updateUser({ id: auth!.id, user: { photo: path } });
            getMe();
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.log(error);
      }
    } else {
      await updateUser({ id: auth!.id, user: { photo: null } });
      getMe();
    }
  };
  return (
    <Stack>
      <FormLabel htmlFor="photo">
        <Stack
          direction={"row"}
          justifyContent={"center"}
          gap={1}
          padding={1}
          sx={{
            color: (theme) => theme.palette.primary.main,
            cursor: "pointer",
          }}
        >
          <Icons name="Camera" size={20} />
          <Typography variant="body1" fontWeight={"bold"}>
            Changer de photo
          </Typography>
        </Stack>
      </FormLabel>
      <InputMui
        sx={{ display: "none" }}
        id="photo"
        type="file"
        name="photo"
        onChange={handleChange}
      />
    </Stack>
  );
}

function ModalPassword() {
  const [open, setOpen] = useState<boolean>(false);
  const updatePassword = authStore().updatePassword;
  const handleSubmit = async (v: { new: string }) => {
    try {
      await updatePassword({ new: v.new });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack>
      <Button
        variant="contained"
        startIcon={<Icons name="LockKeyholeOpen" size={20} />}
        onClick={() => setOpen(true)}
      >
        Changer de mot de passe
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogTitle>
          <Stack
            direction={"row"}
            gap={1}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="body1" fontWeight={"bolder"}>
              Changer mot de passe
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Icons name="X" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ padding: 2 }}>
          <Formik
            initialValues={{
              new: "",
              new2: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
              new: Yup.string().min(8).required(),
              new2: Yup.string().equals([Yup.ref("new")], "Not equals"),
            })}
          >
            <Form>
              <Stack direction={"column"} gap={1} paddingTop={1}>
                <Input
                  name="new"
                  label="Nouveau mot de passe"
                  type="password"
                />
                <Input
                  name="new2"
                  label="Confirmer mot de passe"
                  type="password"
                />
                <Stack>
                  <Button type="submit">Valider</Button>
                </Stack>
              </Stack>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

function ItemDetail({
  label,
  valueKey,
  props,
  validation,
}: {
  label: string;
  valueKey: keyof UserItem;
  props?: TextFieldProps;
  validation?: any;
}) {
  const { auth, getMe } = authStore();
  const { updateUser } = userStore();
  const [edit, setEdit] = useState<boolean>(false);
  const handleSubmit = async (v: Partial<UserItem>) => {
    try {
      await updateUser({ id: auth!.id, user: v });
      await getMe();
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack
      direction={"column"}
      padding={2}
      borderRadius={5}
      sx={{ background: "white", boxShadow: "0 0 25px rgba(0,0,0,0.01)" }}
    >
      <Typography variant="h6" fontWeight={"bold"}>
        {label} :
      </Typography>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        {edit ? (
          <Formik
            initialValues={{
              [valueKey]: auth![valueKey],
            }}
            onSubmit={handleSubmit}
            validationSchema={validation}
          >
            <Form>
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Input name={valueKey} variant="standard" {...props} />
                <IconButton size="large" color="success" type="submit">
                  <Icons name="Check" size={15} />
                </IconButton>
                <IconButton
                  color="error"
                  size="large"
                  onClick={() => setEdit(false)}
                >
                  <Icons name="X" size={15} />
                </IconButton>
              </Stack>
            </Form>
          </Formik>
        ) : (
          <>
            <Typography variant="body1" color={"GrayText"}>
              {auth![valueKey]}
            </Typography>
            <IconButton size="large" onClick={() => setEdit(true)}>
              <Icons name="Pencil" size={15} />
            </IconButton>
          </>
        )}
      </Stack>
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
