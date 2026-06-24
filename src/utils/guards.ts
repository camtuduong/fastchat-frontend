import { useAuthStore } from "@/stores/useAuthStore";
import { redirect } from "@tanstack/react-router";

//auth
export const redirectIfAuthenticated = () => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    throw redirect({ to: "/" });
  }
};
