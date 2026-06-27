import { publicApi } from "@/lib/api";

export const login = async (username: string, password: string) => {
  const response = await publicApi.post("/auth/signin", {
    username,
    password,
  });
  return response.data;
};
