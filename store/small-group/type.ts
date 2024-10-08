import { MemberItem } from "../member/type";
import { UserItem } from "../user/type";

export type SmallGroupItem = {
  id: number;
  code: string;
  nom: string;
  region: string;
  district: string;
  commune: string;
  nom_cluster?: string;
  date_inscription: string;
  lieu_inscription: string;
  remarque?: string;
  operateur_id: number;
  verificateur_id?: number;
  operateur: UserItem;
  verificateur?: UserItem;
  members: MemberItem[];
  smallGroupGps: any;
  _count?: {
    members: number;
  };
};

export type SmallGroupStore = {
  smallGroup: SmallGroupItem | null;
  smallGroupList: SmallGroupItem[];
  loading: boolean;
  isEditing: boolean;
  createSmallGroup: (
    smallGroup: Partial<SmallGroupItem> & { images?: string[] }
  ) => Promise<SmallGroupItem>;
  updateSmallGroup: ({
    id,
    smallGroup,
  }: {
    id: number;
    smallGroup: Partial<SmallGroupItem> & { images?: string[] };
  }) => Promise<SmallGroupItem>;
  deleteSmallGroup: (id: number) => Promise<SmallGroupItem>;
  getSmallGroup: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<SmallGroupItem>;
  getSmallGroups: (args?: any) => Promise<SmallGroupItem[]>;
  editSmallgroup: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
