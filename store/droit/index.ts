import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { DroitStore } from "./type";

const droitStore = create<DroitStore>((set) => ({
  droit: null,
  loading: false,
  droitList: [],
  createDroit: async (droit) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/droit`, droit);
      toast.success("Droit created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateDroit: async ({ id, droit }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/droit/${id}`, droit);
      set({ droit: null });
      toast.success("Droit updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteDroit: async (id) => {
    try {
      const response = await axios.delete(`/droit/${id}`);
      toast.success("Droit deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getDroit: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/droit/${id}`, {
        params,
      });
      set({ droit: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getDroits: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/droit`, { params });
      set({ droitList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editDroit: async (id) => {
    try {
      const response = await axios.get(`/droit/${id}`);
      set({ droit: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ droit: null }),
}));

export default droitStore;
