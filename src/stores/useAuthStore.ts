import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  isLoading: false,

  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      await authService.signIn(email, password);
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (username, email, password, firstName, lastName) => {
    set({ isLoading: true });
    try {
      await authService.signUp(username, email, password, firstName, lastName);
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: () => {
    set({ accessToken: null, user: null });
  },
}));
