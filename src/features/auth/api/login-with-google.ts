import { publicApi } from "@/services/api";
import type { Credential } from "@/features/auth/hooks/useLoginWithGoogle";

export const loginWithGoogle = async (credential: Credential) => {
  try {
    const res = await publicApi.post("/auth/signin-with-google", {
      credential,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login with Google");
  }
};
