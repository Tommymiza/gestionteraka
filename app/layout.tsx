"use client";
import RequireAuth from "@/layout/AuthProvider/RequireAuth";
import { theme } from "@/lib/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Toaster position="top-right" />
            <RequireAuth>{children}</RequireAuth>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
