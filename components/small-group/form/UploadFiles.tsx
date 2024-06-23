import Icons from "@/components/utils/Icons";
import { Stack, Typography } from "@mui/material";
import { Upload } from "antd";
import { useFormikContext } from "formik";

export default function UploadFiles() {
  const { setFieldValue } = useFormikContext();
  return (
    <Upload
      multiple
      accept="image/*"
      listType="picture-card"
      name="photo"
      onChange={(e) => {}}
    >
      <Stack direction={"column"} alignItems={"center"}>
        <Icons name="Images" />
        <Typography variant="body2" color="GrayText">
          Importer
        </Typography>
      </Stack>
    </Upload>
  );
}
