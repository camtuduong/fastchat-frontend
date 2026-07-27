import type { UserState } from "@/types/store";
import { create } from "zustand/react";

export const useUserStore = create<UserState>((set) => ({
  users: {},

  addUsers: (users) => {
    set((state) => ({
      users: {
        ...state.users,
        ...Object.fromEntries(users.map((user) => [user.userId, user])),
      },
    }));
  },

  updateUser: (user) => {
    set((state) => ({
      users: {
        ...state.users,
        [user.userId]: {
          ...state.users[user.userId],
          ...user,
        },
      },
    }));
  },

  removeUser: (id) => {
    set((state) => {
      const newUsers = { ...state.users };
      delete newUsers[id];
      return { users: newUsers };
    });
  },

  clear: () => {
    set({ users: {} });
  },
}));
