export type LutteInvasifItem = {
  fid: number;
  nom: string;
};

export type LutteInvasifStore = {
  lutteInvasif: LutteInvasifItem | null;
  lutteInvasifList: LutteInvasifItem[];
  loading: boolean;
  createLutteInvasif: (
    lutteInvasif: Partial<LutteInvasifItem>
  ) => Promise<LutteInvasifItem>;
  updateLutteInvasif: ({
    id,
    lutteInvasif,
  }: {
    id: number;
    lutteInvasif: Partial<LutteInvasifItem>;
  }) => Promise<LutteInvasifItem>;
  deleteLutteInvasif: (id: number) => Promise<LutteInvasifItem>;
  getLutteInvasif: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<LutteInvasifItem>;
  getLutteInvasifs: (args?: any) => Promise<LutteInvasifItem[]>;
  editLutteInvasif: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
