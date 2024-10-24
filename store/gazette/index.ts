import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { GazetteStore } from "./type";

const gazetteStore = create<GazetteStore>((set) => ({
  gazette: null,
  loading: false,
  gazetteList: [],
  createGazette: async (gazette) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/gazette`, gazette);
      toast.success("Gazette created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateGazette: async ({ id, gazette }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/gazette/${id}`, gazette);
      set({ gazette: null });
      toast.success("Gazette updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteGazette: async (id) => {
    try {
      const response = await axios.delete(`/gazette/${id}`);
      toast.success("Gazette deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getGazette: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/gazette/${id}`, { params });
      set({ gazette: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getGazettes: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/gazette`, { params });
      set({ gazetteList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editGazette: async (id) => {
    try {
      const response = await axios.get(`/gazette/${id}`);
      set({ gazette: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ gazette: null }),
}));

export default gazetteStore;
