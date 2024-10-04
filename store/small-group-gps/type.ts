import { SmallGroupItem } from "../small-group/type";

export type SmallGroupGpsItem = {
  id: number;
  uuid_pg_gps: string;
  geom: GeoJSON.Point;
  smallGroup: SmallGroupItem;
};

export type SmallGroupGpsStore = {
  smallGroupGps: SmallGroupGpsItem | null;
  smallGroupGpsList: SmallGroupGpsItem[];
  loading: boolean;
  isEditing: boolean;
  createSmallGroupGps: (
    smallGroupGps: Partial<SmallGroupGpsItem> & { images?: string[] }
  ) => Promise<SmallGroupGpsItem>;
  updateSmallGroupGps: ({
    id,
    smallGroupGps,
  }: {
    id: number;
    smallGroupGps: Partial<SmallGroupGpsItem> & { images?: string[] };
  }) => Promise<SmallGroupGpsItem>;
  deleteSmallGroupGps: (id: number) => Promise<SmallGroupGpsItem>;
  getSmallGroupGps: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<SmallGroupGpsItem>;
  getSmallGroupGpss: (args?: any) => Promise<SmallGroupGpsItem[]>;
  editSmallgroup: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
