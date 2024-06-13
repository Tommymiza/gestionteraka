import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { AuthStore } from "./type";

const authStore = create<AuthStore>((set) => ({
  auth: null,
  loading: true,
  login: async (data) => {
    try {
      const response = await axios.post(`/auth/login`, data);
      const token = response.data.token;
      localStorage.setItem("auth", token);
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
  check: async () => {
    try {
      set({ loading: true });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("auth")}`;
      const response = await axios.get(`/auth/me`);
      const user = response.data;
      set({ auth: user });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      await axios.post(`/auth/logout`);
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("auth");
      set({ auth: null });
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
}));

export default authStore;
