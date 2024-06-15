import Icons from "@/components/utils/Icons";
import getAvatar from "@/lib/avatar";
import { menus } from "@/lib/menu";
import authStore from "@/store/auth";
import {
  Avatar,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { icons } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import PathNavigation from "./PathNavigation";

export default function Navbar() {
  const auth = authStore().auth;
  const logout = authStore().logout;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const profileItems: {
    icon: keyof typeof icons;
    label: string;
    onClick: () => void;
  }[] = useMemo(
    () => [
      {
        icon: "User",
        label: "Profile",
        onClick: () => router.push("/profile"),
      },
      {
        icon: "LogOut",
        label: "Déconnexion",
        onClick: () => logout(),
      },
    ],
    [router]
  );
  return (
    <Stack marginBottom={2}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingY={1}
        paddingX={3}
        sx={{
          backgroundColor: grey[200],
        }}
      >
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <Image
            src={"/assets/logo.png"}
            width={60}
            height={60}
            alt="Logo Teraka"
          />
          <Stack direction={"row"} gap={1}>
            {menus.map((menu) => (
              <LinkItem menu={menu} key={menu.name} />
            ))}
          </Stack>
        </Stack>
        <Stack>
          <Avatar
            src={getAvatar(auth?.email!)}
            sx={{
              backgroundColor: grey[100],
              border: "2px solid",
              borderColor: grey[400],
              cursor: "pointer",
              transition: ".3s",
              ":hover": {
                borderColor: grey[600],
              },
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
          <Menu
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            elevation={0}
            slotProps={{
              paper: {
                sx: {
                  marginTop: 1,
                  boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.1)",
                  width: 200,
                  borderRadius: 2,
                },
              },
            }}
          >
            <Stack paddingX={1}>
              {profileItems.map((item) => (
                <ProfileItem
                  icon={item.icon}
                  label={item.label}
                  onClick={item.onClick}
                  key={item.label}
                />
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
      <Stack paddingY={1} paddingX={3}>
        <PathNavigation />
      </Stack>
      <Divider />
    </Stack>
  );
}

function ProfileItem({
  icon,
  label,
  onClick,
}: {
  icon: keyof typeof icons;
  label: string;
  onClick: () => void;
}) {
  return (
    <MenuItem
      dense
      sx={{
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
      onClick={onClick}
    >
      <Icons name={icon} size={20} strokeWidth={1} />
      <Typography variant="body1">{label}</Typography>
    </MenuItem>
  );
}

function LinkItem({
  menu,
}: {
  menu: {
    name: string;
    path: string;
    icon: string;
  };
}) {
  const path = usePathname();
  return (
    <Link href={menu.path} key={menu.path}>
      <MenuItem
        dense
        sx={{
          color: grey[600],
          backgroundColor:
            menu.path === "/"
              ? path === menu.path
                ? "white"
                : "transparent"
              : path.includes(menu.path)
              ? "white"
              : "transparent",
          padding: "5px 15px",
          borderRadius: 1,
          display: "flex",
          gap: 1,
        }}
      >
        <Icons
          name={menu.icon as keyof typeof icons}
          size={20}
          strokeWidth={2}
        />
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {menu.name}
        </Typography>
      </MenuItem>
    </Link>
  );
}
