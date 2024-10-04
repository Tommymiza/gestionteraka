export type TreeGpsItem = {
  id: number;
  uuid_arbre_gps: string;
  numero_arbre: number;
  geom: GeoJSON.Point;
};

export type TreeGpsStore = {
  treeGps: TreeGpsItem | null;
  treeGpsList: TreeGpsItem[];
  loading: boolean;
  isEditing: boolean;
  createTreeGps: (
    treeGps: Partial<TreeGpsItem> & { images?: string[] }
  ) => Promise<TreeGpsItem>;
  updateTreeGps: ({
    id,
    treeGps,
  }: {
    id: number;
    treeGps: Partial<TreeGpsItem> & { images?: string[] };
  }) => Promise<TreeGpsItem>;
  deleteTreeGps: (id: number) => Promise<TreeGpsItem>;
  getTreeGps: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<TreeGpsItem>;
  getTreeGpss: (args?: any) => Promise<TreeGpsItem[]>;
  editSmallgroup: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
