import { publicApi } from "@/lib/api";

export const signup = async (
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  const res = await publicApi.post("/auth/signup", {
    username,
    email,
    password,
    firstName,
    lastName,
  });
  return res.data;
};
