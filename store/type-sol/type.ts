export type SolTypeItem = {
  id: number;
  nom: string;
};

export type SolTypeStore = {
  solType: SolTypeItem | null;
  solTypeList: SolTypeItem[];
  loading: boolean;
  createSolType: (solType: Partial<SolTypeItem>) => Promise<SolTypeItem>;
  updateSolType: ({
    id,
    solType,
  }: {
    id: number;
    solType: Partial<SolTypeItem>;
  }) => Promise<SolTypeItem>;
  deleteSolType: (id: number) => Promise<SolTypeItem>;
  getSolType: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<SolTypeItem>;
  getSolTypes: (args?: any) => Promise<SolTypeItem[]>;
  editSolType: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
