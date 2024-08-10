export type InvasifItem = {
  fid: number;
  nom: string;
};

export type InvasifStore = {
  invasif: InvasifItem | null;
  invasifList: InvasifItem[];
  loading: boolean;
  createInvasif: (invasif: Partial<InvasifItem>) => Promise<InvasifItem>;
  updateInvasif: ({
    id,
    invasif,
  }: {
    id: number;
    invasif: Partial<InvasifItem>;
  }) => Promise<InvasifItem>;
  deleteInvasif: (id: number) => Promise<InvasifItem>;
  getInvasif: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<InvasifItem>;
  getInvasifs: (args?: any) => Promise<InvasifItem[]>;
  editInvasif: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
