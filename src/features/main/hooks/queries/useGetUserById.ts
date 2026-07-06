import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/features/main/api/getUserById";

export const useGetUserById = (userId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
  return { data: data?.user, isLoading, error };
};
