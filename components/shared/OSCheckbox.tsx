import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useFormikContext } from "formik";

export default function OSCheckbox({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const { setFieldValue, values } = useFormikContext();

  return (
    <FormControlLabel
      label={
        <Typography variant="body2" color="GrayText">
          {label}
        </Typography>
      }
      labelPlacement="end"
      control={
        <Checkbox
          value={(values as any)[name]}
          onChange={(e, c) => setFieldValue(name, c)}
        />
      }
    />
  );
}
