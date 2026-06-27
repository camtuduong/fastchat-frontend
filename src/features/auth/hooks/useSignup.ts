import { signup } from "@/features/auth/api/signup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: ({ username, email, password, firstName, lastName }: Props) =>
      signup(username, email, password, firstName, lastName),
    onSuccess: () => {
      toast.success("Sign up successful!");
    },
  });
};
