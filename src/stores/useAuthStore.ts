import { create } from "zustand";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";
import { toast } from "sonner";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  isLoading: false,

  signIn: async (username, password) => {
    set({ isLoading: true });
    try {
      const response = await authService.signIn(username, password);
      const accessToken = response?.accessToken;

      if (!accessToken) {
        throw new Error("Missing access token in sign in response");
      }

      set({ accessToken });
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

  signOut: async () => {
    set({ isLoading: true });
    try {
      const { accessToken } = get();
      if (accessToken) {
        await authService.signOut(accessToken);
      }
      set({ accessToken: null });
      toast.success("Signed out successfully!");
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
