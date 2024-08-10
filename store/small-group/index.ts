import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { SmallGroupStore } from "./type";

const smallGroupStore = create<SmallGroupStore>((set) => ({
  smallGroup: null,
  loading: false,
  isEditing: false,
  smallGroupList: [],
  createSmallGroup: async (smallGroup) => {
    try {
      set({ loading: true });
      delete smallGroup.images;
      const response = await axios.post(`/small-group`, smallGroup);
      toast.success("Small group created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateSmallGroup: async ({ id, smallGroup }) => {
    try {
      set({ loading: true });
      delete smallGroup.images;
      const response = await axios.patch(`/small-group/${id}`, smallGroup);
      set({ isEditing: false, smallGroup: null });
      toast.success("Small group updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteSmallGroup: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.delete(`/small-group/${id}`);
      toast.success("Small group deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getSmallGroup: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/small-group/${id}`, { params });
      set({ smallGroup: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getSmallGroups: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/small-group`, { params });
      set({ smallGroupList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editSmallgroup: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.get(`/small-group/${id}`);
      set({ smallGroup: response.data, isEditing: true });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  cancelEdit: () => set({ isEditing: false, smallGroup: null }),
}));

export default smallGroupStore;
