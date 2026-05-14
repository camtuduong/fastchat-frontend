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
          first_name: firstName,
          last_name: lastName,
        },
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const response = await api.post(
        "/auth/signin",
        {
          email,
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
