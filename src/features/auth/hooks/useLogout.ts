import { logout } from "@/features/auth/api/logout";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      useAuthStore.getState().clearAuth();
      queryClient.removeQueries({ queryKey: ["me"] });
    },
    onError: () => {
      toast.error("Failed to log out. Please try again.");
    },
  });
};
