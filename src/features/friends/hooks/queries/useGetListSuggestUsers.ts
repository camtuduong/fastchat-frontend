import { getListSuggestUser } from "@/features/friends/api/getListSuggestUser";
import type { SuggestUsers } from "@/features/friends/types/user";
import { useQuery } from "@tanstack/react-query";

export const useGetListSuggestUser = (search: string) => {
  const { data, isLoading, error } = useQuery<SuggestUsers[]>({
    queryKey: ["suggest-users", search],
    queryFn: () => getListSuggestUser(search),
  });
  return { data, isLoading, error };
};
