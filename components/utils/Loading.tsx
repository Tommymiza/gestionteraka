import { CircularProgress, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"row"}
    >
      <CircularProgress size={50} />
    </Stack>
  );
}
