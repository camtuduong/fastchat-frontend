import { login } from "@/features/auth/api/login";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }: Props) => login(username, password),
    onSuccess: (response) => {
      useAuthStore.setState({
        accessToken: response.accessToken,
      });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Login successful");
    },
  });
};
