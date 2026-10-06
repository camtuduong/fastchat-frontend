import { publicApi } from "@/services/api";
import type { Credential } from "@/features/auth/hooks/useLoginWithGoogle";

export const loginWithGoogle = async (credential: Credential) => {
  const res = await publicApi.post("/auth/signin-with-google", {
    credential,
  });
  return res.data;
};
