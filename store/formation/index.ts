import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { FormationStore } from "./type";

const formationStore = create<FormationStore>((set) => ({
  formation: null,
  loading: false,
  formationList: [],
  createFormation: async (formation) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/formation`, formation);
      toast.success("Formation created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateFormation: async ({ id, formation }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/formation/${id}`, formation);
      set({ formation: null });
      toast.success("Formation updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteFormation: async (id) => {
    try {
      const response = await axios.delete(`/formation/${id}`);
      toast.success("Formation deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getFormation: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/formation/${id}`, {
        params,
      });
      set({ formation: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getFormations: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/formation`, { params });
      set({ formationList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editFormation: async (id) => {
    try {
      const response = await axios.get(`/formation/${id}`);
      set({ formation: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ formation: null }),
}));

export default formationStore;
