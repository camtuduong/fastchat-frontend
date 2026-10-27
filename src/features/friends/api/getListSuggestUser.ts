import { api } from "@/services/api";
import type { SuggestUsersResult } from "@/features/friends/types/user";

export const getListSuggestUser = async (search: string) => {
  const res = await api.get<SuggestUsersResult>(
    `/friends/suggest?search=${search}`,
  );
  return res.data.users;
};
