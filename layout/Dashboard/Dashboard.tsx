"use client";
import { Container, Stack } from "@mui/material";
import Navbar from "../Navbar/Navbar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
      <Navbar />
      <Container maxWidth={false}>{children}</Container>
    </Stack>
  );
}
