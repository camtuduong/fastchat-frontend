import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,
      displayName: null,
      avatarUrl: null,

      clearAuth: () =>
        set({
          accessToken: null,
          userId: null,
          displayName: null,
          avatarUrl: null,
        }),
      setUser: (userId, displayName, avatarUrl) =>
        set({ userId, displayName, avatarUrl }),
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
