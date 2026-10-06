import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "@/features/auth/api/login-with-google";
import { useAuthStore } from "@/stores/useAuthStore";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

export type Credential = {
  scope: string;
  state?: string;
  code: string;
};
export const useLoginWithGoogle = () => {
  return useMutation({
    mutationFn: ({ credential }: { credential: Credential }) =>
      loginWithGoogle(credential),

    onSuccess: (response) => {
      useAuthStore.setState({
        accessToken: response.accessToken,
      });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Login successful");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
