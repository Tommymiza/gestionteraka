import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Typography,
} from "@mui/material";
import { useField } from "formik";

export default function RadioGroupCustom({
  name,
  options,
  label,
  ...otherProps
}: Partial<RadioGroupProps> & {
  name: string;
  options: { value: string; label: string }[];
  label: string;
}) {
  const [field, meta] = useField(name);
  const configTextField = {
    ...otherProps,
    ...field,
  };

  return (
    <FormControl>
      <FormLabel id="custom-radion">
        <Typography variant="body1">{label}</Typography>
      </FormLabel>
      <RadioGroup row aria-labelledby="custom-radion" {...configTextField}>
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio />}
            label={option.label}
            key={option.value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
