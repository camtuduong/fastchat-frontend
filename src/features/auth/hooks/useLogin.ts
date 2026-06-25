import { login } from "@/features/auth/api/login";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  username: string;
  password: string;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: Props) => login(username, password),
    onSuccess: (response) => {
      useAuthStore.setState({
        accessToken: response.accessToken,
      });
      toast.success("Login successful");
    },
  });
};
