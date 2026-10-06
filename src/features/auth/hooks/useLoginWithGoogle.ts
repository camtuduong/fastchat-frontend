import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "@/features/auth/api/login-with-google";
import { useAuthStore } from "@/stores/useAuthStore";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export type Credential = {
  scope: string;
  state?: string;
  code: string;
};
export const useLoginWithGoogle = () => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: ({ credential }: { credential: Credential }) =>
      loginWithGoogle(credential),

    onSuccess: (response) => {
      useAuthStore.setState({
        accessToken: response.accessToken,
      });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success(t("login.successMessage"));
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : undefined;

      toast.error(message ?? t("login.errorMessage"));
    },
  });
};
