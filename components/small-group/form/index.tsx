"use client";
import Input from "@/components/shared/Input";
import OSCheckbox from "@/components/shared/OSCheckbox";
import Select from "@/components/shared/Select";
import Icons from "@/components/utils/Icons";
import { COMMUNES, DISTRICTS, REGIONS } from "@/lib/location";
import fileStore from "@/store/file";
import smallGroupStore from "@/store/small-group";
import smallGroupImageStore from "@/store/small-group-image";
import { SmallGroupItem } from "@/store/small-group/type";
import userStore from "@/store/user";
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
import { useEffect, useMemo } from "react";
import * as Yup from "yup";
import UploadImages from "./UploadImages";

const validationSchema = Yup.object({
  name: Yup.string().required(),
  region: Yup.string().required(),
  district: Yup.string().required(),
  commune: Yup.string().required(),
  fokontany: Yup.string().required(),
  phone1: Yup.string().min(10).max(10).required(),
  champion_id: Yup.number().required(),
  phone2: Yup.string().min(10).max(10),
  phone3: Yup.string().min(10).max(10),
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
  const { createSmallGroupImage, deleteSmallGroupImage } =
    smallGroupImageStore();
  const router = useRouter();
  const { idSmallGroup } = useParams();
  const { getUsers, userList } = userStore();
  const initialValues: Partial<SmallGroupItem> & {
    images: string[];
  } = useMemo(
    () => ({
      name: smallGroup?.name ?? "",
      slogan: smallGroup?.slogan ?? "",
      region: smallGroup?.region ?? "",
      district: smallGroup?.district ?? "",
      commune: smallGroup?.commune ?? "",
      fokontany: smallGroup?.fokontany ?? "",
      phone1: smallGroup?.phone1 ?? "",
      phone2: smallGroup?.phone2 ?? "",
      phone3: smallGroup?.phone3 ?? "",
      families: smallGroup?.families ?? false,
      trainings: smallGroup?.trainings ?? false,
      nursery: smallGroup?.nursery ?? false,
      relais_id: smallGroup?.relais_id ?? undefined,
      images: smallGroup?.smallGroupImages.map((s) => s.path) ?? [],
    }),
    [smallGroup]
  );

  const handleSubmit = async (
    values: Partial<SmallGroupItem> & { images?: string[] }
  ) => {
    try {
      if (smallGroup) {
        let oldImages = smallGroup.smallGroupImages.filter(
          (i) => !values.images?.includes(i.path)
        );
        let newImages = values.images!.filter(
          (i) => !smallGroup.smallGroupImages.map((i) => i.path).includes(i)
        );
        let paths = await Promise.all(
          newImages.map((image) => createFile(image))
        );
        await Promise.all(
          oldImages.map((image) => deleteSmallGroupImage(image?.id))
        );
        await Promise.all(
          paths.map(
            (path) =>
              path &&
              createSmallGroupImage({ path, small_group_id: smallGroup.id })
          )
        );
        await updateSmallGroup({ id: smallGroup.id, smallGroup: values });
      } else {
        let paths = await Promise.all(
          values.images!.map((image) => createFile(image))
        );
        const newSmallgroup = await createSmallGroup({ ...values });
        await Promise.all(
          paths.map(
            (path) =>
              path &&
              createSmallGroupImage({ path, small_group_id: newSmallgroup.id })
          )
        );
      }
      router.push("/small-group");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
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
            <Select
              name="relais_id"
              label="Relais local"
              options={userList.filter((u) => u.role === "RELAIS")}
              valueKey="id"
              getOptionLabel={(o) => o?.name ?? ""}
            />
            <Input name="phone1" label="Téléphone 1" />
            <Input name="phone2" label="Téléphone 2" />
            <Input name="phone3" label="Téléphone 3" />
            <CustomStack direction={{ md: "row", xs: "column" }}>
              <OSCheckbox
                name="families"
                label="Issue de 3 familles différentes"
              />
              <OSCheckbox name="trainings" label="Avoir suivi les formations" />
              <OSCheckbox name="nursery" label="Avoir un pépinière" />
            </CustomStack>
            <UploadImages name="images" />
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
