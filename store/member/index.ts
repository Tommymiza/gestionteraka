import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import type { MemberStore } from "./type";

const memberStore = create<MemberStore>((set) => ({
  member: null,
  loading: false,
  memberList: [],
  createMember: async (member) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/member`, member);
      toast.success("Member created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateMember: async ({ id, member }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/member/${id}`, member);
      set({ member: null });
      toast.success("Member updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteMember: async (id) => {
    try {
      const response = await axios.delete(`/member/${id}`);
      toast.success("Member deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getMember: async ({ id, args = {} }) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/member/${id}`, { params });
      set({ member: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getMembers: async (args = {}) => {
    try {
      set({ loading: true });
      const params = {
        args: JSON.stringify(args),
      };
      const response = await axios.get(`/member`, { params });
      set({ memberList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editMember: async (id) => {
    try {
      const response = await axios.get(`/member/${id}`);
      set({ member: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ member: null }),
}));

export default memberStore;
