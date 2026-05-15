import { create } from "zustand";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isLoading: false,

  signIn: async (username, password) => {
    set({ isLoading: true });
    try {
      await authService.signIn(username, password);
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (username, email, password, firstName, lastName) => {
    set({ isLoading: true });
    try {
      await authService.signUp(username, email, password, firstName, lastName);
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: () => {
    set({ accessToken: null, user: null });
  },
}));
