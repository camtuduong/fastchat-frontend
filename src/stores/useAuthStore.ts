import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,
      displayName: null,
      isLoading: false,

      clearAuth: () =>
        set({ accessToken: null, userId: null, displayName: null }),
      setUser: (userId, displayName) => set({ userId, displayName }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        userId: state.userId,
        displayName: state.displayName,
      }),
    },
  ),
);
