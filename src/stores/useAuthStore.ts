import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      displayName: null,
      isLoading: false,

      clearAuth: () =>
        set({ accessToken: null, user: null, displayName: null }),
      setUser: (user, displayName) => set({ user, displayName }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        displayName: state.displayName,
      }),
    },
  ),
);
