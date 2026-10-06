import { login } from "@/features/auth/api/login";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type Props = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }: Props) => login(username, password),
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
