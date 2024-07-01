import { MemberItem } from "../member/type";
import { SmallGroupImageItem } from "../small-group-image/type";
import { UserItem } from "../user/type";

export type SmallGroupItem = {
  id: number;
  relais_id: number;
  personal_id?: number;
  name: string;
  slogan: string;
  region: string;
  district: string;
  commune: string;
  fokontany: string;
  phone1?: string;
  phone2?: string;
  phone3?: string;
  photo: string;
  families: boolean;
  trainings: boolean;
  nursery: boolean;
  relais: UserItem;
  members: MemberItem[];
  smallGroupImages: SmallGroupImageItem[];
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
