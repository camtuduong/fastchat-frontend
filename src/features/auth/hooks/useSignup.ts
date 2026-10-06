import { signup } from "@/features/auth/api/signup";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type Props = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const useSignUp = () => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async ({
      username,
      email,
      password,
      firstName,
      lastName,
    }: Props) => {
      return await signup(username, email, password, firstName, lastName);
    },
    onSuccess: () => {
      toast.success(t("signup.successMessage"));
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : undefined;

      toast.error(message ?? t("signup.errorMessage"));
    },
  });
};
