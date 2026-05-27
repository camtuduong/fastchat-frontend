import api from "@/libs/api";

export const authService = {
  signUp: async (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    try {
      const response = await api.post("/auth/signup", {
        username,
        email,
        password,
        firstName: firstName,
        lastName: lastName,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signIn: async (username: string, password: string) => {
    try {
      const response = await api.post("/auth/signin", {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signOut: async (accessToken: string) => {
    try {
      const response = await api.post("/auth/signout", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
