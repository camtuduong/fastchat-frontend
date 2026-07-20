import { api } from "@/services/api";

export const getUserBySearch = async (search: string) => {
  const res = await api.get(`/users/all?search=${search}`);
  return res.data.users;
};
