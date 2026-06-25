import { getMe } from "@/features/auth/api/getMe";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetMe = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (data?.user?.username) {
      useAuthStore
        .getState()
        .setUser(data.user.username, data.user.displayName || null);
    }
  }, [data]);
  return { data, error, isLoading };
};
