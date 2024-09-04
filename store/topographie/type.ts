export type TopographieItem = {
  id: number;
  nom: string;
};

export type TopographieStore = {
  topographie: TopographieItem | null;
  topographieList: TopographieItem[];
  loading: boolean;
  createTopographie: (
    topographie: Partial<TopographieItem>
  ) => Promise<TopographieItem>;
  updateTopographie: ({
    id,
    topographie,
  }: {
    id: number;
    topographie: Partial<TopographieItem>;
  }) => Promise<TopographieItem>;
  deleteTopographie: (id: number) => Promise<TopographieItem>;
  getTopographie: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<TopographieItem>;
  getTopographies: (args?: any) => Promise<TopographieItem[]>;
  editTopographie: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
