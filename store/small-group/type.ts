export type SmallGroupItem = {
  id: number;
  champion_id: number;
  personal_id?: number;
  name: string;
  slogan: string;
  region: string;
  district: string;
  commune: string;
  fokontany: string;
  phone_1: string;
  phone_2?: string;
  phone_3?: string;
  photo: string;
  families: boolean;
  trainings: boolean;
  nursery: boolean;
};

export type SmallGroupStore = {
  smallGroup: SmallGroupItem | null;
  smallGroupList: SmallGroupItem[];
  loading: boolean;
  isEditing: boolean;
  createSmallGroup: (
    smallGroup: Partial<SmallGroupItem>
  ) => Promise<SmallGroupItem>;
  updateSmallGroup: ({
    id,
    smallGroup,
  }: {
    id: number;
    smallGroup: Partial<SmallGroupItem>;
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
