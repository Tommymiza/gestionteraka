export type FormationItem = {
  fid: number;
  nom: string;
};

export type FormationStore = {
  formation: FormationItem | null;
  formationList: FormationItem[];
  loading: boolean;
  createFormation: (
    formation: Partial<FormationItem>
  ) => Promise<FormationItem>;
  updateFormation: ({
    id,
    formation,
  }: {
    id: number;
    formation: Partial<FormationItem>;
  }) => Promise<FormationItem>;
  deleteFormation: (id: number) => Promise<FormationItem>;
  getFormation: ({
    id,
    args,
  }: {
    id: number;
    args?: any;
  }) => Promise<FormationItem>;
  getFormations: (args?: any) => Promise<FormationItem[]>;
  editFormation: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
