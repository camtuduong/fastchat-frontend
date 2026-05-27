import type { User } from "./user";

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;

  signUp: (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;

  signIn: (username: string, password: string) => Promise<void>;

  signOut: () => Promise<void>;
}
