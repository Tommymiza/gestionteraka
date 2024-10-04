import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { SmallGroupGpsStore } from "./type";

const smallGroupGpsStore = create<SmallGroupGpsStore>((set) => ({
  smallGroupGps: null,
  loading: false,
  isEditing: false,
  smallGroupGpsList: [],
  createSmallGroupGps: async (smallGroupGps) => {
    try {
      set({ loading: true });
      delete smallGroupGps.images;
      const response = await axios.post(`/small-group-gps`, smallGroupGps);
      toast.success("Small group created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateSmallGroupGps: async ({ id, smallGroupGps }) => {
    try {
      set({ loading: true });
      delete smallGroupGps.images;
      const response = await axios.patch(
        `/small-group-gps/${id}`,
        smallGroupGps
      );
      set({ isEditing: false, smallGroupGps: null });
      toast.success("Small group updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteSmallGroupGps: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.delete(`/small-group-gps/${id}`);
      toast.success("Small group deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getSmallGroupGps: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/small-group-gps/${id}`, { params });
      set({ smallGroupGps: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getSmallGroupGpss: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/small-group-gps`, { params });
      set({ smallGroupGpsList: response.data });
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
      const response = await axios.get(`/small-group-gps/${id}`);
      set({ smallGroupGps: response.data, isEditing: true });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  cancelEdit: () => set({ isEditing: false, smallGroupGps: null }),
}));

export default smallGroupGpsStore;
