export type EspeceItem = {
  fid: number;
  genre: string;
  espece: string;
  nom_vernaculaire?: string;
  appellation_locale?: string;
  familles_botanique?: string;
  categorie?: string;
  liste_rouge: boolean;
  liste_verte: boolean;
  liste_blanche: boolean;
};

export type EspeceStore = {
  espece: EspeceItem | null;
  especeList: EspeceItem[];
  loading: boolean;
  createEspece: (espece: Partial<EspeceItem>) => Promise<EspeceItem>;
  updateEspece: ({
    id,
    espece,
  }: {
    id: number;
    espece: Partial<EspeceItem>;
  }) => Promise<EspeceItem>;
  deleteEspece: (id: number) => Promise<EspeceItem>;
  getEspece: ({ id, args }: { id: number; args?: any }) => Promise<EspeceItem>;
  getEspeces: (args?: any) => Promise<EspeceItem[]>;
  editEspece: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
