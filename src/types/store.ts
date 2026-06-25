export interface AuthState {
  accessToken: string | null;
  user: string | null;
  displayName: string | null;
  isLoading: boolean;

  clearAuth: () => void;
  setUser: (user: string, displayName: string | null) => void;
}
