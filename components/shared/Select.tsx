import { Autocomplete } from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import Input from "./Input";

export default function Select({
  options,
  getOptionLabel,
  name,
  valueKey,
  label,
}: {
  options: any[];
  getOptionLabel: (option: any) => string;
  name: string;
  valueKey: string;
  label: string;
}) {
  const { setFieldValue, values } = useFormikContext();
  const [field, setField] = useState<any>("");
  useEffect(() => {
    setField((values as any)[name]);
  }, [(values as any)[name]]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={getOptionLabel}
      style={{ width: "100%" }}
      value={options.find((option) => option[valueKey] === field) || ""}
      onChange={(e, value) => {
        if (value) {
          setFieldValue(name, value[valueKey]);
        } else {
          setFieldValue(name, "");
        }
      }}
      renderInput={(params) => (
        <Input {...params} name={name} label={label} variant="outlined" />
      )}
    />
  );
}
