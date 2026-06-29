import type { Socket } from "socket.io-client";

export interface AuthState {
  accessToken: string | null;
  user: string | null;
  displayName: string | null;
  isLoading: boolean;

  clearAuth: () => void;
  setUser: (user: string, displayName: string | null) => void;
}

export interface SocketState {
  socket: Socket | null;
  onlineUsers: string[]; // List of online user IDs
  connectSocket: () => void;
  disconnectSocket: () => void;
}
