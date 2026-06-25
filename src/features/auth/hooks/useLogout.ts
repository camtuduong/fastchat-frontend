import { logout } from "@/features/auth/api/logout";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      useAuthStore.getState().clearAuth();
    },
    onError: () => {
      toast.error("Failed to log out. Please try again.");
    },
  });
};
