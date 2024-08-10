import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { InvasifStore } from "./type";

const invasifStore = create<InvasifStore>((set) => ({
  invasif: null,
  loading: false,
  invasifList: [],
  createInvasif: async (invasif) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/configuration/invasif`, invasif);
      toast.success("Invasif created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateInvasif: async ({ id, invasif }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(
        `/configuration/invasif/${id}`,
        invasif
      );
      set({ invasif: null });
      toast.success("Invasif updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteInvasif: async (id) => {
    try {
      const response = await axios.delete(`/configuration/invasif/${id}`);
      toast.success("Invasif deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getInvasif: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/invasif/${id}`, {
        params,
      });
      set({ invasif: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getInvasifs: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/configuration/invasif`, { params });
      set({ invasifList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editInvasif: async (id) => {
    try {
      const response = await axios.get(`/configuration/invasif/${id}`);
      set({ invasif: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ invasif: null }),
}));

export default invasifStore;
