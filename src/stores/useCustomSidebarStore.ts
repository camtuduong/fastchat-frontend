import type { CustomSidebarStore, SidebarStatusType } from "@/types/store";
import { create } from "zustand";

export const useCustomSidebarStore = create<CustomSidebarStore>((set) => ({
  open: false,
  status: "default",

  setOpen: (open) => set({ open }),
  setStatus: (status: SidebarStatusType) => set({ status }),
  clearStatus: () => set({ status: "default" }),
}));
