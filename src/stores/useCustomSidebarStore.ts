import type { CustomSidebarStore, SidebarStatusType } from "@/types/store";
import { create } from "zustand";

export const useCustomSidebarStore = create<CustomSidebarStore>((set) => ({
  open: false,
  status: null,

  setOpen: (open) => set({ open }),
  setStatus: (status: SidebarStatusType) => set({ status }),
  clearStatus: () => set({ status: null }),
}));
