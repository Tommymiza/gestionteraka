import { FormControlLabel, Switch, Typography } from "@mui/material";
import { useField } from "formik";

export default function OSSwitch({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const [field] = useField(name);

  return (
    <FormControlLabel
      label={
        <Typography variant="body2" color="GrayText">
          {label}
        </Typography>
      }
      labelPlacement="end"
      onChange={field.onChange}
      name={name}
      control={<Switch checked={field.value} />}
    />
  );
}
