import { create } from "zustand";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";
import { toast } from "sonner";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isLoading: false,

  signIn: async (username, password) => {
    set({ isLoading: true });
    try {
      await authService.signIn(username, password);
      toast.success("Signed in successfully!");
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
      toast.success("Signed up successfully!");
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
