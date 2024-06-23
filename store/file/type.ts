export type FileStore = {
  createFile: (file: string | File | null) => Promise<string | null>;
};
