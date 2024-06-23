import Icons from "@/components/utils/Icons";
import { Stack, Typography } from "@mui/material";
import { Upload } from "antd";
import { type RcFile } from "antd/lib/upload";
import { useField, useFormikContext } from "formik";

export default function UploadImages({ name }: { name: string }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const toBase64 = (file: RcFile | string | undefined) =>
    new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      if (typeof file === "string") return resolve(file);
      if (!file) return reject("No file");
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  return (
    <Upload
      multiple
      accept="image/*"
      listType="picture-card"
      fileList={
        field.value?.map((file: string, index: number) => ({
          uid: index,
          name: file,
          status: "done",
          url: file.includes("data:image")
            ? file
            : process.env.NEXT_PUBLIC_API + "/file/" + file,
        })) ?? []
      }
      name={name}
      onChange={(e) => {
        const files = e.fileList.map((file) => {
          if (file.originFileObj) return file.originFileObj;
          return file.url;
        });
        Promise.all(files.map((file) => toBase64(file))).then((values) => {
          setFieldValue(
            name,
            values.map((value) => {
              if (
                typeof value === "string" &&
                value.includes(process.env.NEXT_PUBLIC_API! + "/file/")
              ) {
                return value.replace(
                  process.env.NEXT_PUBLIC_API! + "/file/",
                  ""
                );
              } else {
                return value;
              }
            })
          );
        });
      }}
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
