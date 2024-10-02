import { SmallGroupItem } from "../small-group/type";

export type MemberItem = {
  id: number;
  code_pg: string;
  nom_membre: string;
  prenom_membre: string;
  nom_prenom_membre: string;
  date_inscription: string;
  lieu_inscription: string;
  commune: string;
  fokontany: string;
  village?: string;
  age?: number;
  genre: "H" | "F";
  statut_marital: "CELIBATAIRE" | "MARIE" | "DIVORCE" | "VEUF";
  nombre_d_enfant: number;
  conjoint_membre: boolean;
  nom_conjoint?: string;
  cin?: string;
  profession?: string;
  tel?: string;
  niveau_education?: string;
  connaissance_teraka?: string;
  surface_estimee?: number;
  nombre_arbres_prevue?: number;
  parcelle_proche_riviere: boolean;
  type_arbres?: string;
  etat_actuel_terrain?: string;
  approvisionnement_pepiniere?: string;
  motivation_programme?: string;
  uuid_operateur: string;
  remarque?: string;
  smallGroup: SmallGroupItem;
};

export type MemberStore = {
  member: MemberItem | null;
  memberList: MemberItem[];
  loading: boolean;
  createMember: (member: Partial<MemberItem>) => Promise<MemberItem>;
  updateMember: ({
    id,
    member,
  }: {
    id: number;
    member: Partial<MemberItem>;
  }) => Promise<MemberItem>;
  deleteMember: (id: number) => Promise<MemberItem>;
  getMember: ({ id, args }: { id: number; args?: any }) => Promise<MemberItem>;
  getMembers: (args?: any) => Promise<MemberItem[]>;
  editMember: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
