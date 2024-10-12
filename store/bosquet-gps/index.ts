import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { BosquetGpsStore } from "./type";

const bosquetGpsStore = create<BosquetGpsStore>((set) => ({
  bosquetGps: null,
  loading: false,
  isEditing: false,
  bosquetGpsList: [],
  createBosquetGps: async (bosquetGps) => {
    try {
      set({ loading: true });
      delete bosquetGps.images;
      const response = await axios.post(`/bosquet-gps`, bosquetGps);
      toast.success("Small group created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateBosquetGps: async ({ id, bosquetGps }) => {
    try {
      set({ loading: true });
      delete bosquetGps.images;
      const response = await axios.patch(`/bosquet-gps/${id}`, bosquetGps);
      set({ isEditing: false, bosquetGps: null });
      toast.success("Small group updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteBosquetGps: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.delete(`/bosquet-gps/${id}`);
      toast.success("Small group deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getBosquetGps: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/bosquet-gps/${id}`, { params });
      set({ bosquetGps: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getBosquetGpss: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/bosquet-gps`, { params });
      set({ bosquetGpsList: response.data });
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
      const response = await axios.get(`/bosquet-gps/${id}`);
      set({ bosquetGps: response.data, isEditing: true });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  cancelEdit: () => set({ isEditing: false, bosquetGps: null }),
}));

export default bosquetGpsStore;
