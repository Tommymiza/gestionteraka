export type MemberItem = {
  id: number;
  name: string;
  email: string;
  photo?: string | null;
  cin: string;
  phone: string;
  address: string;
  sexe: "M" | "F";
  role: "ADMIN" | "PERSONAL" | "RELAIS" | "QUANTIFIER";
  is_active: boolean;
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
