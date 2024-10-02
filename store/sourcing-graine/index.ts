import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { SourcingGraineStore } from "./type";

const sourcingGraineStore = create<SourcingGraineStore>((set) => ({
  sourcingGraine: null,
  loading: false,
  sourcingGraineList: [],
  createSourcingGraine: async (sourcingGraine) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/sourcing-graine`, sourcingGraine);
      toast.success("SourcingGraine created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateSourcingGraine: async ({ id, sourcingGraine }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(
        `/sourcing-graine/${id}`,
        sourcingGraine
      );
      set({ sourcingGraine: null });
      toast.success("SourcingGraine updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteSourcingGraine: async (id) => {
    try {
      const response = await axios.delete(`/sourcing-graine/${id}`);
      toast.success("SourcingGraine deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getSourcingGraine: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/sourcing-graine/${id}`, {
        params,
      });
      set({ sourcingGraine: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getSourcingGraines: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/sourcing-graine`, {
        params,
      });
      set({ sourcingGraineList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editSourcingGraine: async (id) => {
    try {
      const response = await axios.get(`/sourcing-graine/${id}`);
      set({ sourcingGraine: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ sourcingGraine: null }),
}));

export default sourcingGraineStore;
