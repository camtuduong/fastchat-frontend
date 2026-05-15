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
      const response = await api.post(
        "/auth/signup",
        {
          username,
          email,
          password,
          firstName: firstName,
          lastName: lastName,
        },
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signIn: async (username: string, password: string) => {
    try {
      const response = await api.post(
        "/auth/signin",
        {
          username,
          password,
        },
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
