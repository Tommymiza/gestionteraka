import { TextField, type TextFieldProps } from "@mui/material";
import { useField } from "formik";

export default function Input({
  name,
  ...otherProps
}: Partial<TextFieldProps>) {
  const [field, meta] = useField(name!);
  const configTextField = {
    ...otherProps,
    ...field,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
}
