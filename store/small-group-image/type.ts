export type SmallGroupImageItem = {
  id: number;
  path: string;
  small_group_id: number;
};

export type SmallGroupImageStore = {
  createSmallGroupImage: (
    smallGroupImage: Partial<SmallGroupImageItem>
  ) => Promise<SmallGroupImageItem>;
  deleteSmallGroupImage: (id: number) => Promise<SmallGroupImageItem>;
};
