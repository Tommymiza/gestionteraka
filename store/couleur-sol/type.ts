export type SolColorItem = {
  fid: number;
  nom: string;
};

export type SolColorStore = {
  solColor: SolColorItem | null;
  solColorList: SolColorItem[];
  loading: boolean;
  createSolColor: (solColor: Partial<SolColorItem>) => Promise<SolColorItem>;
  updateSolColor: ({
    id,
    solColor,
  }: {
    id: number;
    solColor: Partial<SolColorItem>;
  }) => Promise<SolColorItem>;
  deleteSolColor: (id: number) => Promise<SolColorItem>;
  getSolColor: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<SolColorItem>;
  getSolColors: (args?: any) => Promise<SolColorItem[]>;
  editSolColor: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
