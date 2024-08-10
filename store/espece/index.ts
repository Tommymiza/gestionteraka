import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { EspeceStore } from "./type";

const especeStore = create<EspeceStore>((set) => ({
  espece: null,
  loading: false,
  especeList: [],
  createEspece: async (espece) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/configuration/espece`, espece);
      toast.success("Espece created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateEspece: async ({ id, espece }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/configuration/espece/${id}`, espece);
      set({ espece: null });
      toast.success("Espece updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteEspece: async (id) => {
    try {
      const response = await axios.delete(`/configuration/espece/${id}`);
      toast.success("Espece deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getEspece: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/espece/${id}`, {
        params,
      });
      set({ espece: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getEspeces: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/espece`, { params });
      set({ especeList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editEspece: async (id) => {
    try {
      const response = await axios.get(`/configuration/espece/${id}`);
      set({ espece: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ espece: null }),
}));

export default especeStore;
