export type FileStore = {
  createFile: (file: string | null) => Promise<string | null>;
};
