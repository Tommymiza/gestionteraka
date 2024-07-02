import { SmallGroupItem } from "../small-group/type";

export type MemberItem = {
  id: number;
  name: string;
  photo?: string | null;
  cin?: string;
  phone?: string;
  village?: string;
  age: number;
  job?: string;
  school?: string;
  known_by?: string;
  motivation?: string;
  date_inscription?: string;
  lieu_inscription?: string;
  sexe: "M" | "F";
  smallGroup_id: number;
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
