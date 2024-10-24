import { icons } from "lucide-react";
export type MenuProps = {
  name: string;
  path: string;
  icon: keyof typeof icons;
  children?: {
    name: string;
    icon: keyof typeof icons;
    path: string;
  }[];
};
export const menus: MenuProps[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: "PieChart",
  },
  {
    name: "Utilisateur",
    path: "/user",
    icon: "UserRoundCog",
    children: [
      {
        name: "Personnel",
        path: "/user/personnel",
        icon: "UserRoundCog",
      },
      {
        name: "Relais",
        path: "/user/relais",
        icon: "UserRoundCog",
      },
      {
        name: "Quantificateur",
        path: "/user/quantifier",
        icon: "UserRoundCog",
      },
    ],
  },
  {
    name: "Petit groupe",
    path: "/small-group",
    icon: "Boxes",
  },
  {
    name: "Membre",
    path: "/member",
    icon: "UsersRound",
  },
  {
    name: "Gazette",
    path: "/gazette",
    icon: "ScrollText",
  },
  {
    name: "Configurations",
    path: "/configurations",
    icon: "Settings",
    children: [
      {
        name: "Droit d'usage",
        path: "/configurations/droit-usage",
        icon: "Scale",
      },
      {
        name: "Formation",
        path: "/configurations/formation",
        icon: "School",
      },
      {
        name: "Espèce arbre",
        path: "/configurations/espece-arbre",
        icon: "TreeDeciduous",
      },
      {
        name: "Invasif",
        path: "/configurations/invasif",
        icon: "Bug",
      },
      {
        name: "Nuisible",
        path: "/configurations/nuisible",
        icon: "Bug",
      },
      {
        name: "Lutte invasif",
        path: "/configurations/lutte-invasif",
        icon: "BugOff",
      },
      {
        name: "Lutte nuisible",
        path: "/configurations/lutte-nuisible",
        icon: "BugOff",
      },
      {
        name: "Type de sol",
        path: "/configurations/type-sol",
        icon: "Earth",
      },
      {
        name: "Couleur de sol",
        path: "/configurations/couleur-sol",
        icon: "Palette",
      },
      {
        name: "Utilisation de sol",
        path: "/configurations/utilisation-sol",
        icon: "Earth",
      },
      {
        name: "Sourcing graine",
        path: "/configurations/sourcing-graine",
        icon: "Earth",
      },
      {
        name: "Sourcing plant",
        path: "/configurations/sourcing-plant",
        icon: "Earth",
      },
      {
        name: "Topographie",
        path: "/configurations/topographie",
        icon: "Map",
      },
    ],
  },
];
