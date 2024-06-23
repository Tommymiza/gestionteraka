"use client";
import RequireAuth from "@/layout/AuthProvider/RequireAuth";
import { confirmOptions, theme } from "@/lib/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ConfigProvider } from "antd";
import fr_FR from "antd/locale/fr_FR";
import { ConfirmProvider } from "material-ui-confirm";
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
            <ConfigProvider locale={fr_FR}>
              <Toaster position="top-right" />
              <ConfirmProvider defaultOptions={confirmOptions}>
                <RequireAuth>{children}</RequireAuth>
              </ConfirmProvider>
            </ConfigProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
