import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { SmallGroupImageStore } from "./type";

const smallGroupImageStore = create<SmallGroupImageStore>((set) => ({
  createSmallGroupImage: async (smallGroupImage) => {
    try {
      const response = await axios.post(`/small-group-image`, smallGroupImage);
      toast.success("Small group image created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
  deleteSmallGroupImage: async (id) => {
    try {
      const response = await axios.delete(`/small-group-image/${id}`);
      toast.success("Small group image deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
}));

export default smallGroupImageStore;
