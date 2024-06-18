import {
  Avatar,
  FormLabel,
  Input,
  Stack,
  type InputProps,
} from "@mui/material";
import { useField, useFormikContext } from "formik";

export default function AvatarUpload({
  name,
  ...otherProps
}: Partial<InputProps> & { name: string }) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return setFieldValue(name, null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setFieldValue(name, e.target?.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <Stack direction={"column"} alignItems={"center"}>
      <FormLabel htmlFor={name}>
        <Avatar
          sx={{
            width: 200,
            height: 200,
            borderWidth: 2,
            borderStyle: "solid",
          }}
          src={
            field.value
              ? field.value.startsWith("data:image")
                ? field.value
                : `${process.env.NEXT_PUBLIC_API}/file/${field.value}`
              : undefined
          }
        ></Avatar>
      </FormLabel>
      <Input
        type="file"
        id={name}
        name={name}
        onChange={handleChange}
        {...otherProps}
      />
    </Stack>
  );
}
