import { Stack, styled } from "@mui/material";
import Formulaire from "./Form";
import List from "./List";

export default function ConfigLutteNuisible() {
  return (
    <CustomStack direction={{ md: "row", sm: "column" }} gap={4}>
      <Formulaire />
      <List />
    </CustomStack>
  );
}

const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));
